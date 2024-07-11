<!-- src/components/SideNav.vue -->
<template>
    <div class="side-nav">
      <ul>
        <li><router-link to="/admin">Dashboard</router-link></li>
        <li><router-link to="/admin/users">Users</router-link></li>
        <li><router-link to="/admin/reports">Reports</router-link></li>
        <li><router-link to="/admin/uploads">Uploads</router-link></li>

      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SideNav',
  };
  </script>
  
  <style scoped>
  .side-nav {
    width: 200px;
    height: 100vh;
    background-color: #333;
    color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .side-nav ul {
    list-style-type: none;
    padding: 0;
  }
  
  .side-nav ul li {
    margin: 20px 0;
  }
  
  .side-nav ul li a {
    color: #fff;
    text-decoration: none;
  }
  
  .side-nav ul li a:hover {
    text-decoration: underline;
  }
  </style>
  