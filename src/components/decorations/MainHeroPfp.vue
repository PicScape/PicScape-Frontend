<template>
  <div class="grid-container-hero">
    <div class="text-container-hero" ref="textContainer">
      <div class="title-container-hero">
        <h1 class="title-hero">Profile Pictures</h1>
        <p class="subtitle-hero">Share, Find, and Download your favorite Profile Pictures</p>
        <form class="search-box" @submit.prevent="openSearchQuery">
          <input type="text" id="search-input" v-model="searchTerm" placeholder="Search for profile pictures..."
            required class="search-input">
          <div class="search-button-wrapper">
            <button type="submit" class="search-button">
              <span>{{ type === 'pfp' ? 'Search for Pfps' : 'Search for Wallpapers' }}</span>
              <a class="dropdown-btn" @click.prevent="toggleDropdown">
                <span class="dropdown-arrow">&#9207;</span>
              </a>
            </button>
            <div v-if="dropdownVisible" class="dropdown-menu">
              <button @click="searchOption(type === 'pfp' ? 'wallpaper' : 'pfp')">
                Search for {{ type === 'pfp' ? 'Wallpapers' : 'Pfps' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <img class="hero-img" src="@/assets/logo.png" alt="Profile Picture">
  </div>
  <hr>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      dropdownVisible: false,
      type: 'pfp'
    };
  },
  methods: {
    openSearchQuery() {
      console.log(this.searchTerm, this.type)
      window.location.href = `/search?type=${this.type}&searchQuery=${this.searchTerm}`;
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    searchOption(option) {
      this.type = option;
      this.dropdownVisible = false;
    }
  },
  mounted() {
    this.$refs.textContainer.classList.add('fly-in');
  }
};
</script>

<style scoped>
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;
  margin-top: 8px;
  width: 200px;
}

.dropdown-menu button {
  background: none;
  border: none;
  padding: 10px 20px;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

.dropdown-menu button:hover {
  background-color: #f1f1f1;
}

.grid-container-hero {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 80px;
  width: 700px;
  margin-top: 70px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 30px;
  padding-right: 30px;
}

.text-container-hero {
  grid-column: 1;
}

.hero-img {
  width: 200px;
}

.title-container-hero {
  text-align: left;
  margin-bottom: 70px;
}

.title-hero {
  font-size: 36px;
  color: #e7e7e7;
  margin-bottom: 10px;
}

.subtitle-hero {
  font-size: 18px;
  color: #919191;
}

hr {
  border: 1px solid #4e4e4e;
  margin-bottom: 40px;
}

.search-box {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin-top: 30px;
}

.search-input {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.search-button-wrapper {
  position: relative;
  display: flex;
}

.search-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s ease-in-out;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 6.5px 10px;

}

.search-button:hover {
  background-color: #0056b3;
}

.dropdown-arrow {
  display: inline-block;
  margin-left: 6px;
  line-height: 1.3;
}
.dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}


input[type="text"] {
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 8.5px;
  width: 100%;
  box-sizing: border-box;
}

@media screen and (max-width: 768px) {
  .grid-container-hero {
    width: 80%;
    grid-template-columns: 1fr;
    gap: 0;
  }

  .hero-img {
    display: block;
    margin: 0 auto 20px;
    order: -1;
  }

  .title-container-hero {
    margin-bottom: 20px;
  }
}

/* Animation */
.text-container-hero.fly-in {
  animation: fly-in-text 0.4s ease-out forwards;
}

@keyframes fly-in-text {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
