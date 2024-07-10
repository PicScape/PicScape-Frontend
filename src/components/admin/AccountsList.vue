<template>
  <div class="container">
    <div class="row">
      <!-- Loading Indicator -->
      <div v-if="isLoading">
        <p>Loading...</p>
      </div>

      <!-- Error Handling -->
      <div v-else-if="error">
        <p>Error fetching users. Please try again later.</p>
      </div>

      <!-- User Cards -->
      <div class="card-container" v-else v-for="(user, index) in users" :key="user.id">
        <div class="card" :class="{ 'animated-card': animateCards }" :style="{ 'animation-delay': index * 0.1 + 's' }">

          <div class="card-body">
            <div class="buttons">
              <button v-if="user.id !== localUser.user.id" @click="deleteUser(user)" class="delete-button">
                <div>&#128465;</div>
              </button>
              <button @click="openEditModal(user)" class="edit-button">
                <div>&#9998;</div>
              </button>
            </div>
            <div class="left-section">
              <img :src="getProfilePictureUrl(user.id)" alt="Profile Picture" class="profile-picture">
            </div>
            <div class="right-section">
              <div class="username">@{{ user.username }}</div>
              <div class="id">{{ user.id }}</div>

              <div class="roles-container">
                <span v-for="(role, roleIndex) in user.roles" :key="roleIndex" class="role">
                  {{ role }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosServiceAdmin from '@/services/axiosServiceAdmin';
import axiosService from '@/services/axiosService';
const baseURL = process.env.VUE_APP_API_URL;

export default {
  data() {
    return {
      users: [],
      isLoading: true,
      error: null,
      animateCards: true,
      localUser: '',
    };
  },
  watch: {
    sortField: 'fetchUsers',
    sortOrder: 'fetchUsers',
  },
  props: {
        sortOrder: {
            type: String,
            required: true
        },
        sortField: {
            type: String,
            required: true
        },
    },
  async mounted() {
    this.localUser = await axiosService.checkTokenValidity();
    this.fetchUsers();
  },
  methods: {
    async deleteUser(user) {
      if (confirm("You sure you want to delete " + user.username)) {
        await axiosServiceAdmin.deleteAccount(user.id)
        this.fetchUsers()
      }
    },
    getProfilePictureUrl(id) {
      return `${baseURL}/fetch/pfp/${id}`;
    },
    async fetchUsers() {
      try {
        this.isLoading = true;
        const response = await axiosServiceAdmin.getAccounts(this.sortField, this.sortOrder);
        this.users = response.accounts;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },
  },

};
</script>

<style scoped>
.card-container {
  width: 100%;

}

.username {
  font-size: medium;
  margin-top: 5px;
  margin-bottom: 4px;
}

.email {
  font-size: small;
  color: var(--white-surface-300);
  margin-bottom: 4px;
}

.id {
  font-size: 11px;
  color: var(--white-surface-300);

}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  width: 100%;
}

@media screen and (max-width: 350px) {
  .row {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}

.card {

  margin: 10px;
  display: flex;
  overflow: hidden;
  border-color: var(--card-border);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
}

.card-body {
  background-color: var(--card-color);
  color: var(--text-color-1) !important;
  display: flex;
  flex-direction: row;
  padding: 8%;
  width: 100%;
  height: min-content;
}

.left-section {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}

.right-section {
  display: flex;
  flex-direction: column;
  margin: auto;
  flex: 2;
  padding-left: 1rem;
  text-align: left;

}

.profile-picture {
  width: 90px;
  height: 90px;
  border-radius: 7px;
}

.roles-container {
  margin-top: 0.5rem;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 170px;
}

.role {
  background-color: #d3d3d3;
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 8px;
  color: black;
  font-weight: 500;
  font-size: 13px;
}

.animated-card {
  animation: fadeIn 0.5s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.buttons {
  position: absolute;
  right: 5px;
  top: 5px;

}

.delete-button,
.edit-button {
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  font-size: medium;
  color: var(--text-color-3);
}

.delete-button:hover {
  color: #dc3545;
}

.edit-button:hover {
  color: #0051ff;
}
</style>
