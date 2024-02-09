<template>
  <v-container>
    <v-form @submit.prevent="submitForm">
      <v-text-field v-model="title" label="Title" required></v-text-field>
      <v-textarea v-model="description" label="Description" required></v-textarea>
      <v-chip v-for="(tag, index) in tags" :key="index" close @click:close="removeTag(index)">
        {{ tag }}
      </v-chip>
      <v-text-field v-model="tagInput" label="Tags" @keydown.enter.prevent="addTag"></v-text-field>
      <v-file-input v-model="file" label="Image" accept="image/*"></v-file-input>
      <v-btn type="submit" color="primary">Upload</v-btn>
    </v-form>
  </v-container>
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
          this.$emit('upload-success');
          this.resetForm();
          alert('Upload successful!');
        } else {
          alert('Upload failed!');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again later.');
      }
    },
    resetForm() {
      this.title = '';
      this.description = '';
      this.tags = [];
      this.file = null;
    }
  }
};
</script>

<style scoped>
</style>
