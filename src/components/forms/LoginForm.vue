<template>
  <div v-if="isLoaded" class="auth-form-container" :class="{ 'fly-in': isLoaded }">
    <div class="card-header">
      <div>{{ isRegistering ? 'Register' : 'Login' }}</div>
    </div>

    <form @submit.prevent="submitForm" v-if="isRegistering" class="auth-form">
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" name="email" required autocomplete="email">
      </div>
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" name="username" required autocomplete="username">
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" name="password" required autocomplete="new-password">
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" name="confirmPassword" required
          autocomplete="new-password">
      </div>
      <button type="submit" class="submit-button" :disabled="isSubmitting">Register</button>
      <div class="toggle-auth-option">
        <span>Already have an account?</span>
        <button type="button" @click="toggleAuthOption">Login</button>
      </div>
    </form>

    <form @submit.prevent="submitForm" v-else-if="!isLoggedIn" class="auth-form">
      <div v-if="!codePrompt">
        <div class="form-group">
          <label for="loginEmail">Email:</label>
          <input type="email" id="loginEmail" v-model="loginEmail" name="loginEmail" required autocomplete="email">
        </div>
        <div class="form-group">
          <label for="loginPassword">Password:</label>
          <input type="password" id="loginPassword" v-model="loginPassword" name="loginPassword" required
            autocomplete="current-password">
        </div>
        <button type="submit" class="submit-button" :disabled="isSubmitting">Login</button>
        <div class="toggle-auth-option">
          <span>Don't have an account yet?</span>
          <button type="button" @click="toggleAuthOption">Register</button>
        </div>
      </div>
      <div v-else class="auth-form">
        <div class="form-group code-inputs">
          <label for="code">Verification Code:</label>
          <div class="code-input-container">
            <!-- Use v-model for each input -->
            <input ref="code1" type="text" id="code1" v-model="code[0]" name="code1" maxlength="1"
              @input="handleCodeInput(0, $event)" @keydown="handleCodeKeydown(0, $event)" @paste="handlePaste($event)"
              required>
            <input ref="code2" type="text" id="code2" v-model="code[1]" name="code2" maxlength="1"
              @input="handleCodeInput(1, $event)" @keydown="handleCodeKeydown(1, $event)" @paste="handlePaste($event)"
              required>
            <input ref="code3" type="text" id="code3" v-model="code[2]" name="code3" maxlength="1"
              @input="handleCodeInput(2, $event)" @keydown="handleCodeKeydown(2, $event)" @paste="handlePaste($event)"
              required>
            <input ref="code4" type="text" id="code4" v-model="code[3]" name="code4" maxlength="1"
              @input="handleCodeInput(3, $event)" @keydown="handleCodeKeydown(3, $event)" @paste="handlePaste($event)"
              required>
            <input ref="code5" type="text" id="code5" v-model="code[4]" name="code5" maxlength="1"
              @input="handleCodeInput(4, $event)" @keydown="handleCodeKeydown(4, $event)" @paste="handlePaste($event)"
              required>
            <input ref="code6" type="text" id="code6" v-model="code[5]" name="code6" maxlength="1"
              @input="handleCodeInput(5, $event)" @keydown="handleCodeKeydown(5, $event)" @paste="handlePaste($event)"
              required>
          </div>
        </div>
        <button type="submit" class="submit-button" :disabled="isSubmitting">Verify Code</button>
        <div class="toggle-auth-option">
          <span>Didn't receive a code?</span>
          <button type="button" @click="resendCode" class="link-button">Resend</button>
        </div>
      </div>
    </form>

    <button v-if="isLoggedIn" @click="logout" class="submit-button">Logout</button>
    <div v-if="!isLoggedIn" class="messages">
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
      code: ['', '', '', '', '', ''],
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
      success: '',
      codePrompt: false,
      isSubmitting: false,
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
      if (this.isSubmitting) return;
      this.isSubmitting = true;

      try {
        if (this.codePrompt) {
          const verificationCode = this.code.join('');
          await axiosService.verifyLoginCode(this.loginEmail, verificationCode);
          this.isLoggedIn = true;
          window.location.href = '/';
        } else if (this.isRegistering) {
          if (this.password !== this.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
          }
          await axiosService.register(this.email, this.username, this.password);
          this.success = 'An email has been sent to verify your email address. Please check your inbox.';
          this.isRegistering = false;
        } else {
          await axiosService.login(this.loginEmail, this.loginPassword);
          this.codePrompt = true;
        }
      } catch (error) {
        this.error = error.message;
      } finally {
        this.isSubmitting = false;
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
      window.location.reload();
    },
    handleCodeInput(index, event) {
      this.code[index] = event.target.value.trim();

      if (event.data === null) {
        this.focusPrevious(index);
      } else if (index < this.code.length - 1) {
        this.$refs[`code${index + 2}`].focus();
      }

      if (this.isCodeComplete()) {
        this.submitForm();
      }
    },
    handleCodeKeydown(index, event) {
      if (event.key === 'Backspace' && index > 0 && !this.code[index]) {
        this.focusPrevious(index);
      } else if (event.key.length === 1 && index < this.code.length - 1) {
        this.$refs[`code${index + 1}`].focus();
      }
    },
    handlePaste(event) {
      event.preventDefault();
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('text');

      for (let i = 0; i < this.code.length && i < pastedText.length; i++) {
        this.code[i] = pastedText.charAt(i);
      }

      if (this.isCodeComplete()) {
        this.submitForm();
      }
    },
    focusPrevious(index) {
      if (index > 0) {
        this.$refs[`code${index}`].focus();
      }
    },
    isCodeComplete() {
      return this.code.every(input => input !== '');
    },
    resendCode() {
      console.log('Resending verification code');
    },
  },
};
</script>

<style scoped>
.auth-form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  margin-top: 80px;
  border-radius: 8px;
  background-color: var(--card-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  background-color: var(--primary-color);
  color: var(--text-color);
  padding: 10px;
  margin: -20px -20px 20px -20px;
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  padding-left: 20px;
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
  font-size: 16px;

}

label {
  font-weight: bold;
  text-align: left;
  padding-bottom: 7px;
  color: var(--text-color);
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="code"] {
  background-color: var(--white-primary);
  border: 1px solid var(--white-secondary);
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.code-input-container {
  display: flex;
  justify-content: space-between;
}

.code-input-container input[type="text"] {
  width: calc(20% - 20px);
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
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

.submit-button:disabled {
  background-color: var(--disabled-btn-color);
  cursor: not-allowed;
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
  margin-top: 15px;
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

.messages {
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
</style>
