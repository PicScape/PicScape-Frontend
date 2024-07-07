<template>
  <div class="grid-container-hero">
    <div class="text-container-hero" ref="textContainer">
      <div class="title-container-hero">
        <h1 class="title-hero">Profile Pictures</h1>
        <p class="subtitle-hero">Share, Find, and Download your favorite Profile Pictures</p>
        <div class="search-box">
          <input type="text" id="search-input" @input="filterProducts" v-model="searchTerm" placeholder="Search for profile pictures..." class="search-input">
          <button type="button" class="search-button">Search</button>
        </div>
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
      searchTerm: ''
    };
  },
  methods: {
    filterProducts() {
    }
  },
  mounted() {
    this.$refs.textContainer.classList.add('fly-in');
  }
};
</script>

<style scoped>
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

.search-button {
  background-color: #007bff;
  color: white;
  padding: 8px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: 0.2s ease-in-out;
  border-top-left-radius: 0px !important;
  border-bottom-left-radius: 0px !important;
}

.search-button:hover {
  background-color: #0056b3;
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
