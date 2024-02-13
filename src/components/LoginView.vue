<template>
  <div class="auth-form-container">
    <form @submit.prevent="submitForm" v-if="isRegistering" class="register-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required>
      </div>

      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>

      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        <span v-if="passwordMismatch" class="error-message">Passwords do not match</span>
      </div>

      <button type="submit" class="submit-button">Register</button>
      <div class="toggle-auth-option">
        <span>Already have an account?</span>
        <button @click="toggleAuthOption">Login</button>
      </div>
    </form>

    <form @submit.prevent="submitForm" v-else class="login-form">
      <div class="form-group">
        <label for="loginUsername">Username:</label>
        <input type="text" id="loginUsername" v-model="loginUsername" required>
      </div>

      <div class="form-group">
        <label for="loginPassword">Password:</label>
        <input type="password" id="loginPassword" v-model="loginPassword" required>
      </div>

      <button type="submit" class="submit-button">Login</button>
      <div class="toggle-auth-option">
        <span>Don't have an account yet?</span>
        <button @click="toggleAuthOption">Register</button>
      </div>
    </form>
  </div>
</template>

<script>

import { API_URL } from '../../config';

export default {
  data() {
    return {
      isRegistering: true,
      username: '',
      password: '',
      confirmPassword: '',
      passwordMismatch: false,
      loginUsername: '',
      loginPassword: ''
    };
  },
  methods: {
    async submitForm() {
      if (this.isRegistering) {
        if (this.password !== this.confirmPassword) {
          this.passwordMismatch = true;
          return;
        }
        try {
          const formData = new FormData();
          formData.append('username', this.username);
          formData.append('password', this.password);

          const response = await fetch(`${API_URL}/api/register`, {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            alert('Registration successful!');
            this.username = '';
            this.password = '';
            this.confirmPassword = '';
            this.passwordMismatch = false;
          } else {
            alert('Registration failed!');
          }
        } catch (error) {
          console.error('Registration failed:', error);
          alert('Registration failed. Please try again.');
        }
    } else {
        try {
          const formData = new FormData();
          formData.append('username', this.loginUsername);
          formData.append('password', this.loginPassword);

          const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            body: formData
          });

          if (response.ok) {
            const responseData = await response.json();
            this.saveTokenInCookies(responseData.token);

            alert('Login successful!');

            this.loginUsername = '';
            this.loginPassword = '';
          } else {
            alert('Login failed. Invalid credentials.');
          }
        } catch (error) {
          console.error('Login failed:', error);
          alert('Login failed. Please try again.');
        }
      }
    },
    saveTokenInCookies(token) {
      document.cookie = `token=${token}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
    },
    toggleAuthOption() {
      this.isRegistering = !this.isRegistering;
    }
  }
};
</script>

<style scoped>
input[type="text"],
input[type="password"] {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.auth-form-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #99aab5;
  border-radius: 8px;
  background-color: #2c2f33;
}

.auth-form {
  display: grid;
  grid-gap: 10px;
}

.form-group {
  display: grid;
  grid-template-columns: 140px auto; 
  align-items: center;
  margin-bottom: 10px; 
}

label {
  font-weight: bold;
  text-align: left;
  padding-bottom: 7px;
}

.submit-button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
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
  color: #007bff;
  text-decoration: underline;
  margin-left: 5px;
}

.toggle-auth-option button:hover {
  color: #0056b3;
}
</style>
