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
      <div v-else v-for="(user, index) in this.users" :key="index">
        <div class="card" v-bind:class="{ 'animated-card': animateCards }"
          v-bind:style="{ 'animation-delay': index * 0.1 + 's' }">
          <div class="card-body">
            <div>
              <img :src="getProfilePictureUrl(user.id)" alt="Profile Picture" class="profile-picture">
              <!-- Delete Button -->
              <button v-if="user.id !== localUser.user.id" @click="deleteUser(user)" class="delete-button">
                <i>delete</i>
              </button>
              <button @click="openEditModal(user)" class="edit-button">
                <i>edit</i>
              </button>
            </div>
            <div>
              <p>@{{ user.username }}</p>
              <p>{{ user.email }}</p>
              <div class="roles-container">
                <span v-for="(role, roleIndex) in user.roles" :key="roleIndex" class="role">{{ role }}</span>
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

  methods: {
    getProfilePictureUrl(id) {
      return `${baseURL}/fetch/pfp/${id}`;
    },
    async fetchUsers() {
      try {
        this.isLoading = true;
        const response = await axiosServiceAdmin.getAccounts();
        this.users = response.accounts;
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    },

  },
  async mounted() {
    this.localUser = await axiosService.checkTokenValidity();
    console.log(this.localUser.user.id)
    this.fetchUsers();
  }
};
</script>

<style scoped>
.profile-picture {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: auto;
}

.roles-container {
  margin-top: 0.5rem;
  display: inline-block;
  white-space: nowrap;
  flex-wrap: wrap;
  overflow: hidden;
  width: 300px;
}



.role {
  background-color: #d3d3d3;
  border-radius: 4px;
  padding: 2px 4px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  margin-bottom: 0;
  color: black;
  font-weight: 500;
  font-size: 13px;
}


.card {
  width: 300px;
  height: 245px;
  margin: 10px;
  overflow: hidden;
  border-color: var(--card-border);
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  background-color: var(--card-color);
  color: var(--text-color-1) !important;
}






.card-body {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.card-title,
.card-text {
  margin-bottom: 0.3rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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

.animated-card {
  animation: fadeIn 0.5s ease forwards;
}

.row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 5px;
}


.card {
  opacity: 0;
}

.delete-button {
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  color: var(--text-color-3);
}

.edit-button {
  padding: 5px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.3s;
  color: var(--text-color-3);
}

.delete-button:hover {
  color: #dc3545;
}

.edit-button:hover {
  color: #0051ff;
}
</style>
