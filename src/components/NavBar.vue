<template>
    <div>
      <header class="navbar">
        <div class="header-container">
          <router-link to="/" class="logo">PicScape</router-link>
          <nav>
            <router-link to="/" class="nav-link">Home</router-link>
            <router-link to="/upload" class="nav-link">Upload</router-link>
            <router-link to="/login" class="nav-link">Login</router-link>
          </nav>
        </div>
      </header>
    </div>
  </template>
  
  <style>
  .navbar {
    background-color: #282c34;
    color: #fff;
    padding: 10px 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .header-container {
    width: 100%;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s;
    cursor: pointer;

  }
  
  .logo:hover {
    color: #ffd700;
  }
  
  nav {
    display: flex;
  }
  
  .nav-link {
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    margin-left: 20px;
    transition: color 0.3s;
    cursor: pointer;

  }
  
  .nav-link:hover {
    color: #007bff;
  }
  </style>
  