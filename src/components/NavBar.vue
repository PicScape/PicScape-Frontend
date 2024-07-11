<template>
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
  <div>
    <header class="navbar">
      <div class="header-container">
        <router-link to="/" class="logo">PicScape</router-link>
        <nav v-if="isLoaded" :class="{ 'nav-open': isNavOpen }">
          <router-link to="/" class="nav-link" @click="closeNav">Home</router-link>
          <router-link to="/upload" class="nav-link" @click="closeNav">Upload</router-link>
          <router-link v-if="!isLoggedIn" to="/login" class="nav-link" @click="closeNav">Login</router-link>
          <div v-else>
            <div class="dropdown nav-link">
              <button class="dropdown-toggle">
                {{ username }}
                <span class="material-symbols-outlined">
                  keyboard_arrow_down
                </span>
              </button>
              <div class="dropdown-content">
                <router-link to="/myscape" class="nav-link sub-nav" @click="closeNav">My Scape</router-link>
                <router-link to="/settings" class="nav-link sub-nav" @click="closeNav">Settings</router-link>
                <router-link v-if="isAdmin" to="/admin" class="nav-link sub-nav admin-btn" @click="closeNav">Admin</router-link>

                <router-link to="/" @click="logout" class="nav-link sub-nav logout-btn">Logout</router-link>
              </div>
            </div>
          </div>
        </nav>
        <button class="hamburger" @click="toggleNav">
          <span class="material-symbols-outlined">
            menu
          </span>
        </button>
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
      username: '',
      isNavOpen: false,
      isAdmin: false
    };
  },
  created() {
    this.checkTokenValidity();
  },
  methods: {
    async checkTokenValidity() {
      let accountData = null;
      try {
        accountData = await axiosService.checkTokenValidity();
        this.isLoggedIn = !!accountData;
        if(accountData.user.isAdmin){
          this.isAdmin = accountData.user.isAdmin;
        }
      } catch (error) {
        this.isLoggedIn = false;
        Cookies.remove('token');
      } finally {
        this.isLoaded = true;
        if (accountData) {
          this.username = accountData.user.username;
        }
      }
    },
    logout() {
      this.isLoggedIn = false;
      Cookies.remove('token');
      window.location.href = '/';
      this.closeNav();
    },
    toggleNav() {
      this.isNavOpen = !this.isNavOpen;
    },
    closeNav() {
      this.isNavOpen = false;
    }
  }
};
</script>

<style>
.logout-btn:hover {
  background-color: red !important;
}

.admin-btn:hover{
  background-color: blueviolet !important;
}

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
  right: 0;
  background-color: var(--navbar-color);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 99999;
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

.hamburger {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 24px;
  cursor: pointer;
  display: none;
}

@media screen and (max-width: 768px) {
  nav {
    display: none;
    flex-direction: column;
    width: 100%;
    text-align: center;
    background-color: var(--navbar-color);
    position: absolute;
    top: 60px;
    left: 0;

  }

  .dropdown-content {
    top: 100%;
    right: 0;
    background-color: var(--navbar-color);
    min-width: 100%;
  }

  .nav-open {
    display: flex;
  }

  .nav-link {
    margin: 10px 10px;
  }

  .hamburger {
    display: block;
  }
}
</style>
