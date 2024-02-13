<template>
  <div class="upload-form-container">
    <form @submit.prevent="submitForm" class="upload-form">
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" required>
      </div>

      <div class="form-group">
        <label for="description">Description:</label>
        <textarea id="description" v-model="description" required></textarea>
      </div>

      <div class="form-group">
        <label for="tags">Tags:</label>
        <div class="tags-container">
          <div v-for="(tag, index) in tags" :key="index" class="tag">
            <span class="tag-text">{{ tag }}</span>
            <button @click="removeTag(index)" type="button">x</button>
          </div>
        </div>
        <input type="text" id="tags" v-model="tagInput" @keydown.enter.prevent="addTag">
      </div>

      <div class="form-group">
        <label for="image">Image:</label>
        <div class="drop-zone" @dragover.prevent @drop="handleDrop" @click="selectFile">
          <p v-if="!imagePreview">Drag & Drop images here or click to select</p>
          <img :src="imagePreview" v-if="imagePreview" alt="Image Preview"
            style="max-width: 100%; max-height: 200px; margin-bottom: 10px;">
          <p class="filename">{{ fileName }}</p>
          <input type="file" id="image" ref="fileInput" style="display: none;" accept="image/*"
            @change="handleFileChange">
        </div>
      </div>

      <button type="submit" class="submit-button">Upload</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      tagInput: '',
      tags: [],
      file: null,
      imagePreview: '',
      fileName: ''
    };
  },
  methods: {
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    handleDrop(event) {
      event.preventDefault();
      const files = event.dataTransfer.files;
      if (files.length > 0 && this.isValidImage(files[0])) {
        this.file = files[0];
        this.displayImage(files[0]);
        this.fileName = files[0].name;
      }
    },
    selectFile() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file && this.isValidImage(file)) {
        this.file = file;
        this.displayImage(file);
        this.fileName = file.name;
      }
    },
    isValidImage(file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/tiff', 'image/gif', 'image/svg+xml'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload an image file with one of the following formats: JPEG, PNG, WebP, TIFF, GIF, SVG.');
        return false;
      }
      return true;
    },
    displayImage(file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    },
    handleFileUpload(event) {
      this.file = event.target.files[0];
    },
    addTag() {
      if (this.tagInput.trim() !== '') {
        this.tags.push(this.tagInput.trim());
        this.tagInput = '';
      }
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    async submitForm() {
      if (!this.file) {
        alert('Please select an image');
        return;
      }
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      this.tags.forEach(tag => formData.append('tags[]', tag));
      formData.append('file', this.file);

      try {
        const token = this.getCookie('token'); // Get the token from the cookie

        const response = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          headers: {
            'Authorization': `${token}` // Attach the token to the headers
          },
          body: formData
        });
        if (response.ok) {
          alert('Upload successful!');
          this.title = '';
          this.description = '';
          this.tags = [];
          this.file = null;
          this.$refs.fileInput.value = '';
          this.imagePreview = '';
        } else {
          alert('Upload failed!');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again later.');
      }
    }
  }
};
</script>


<style scoped>
input[type="text"],
textarea {
  background-color: #fff;
  /* Set background color to white */
  border: 1px solid #ccc;
  /* Set border color to light grey */
  border-radius: 4px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.upload-form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid #99aab5;
  border-radius: 8px;
  background-color: #2c2f33;
}

.upload-form {
  display: grid;
  grid-gap: 10px;
}

.form-group {
  display: grid;
  grid-template-columns: 100px auto;
  align-items: center;
  grid-template-columns: auto;
}

textarea#description {
  resize: vertical;
}

label {
  font-weight: bold;
  text-align: left;
  padding-bottom: 7px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  background-color: #d3d3d3;
  border-radius: 4px;
  padding: 4px 8px;
  margin-right: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}

.tag-text {
  color: black;
}

.tag button {
  margin-left: 8px;
  background: none;
  border: none;
  cursor: pointer;
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

.drop-zone {
  border: 2px dashed #ccc;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.drop-zone p {
  margin: 0;
}

.drop-zone:hover {
  background-color: #9c9c9c;
}
</style>
