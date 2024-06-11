<template>
  
  <div v-if="isLoaded" class="auth-form-container" :class="{ 'fly-in': isLoaded }">
    
    <form @submit.prevent="submitForm" v-if="isRegistering" class="auth-form register-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" name="username" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" name="password" required>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" name="confirmPassword" required>
      </div>
      <button type="submit" class="submit-button">Register</button>
      <div class="toggle-auth-option">
        <span>Already have an account?</span>
        <button @click="toggleAuthOption">Login</button>
      </div>
    </form>

    <form @submit.prevent="submitForm" v-if="!isRegistering && !isLoggedIn" class="auth-form login-form">
      <div class="form-group">
        <label for="loginEmail">Email:</label>
        <input type="email" id="loginEmail" v-model="loginEmail" name="loginEmail" required>
      </div>
      <div class="form-group">
        <label for="loginPassword">Password:</label>
        <input type="password" id="loginPassword" v-model="loginPassword" name="loginPassword" required>
      </div>
      <button type="submit" class="submit-button">Login</button>
      <div class="toggle-auth-option">
        <span>Don't have an account yet?</span>
        <button @click="toggleAuthOption">Register</button>
      </div>
    </form>

    <button v-if="isLoggedIn" @click="logout" class="submit-button">Logout</button>
    <div class="messages">
      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">{{ success }}</div>
    </div>
    
  </div>
</template>

<script>
import axiosService from '@/services/axiosService';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      isRegistering: false,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      loginEmail: '',
      loginPassword: '',
      isLoggedIn: false,
      isLoaded: false,
      error: '',
      success: ''
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
    async submitForm() {
      this.error = '';
      this.success = '';

      try {
        if (this.isRegistering) {
          if (this.password !== this.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
          }
          await axiosService.register(this.email, this.username, this.password);
          this.success = 'Registered successfully';
          this.isRegistering = false;
        } else {
          this.error = '';
          await axiosService.login(this.loginEmail, this.loginPassword);
          this.isLoggedIn = true;
          
        }
      } catch (error) {
        this.error = error.message; 
      }
    },
    toggleAuthOption() {
      this.isRegistering = !this.isRegistering;
      this.error = '';
      this.success = '';
      this.email = '';
      this.username = '';
      this.password = '';
      this.confirmPassword = '';
      this.loginEmail = '';
      this.loginPassword = '';
    },
    logout() {
      this.isLoggedIn = false;
      Cookies.remove('token');
    }
  }
};
</script>

<style scoped>

.messages{
  margin-top: 10px;
}

.fly-in {
  animation: flyIn 0.5s ease forwards;
  opacity: 0;
  transform: translateY(-50px);
}

@keyframes flyIn {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  margin-top: 80px;
  border: 1px solid var(--card-border);
  border-radius: 8px;
  background-color: var(--card-color);
}

.auth-form {
  display: grid;
  grid-gap: 10px;
}

.form-group {
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  margin-bottom: 10px;
}

label {
  font-weight: bold;
  text-align: left;
  padding-bottom: 7px;
  color: var(--text-color);
}

input[type="text"],
input[type="email"],
input[type="password"] {
  background-color: var(--white-primary);
  border: 1px solid var(--white-secondary);
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.submit-button {
  background-color: var(--submit-btn-primary);
  color: var(--text-color);
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
}

.submit-button:hover {
  background-color: var(--submit-btn-secondary);
}

.error-message {
  margin-top: 5px;
  color: red;
}

.success-message {
  margin-top: 5px;
  color: green;
}

.toggle-auth-option {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-auth-option button {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
  text-decoration: underline;
  margin-left: 5px;
  transition: color 0.3s ease-in-out;
}

.toggle-auth-option button:hover {
  color: var(--submit-btn-secondary);
}
</style>
