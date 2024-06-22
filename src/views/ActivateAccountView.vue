<template>
    <div>
      <h1>Account Activated!</h1>
    </div>
  </template>
  
  <script>

import axiosService from '@/services/axiosService';
import Cookies from 'js-cookie';

  export default {
    props: {
      activationToken: {
        type: String,
        required: true
      }
    },
    mounted() {
      console.log('Activation Token:', this.activationToken);
      
      this.processActivation(this.activationToken);
    },
    methods: {
      async processActivation(activationToken) {
        try{
            const response = await axiosService.ActivateAccount(activationToken)
            Cookies.set('token', response.token);
            window.location.href = '/';
        }catch{
            console.error("error activating account and login");
            window.location.href = '/';

        }
        
      }
    }
  }
  </script>
  
  <style scoped>
  </style>
  