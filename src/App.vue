<template>
  <div>
    <img src="@/assets/logo.png" class="logo" style="height: 200px; padding-top: 30px;">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/upload">Upload</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffffff;

  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #99aab5;

  text-decoration: none;

}
</style>
