<template>
  <div class="container">
    <div class="row">
      <!-- Loading Indicator -->
      <div v-if="isLoading" class="col-md-12 text-center">
        <p>Loading...</p>
      </div>

      <!-- Error Handling -->
      <div v-else-if="error" class="col-md-12 text-center">
        <p>Error fetching users. Please try again later.</p>
      </div>

      <!-- User Cards -->
      <div v-else class="col-md-4" v-for="(user, index) in filteredUsers" :key="index">
        <div class="card mb-4" v-bind:class="{ 'animated-card': animateCards }"
          v-bind:style="{ 'animation-delay': index * 0.1 + 's' }">
          <div class="card-body d-flex flex-column">
            <div class="d-flex justify-content-between align-items-start mb-3">
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
              <p class="card-text mb-1">@{{ user.username }}</p>
              <p class="card-text mb-0">{{ user.email }}</p>
              <div class="roles-container">
                <span v-for="(role, roleIndex) in user.roles" :key="roleIndex" class="badge">{{ role }}</span>
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
  computed: {
    filteredUsers() {
      console.log(this.users)

      return this.users;
    }
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
  overflow: hidden;
  width: 300px;
}

.badge {
  display: inline-block;
  padding: 0.35rem 0.5rem;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: #fff;
  font-size: 0.875rem;
  margin-right: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card {
  width: 300px;
  height: 245px;
  margin: 10px;
  overflow: hidden;
  border-color: var(--background-color-4);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-body {
  background-color: var(--card-color-1);
  color: var(--text-color-1) !important;
}

.card-footer {
  background-color: var(--card-color-1) !important;
  color: var(--text-color-1) !important;
}

.form-control {
  background-color: var(--background-color-2) !important;
  color: var(--text-color-1) !important;
  border-color: var(--textbox-border-color) !important;
}

.form-control:focus {
  background-color: var(--background-color-3) !important;
  color: var(--text-color-1) !important;
}

.form-control::placeholder {
  color: var(--text-color-2) !important;
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

.col-md-4 {
  flex: 1;
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
