<template>
    <AccountsList
      :sortField="created_at"
      :sortOrder="dec"
    />
    
</template>
  
  <script>
  import AccountsList from '@/components/admin/AccountsList.vue';

  export default {
    components: {
        AccountsList,
    }
  };
  
  </script>