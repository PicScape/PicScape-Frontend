<template>
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

  <div v-if="isLoaded" class="auth-form-container" :class="{ 'fly-in': isLoaded }">
    <div class="card-header">
      <div>Account Settings</div>
    </div>
    <form @submit.prevent="submitForm" v-if="isLoggedIn" class="auth-form upload-form">
      <div class="grid-container1">
        <div class="pfp-container">
          <img :src="getProfilePictureUrl()" alt="Profile Picture">
        </div>
        <div class="input-field-container">
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" :placeholder="username_placeholder" v-model="username" id="username" autocomplete="username">
          </div>
          <div class="form-group">
            <label for="roles">Roles:</label>
            <div class="tags-container">
              <div v-for="(role, index) in roles" :key="index" class="tag">
                {{ role }}
              </div>
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" :placeholder="email_placeholder" v-model="email" autocomplete="email">
          </div>
        </div>
      </div>

      <div class="password-group">
        <div class="form-group">
          <label for="password">New Password:</label>
          <input type="password" id="password" name="password" autocomplete="new-password" v-model="password">
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" autocomplete="new-password" v-model="confirmPassword">
        </div>
      </div>

      <button type="submit" class="submit-button">Update Credentials</button>
      <div class="messages">
        <div v-if="error" class="error-message">{{ error }}</div>
        <div v-if="success" class="success-message">{{ success }}</div>
      </div>
    </form>

    <div v-else class="login-prompt">
      <p>You are not logged in.</p>
    </div>
  </div>
</template>

<script>
import axiosService from '@/services/axiosService';
import Cookies from 'js-cookie';

export default {
  data() {
    return {
      username_placeholder: '',
      email_placeholder: '',
      confirmPassword: '',
      password: '',
      username: '',
      email: '',
      roles: [],
      isLoggedIn: false,
      isLoaded: false,
      error: '',
      success: '',
      pfp_url: '',
    };
  },
  created() {
    this.checkTokenValidity();
  },
  methods: {
    getProfilePictureUrl(){
      return this.pfp_url
    },
    async checkTokenValidity() {
      try {
        const accountData = await axiosService.checkTokenValidity();

        this.isLoggedIn = !!accountData;
        const baseURL = process.env.VUE_APP_BASE_URL || 'http://localhost:3000';
        this.pfp_url = `${baseURL}/fetch/pfp/${accountData.user.id}`;
        this.username_placeholder = accountData.user.username;
        this.email_placeholder = await this.censorEmail(accountData.user.email);
        this.roles = accountData.user.roles || [];
      } catch (error) {
        this.isLoggedIn = false;
        Cookies.remove('token');
      } finally {
        this.isLoaded = true;
      }
    },
    async submitForm() {
      try {
        if (this.password === this.confirmPassword) {
          const response = await axiosService.updateCredentials(this.username, this.email, this.password);
          this.success = response.message || 'Credentials updated successfully!';
          this.checkTokenValidity();
          this.error = '';
          this.username = '';
          this.email = '';
          this.password = '';
          this.confirmPassword = '';
        } else {
          this.error = 'Passwords do not match';
        }
      } catch (error) {
        console.error("Update failed:", error.message);
        this.error = error.message || 'Failed to update credentials';
        this.success = '';
      }
    },
    async censorEmail(email) {
      let parts = email.split('@');
      if (parts.length !== 2) {
        return email;
      }
      let localPart = parts[0];
      let domain = parts[1];
      let censoredLocalPart = localPart.substring(0, 3) + '*'.repeat(localPart.length - 3);
      return censoredLocalPart + '@' + domain;
    },
    removeTag(index) {
      this.leavingTags.push(index);
      this.tags.splice(index, 1);
      this.leavingTags = this.leavingTags.filter(tagIndex => tagIndex !== index);
    },
    addTag() {
      if (this.tagInput) {
        this.tags.push(this.tagInput);
        this.enteringTags.push(this.tags.length - 1);
        this.tagInput = '';
        setTimeout(() => {
          this.enteringTags = [];
        }, 300);
      }
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileChange({ target: { files: [files[0]] } });
      }
      this.draggingOver = false;
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    clearImage() {
      this.file = null;
      this.imagePreview = '';
      this.fileName = '';
      this.$refs.fileInput.value = null;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.file = file;
          this.imagePreview = reader.result;
          this.fileName = file.name;
        };
        reader.readAsDataURL(file);
      } else {
        if (!this.file) {
          this.file = null;
          this.imagePreview = '';
          this.fileName = '';
        }
      }
    },
    logout() {
      this.isLoggedIn = false;
      Cookies.remove('token');
    },
    isTagEntering(index) {
      return this.enteringTags.includes(index);
    },
    isTagLeaving(index) {
      return this.leavingTags.includes(index);
    }
  }
};
</script>

<style scoped>
.grid-container1 {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  margin-bottom: 10px;
}

.pfp-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  width: 200px;
}

.pfp-container img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.input-field-container {
  display: flex;
  flex-direction: column;
}

.tag {
  background-color: #d3d3d3;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  margin-bottom: 0;
  color: black;
}

.auth-form-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  margin-top: 80px;
  border-radius: 8px;
  background-color: var(--card-color);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.auth-form {
  display: grid;
  grid-gap: 10px;
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

.form-group {
  display: grid;
  grid-template-columns: auto;
  align-items: center;
  margin-bottom: 10px;
}

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.15s ease-in-out;
  position: relative;
}

.drag-over {
  background-color: #ffffff17;
}

.drop-text {
  pointer-events: none;
}

.remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  width: 30px;
  background: transparent;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  color: white;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.remove-button:hover {
  color: red;
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

label {
  font-weight: bold;
  text-align: left;
  padding-bottom: 7px;
  color: var(--text-color);
  pointer-events: none;
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

.filename {
  margin: 0;
  margin-top: 10px;
  pointer-events: none;
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

.upload-form {
  display: grid;
  grid-gap: 10px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
}

.password-group {
  display: flex;
  justify-content: space-between;
}

.password-group .form-group {
  flex: 1;
}

.password-group .form-group:not(:last-child) {
  margin-right: 10px;
}

.tag-text {
  color: black;
}

.tag button {
  margin-left: 5px;
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  transition: color 0.3s ease-in-out;
}

.tag button:hover {
  color: red;
}

.drop-zone:hover {
  background-color: #ffffff0e;
}

.drag-over {
  background-color: #ffffff17;
}

.login-prompt {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
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

.jump-in {
  animation-name: jumpIn;
}

@keyframes jumpIn {
  0% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.image-preview {
  max-width: 100%;
  max-height: 200px;
  pointer-events: none;
}

.upload-type-select {
  background-color: var(--white-primary);
  border: 1px solid var(--white-secondary);
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  color: var(--text-color-bk);
}

.upload-type-select:focus {
  outline: none;
}

.upload-type-select option {
  background-color: var(--white-primary);
  color: var(--text-color-bk);
}

@media (max-width: 500px) {
  .pfp-container{
    margin-left: auto;
    margin-right: auto;
  }
  .grid-container1 {
    grid-template-columns: 1fr;
  }
}
</style>
