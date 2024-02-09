<template>
  <form @submit.prevent="submitForm">
    <label for="title">Title:</label>
    <input type="text" id="title" v-model="title" required><br><br>

    <label for="description">Description:</label>
    <textarea id="description" v-model="description" required></textarea><br><br>

    <label for="tags">Tags:</label>
    <input type="text" id="tags" v-model="tagInput" @keydown.enter.prevent="addTag"><br>
    <div v-for="(tag, index) in tags" :key="index">{{ tag }} <button @click="removeTag(index)">x</button></div><br>

    <label for="image">Image:</label>
    <input type="file" id="image" @change="handleFileUpload"><br><br>

    <button type="submit">Upload</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      description: '',
      tagInput: '',
      tags: [],
      file: null
    };
  },
  methods: {
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
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('description', this.description);
      this.tags.forEach(tag => formData.append('tags[]', tag));
      formData.append('file', this.file);

      try {
        const response = await fetch('http://localhost:3000/api/upload', {
          method: 'POST',
          body: formData
        });
        if (response.ok) {
          alert('Upload successful!');
          this.title = '';
          this.description = '';
          this.tags = [];
          this.file = null;
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
</style>
