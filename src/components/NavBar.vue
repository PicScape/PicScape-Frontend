<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <div>
    <header class="navbar">
      <div class="header-container">
        <router-link to="/" class="logo">PicScape</router-link>
        <nav v-if="isLoaded">
          <router-link to="/" class="nav-link">Home</router-link>
          <router-link to="/upload" class="nav-link">Upload</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link">Login</router-link>
          <div v-else>
            <div class="dropdown nav-link">
              <button class="dropdown-toggle">
                Dropdown
                <span class="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </button>
              <div class="dropdown-content">
                <router-link to="/profile" class="nav-link sub-nav">Profile</router-link>
                <router-link to="/settings" class="nav-link sub-nav">Settings</router-link>
                <router-link to="/" @click="logout" class="nav-link sub-nav">Logout</router-link>
              </div>
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
      isLoaded: false,
    };
  },
  created() {
    this.checkTokenValidity();
  },
  methods: {
    async checkTokenValidity() {
      try {
        const accountData = await axiosService.checkTokenValidity();
        this.isLoggedIn = !!accountData;
      } catch (error) {
        this.isLoggedIn = false;
        Cookies.remove('token');
      } finally {
        this.isLoaded = true;
      }
    },
    logout() {
      this.isLoggedIn = false;
      Cookies.remove('token');
    },
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
  display: flex;
  align-items: center;
}

.sub-nav {
  margin-left: 0;
}

.nav-link:hover {
  color: var(--primary-color);
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--navbar-color);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content .sub-nav {
  padding: 4px 4px;
  display: block;
  color: var(--text-color);
  text-decoration: none;
  transition: background-color 0.3s;
}

.dropdown-content .nav-link:hover {
  background-color: var(--primary-color);
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-toggle {
  background-color: transparent;
  border: none;
  font-size: 16px;
  font-weight: bold;
  color: var(--text-color);
  cursor: pointer;
  transition: color 0.3s;
  padding: 0;
  display: flex;
  align-items: center;
}

.dropdown-toggle:hover {
  color: var(--primary-color);
}

.material-symbols-outlined {
  vertical-align: middle;
  display: inline-block;
  font-size: 20px;
}
</style>
