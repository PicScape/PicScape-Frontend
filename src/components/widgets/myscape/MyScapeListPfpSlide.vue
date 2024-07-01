<template>
    <div>
      <h1>MyScape</h1>
      <p>User ID: {{ userid }}</p>
    </div>
  </template>
  
  <script>
  import axiosService from '@/services/axiosService';
  
  export default {
    data() {
      return {
        userid: null
      };
    },
    mounted() {
      this.userid = this.$route.params.userid;
  
      const type = 'pfp';
      const page = 1;
  
      axiosService.getUploadsFromUser(this.userid, type, page)
        .then(response => {
          console.log('Uploads from user:', response);
        })
        .catch(error => {
          console.error('Error fetching uploads:', error);
        });
    }
  };
  </script>
  