<template>
  <div>
    <header class="navbar">
      <div class="header-container">
        <router-link to="/" class="logo">PicScape</router-link>
        <nav>
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/upload" class="nav-link">Upload</router-link>
          <router-link to="/login" class="nav-link">Login</router-link>
          <router-link v-if="isLoggedIn" to="/profile" class="nav-link">Profile</router-link>
          <div v-if="isLoggedIn" class="dropdown">
            <button @click="toggleDropdown" class="profile-button">
              {{ username }} <i class="fa fa-caret-down"></i>
            </button>
            <div v-if="isDropdownOpen" class="dropdown-content">
              <router-link to="/settings" class="dropdown-link">Settings</router-link>
              <button @click="logout" class="dropdown-link">Logout</button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
</template>

<script>
import axiosService from '@/services/axiosService';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isLoggedIn: false,
      username: "",
    };
  },
  async created() {
    try {
      const accountData = await axiosService.checkTokenValidity();
      if (accountData) {
        this.isLoggedIn = true;
      }
    } catch (error) {
      this.isLoggedIn = false;
      Cookies.remove('token');
    } finally {
      this.isLoaded = true;
    }
  },
  methods: {
    
    logout() {
      this.isLoggedIn = false;
      Cookies.remove('token');
    }
  }
};
</script>



<style>


.navbar {
  background-color: var(--navbar-color);
  color: var(--text-color);
  padding: 15px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.header-container {
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.3s;
  cursor: pointer;
}

.logo:hover {
  color: var(--secondary-color);
}

nav {
  display: flex;
}

.nav-link {
  font-size: 16px;
  font-weight: bold;
  color: var(--text-color);
  text-decoration: none;
  margin-left: 20px;
  transition: color 0.3s;
  cursor: pointer;
}

.nav-link:hover {
  color: var(--primary-color);
}
</style>
