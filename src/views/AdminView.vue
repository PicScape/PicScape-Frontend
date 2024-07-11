

<template>
  <div class="admin-container">
    <adminSideNav/>
    <div class="admin-content">
      <router-view/>

    </div>
  </div>
</template>

<script>
import adminSideNav from '@/components/admin/AdminSideNav';

export default {
  components: {
    adminSideNav,
    
  },
};
</script>

<style scoped>
.admin-container {
  display: flex;
}

.admin-content {
  flex: 1;
  padding: 20px;
}
</style>
