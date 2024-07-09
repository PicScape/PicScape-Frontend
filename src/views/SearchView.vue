<template>

    <ListSearchGrid :searchQuery="searchQuery" :type="type" />
  </template>
  
  <script>
    import ListSearchGrid from '@/components/widgets/galleries/ListSearchGrid.vue';

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
    components: {
      ListSearchGrid
    },
    mounted() {
      console.log('Search Query:', this.searchQuery);
    }
  }
  </script>
  