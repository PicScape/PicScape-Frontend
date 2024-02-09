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
.upload-form-container {
  max-width: 500px;
  margin: auto;
  padding: 20px;
  border: 1px solid 	#99aab5;
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
</style>
