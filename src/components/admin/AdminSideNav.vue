<template>

  <div :class="['side-nav', { 'collapsed': isCollapsed }]">

    <ul>
      <li><router-link to="/admin">Dashboard</router-link></li>
      <li><router-link to="/admin/users">Users</router-link></li>
      <li><router-link to="/admin/reports">Reports</router-link></li>
      <li><router-link to="/admin/uploads">Uploads</router-link></li>
    </ul>
  </div>
  <div>
    <button @click="toggleCollapse" class="toggle-btn">
  <span v-if="isCollapsed">{{`>`}}</span>
  <span v-else>{{`<`}}</span>
</button>
  </div>
</template>

  
  <script>
  export default {
    name: 'SideNav',
    data() {
      return {
        isCollapsed: false
      };
    },
    methods: {
      toggleCollapse() {
        this.isCollapsed = !this.isCollapsed;
      }
    }
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
  transition: width 0.3s ease; /* Optional: Add smooth transition */
}

.collapsed {
  width: 0;
  padding: 0;
  overflow: hidden;
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

.toggle-btn {
  background-color: transparent;
  position: absolute;
  border: none;
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  outline: none;
}

.toggle-btn span {
  transition: transform 0.3s ease;
}

.toggle-btn span:hover {
  transform: scale(1.2);
}

</style>

  