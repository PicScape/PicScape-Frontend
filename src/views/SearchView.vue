<template>
    <div>
      <h1>Search Results</h1>
      <p>Searching for: {{ searchQuery }}</p>
      <p>{{ type }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      searchQuery: {
        type: String,
        required: false
      },
      type: {
        type: String,
        required: false
      }
    },
    mounted() {
      console.log('Search Query:', this.searchQuery);
    }
  }
  </script>
  