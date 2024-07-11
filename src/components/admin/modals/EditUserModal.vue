<template>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <div class="modal-overlay" v-if="isVisible">
        <div class="modal-content">
            <form @submit.prevent="" class="auth-form upload-form">
                <div class="grid-container1">
                    <div class="pfp-container">
                        <img :src="getProfilePictureUrl()" alt="Profile Picture">
                    </div>
                    <div class="input-field-container">
                        <div class="form-group">
                            <label for="username">Username:</label>
                            <input type="text" :placeholder="user.username" v-model="localUser.username" id="username">
                        </div>
                        <div class="form-group">
                            <label for="email">Email:</label>
                            <input type="text" :placeholder="user.email" v-model="localUser.email" id="email">
                        </div>
                        <div class="form-group">
                            <label for="roles">Roles:</label>
                            <div class="tags-container">
                                <div v-for="(role, index) in localUser.roles" :key="index" class="tag">
                                    {{ role }}
                                    <button @click="removeRole(index)">
                                        <span class="material-icons">close</span>
                                    </button>
                                </div>
                            </div>
                            <div class="add-role">
                                <input type="text" v-model="newRole" placeholder="Add a role" @keydown.enter.prevent="addRole">
                                <button @click="addRole" class="btn-add">Add</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons">
                    <button @click="closeModal" class="btn btn-cancel">Cancel</button>
                    <button type="submit" class="btn btn-save">Save</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        user: {
            type: Object,
            required: true
        },
    },
    data() {
        return {
            localUser: { ...this.user },
            pfp_url: '',
            newRole: ''
        };
    },
    async created() {
        try {
            const baseURL = process.env.VUE_APP_API_URL;
            this.pfp_url = `${baseURL}/fetch/pfp/${this.user.id}`;
        } catch (error) {
            console.error(error);
        }
    },
    methods: {
        getProfilePictureUrl() {
            return this.pfp_url;
        },
        closeModal() {
            this.$emit('close');
        },
        submitEdit() {
            this.$emit('save', { ...this.localUser });
            this.closeModal();
        },
        addRole() {
            const trimmedRole = this.newRole.trim();
            if (trimmedRole && !this.localUser.roles.includes(trimmedRole)) {
                this.localUser.roles.push(trimmedRole);
            }
            this.newRole = '';
        },
        removeRole(index) {
            this.localUser.roles.splice(index, 1);
        }
    },
    watch: {
        user: {
            handler(newUser) {
                this.localUser = { ...newUser };
            },
            deep: true,
            immediate: true
        }
    }
};
</script>
<style scoped>


label {
  font-weight: bold;
  text-align: left;
  padding-bottom: 7px;
  color: var(--text-color);
  pointer-events: none;
}

.pfp-container img {
    height: 100px;
    width: 100px;
}

.input-field-container {
width: auto;
}


.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}



.modal-content {
    background: var(--card-color);
    padding: 20px;
    border-radius: 8px;
    width: 400px;
    max-width: 100%;
}



.form-group {
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  margin-bottom: 10px;
}
.buttons {
    display: flex;
    justify-content: flex-end;
}

.btn {
    margin-left: 0.5rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-save {
    background: #28a745;
    color: white;
}

.btn-cancel {
    background: #dc3545;
    color: white;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
}


.add-role {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.add-role input {
    flex-grow: 1;
    margin-right: 10px;
}

.btn-add {
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-add:hover {
    background: #0056b3;
}

.tag button {
    background: none;
    border: none;
    cursor: pointer;
    color: black;
    transition: color 0.3s ease-in-out;
}

.tag button:hover {
    color: red;
}

.tag {
  background-color: #d3d3d3;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  animation-duration: 0.3s;
}

</style>