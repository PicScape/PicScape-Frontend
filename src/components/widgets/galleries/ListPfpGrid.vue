<template>
  <div class="topper">
    <SearchTitleAnimation />
    <div class="subtitle">Choose your favorite profile picture or wallpaper from a collection of {{ total_uploads }}
      uploads!</div>

    <form class="search-box" @submit.prevent="openSearchQuery">
      <input type="text" id="search-input" v-model="searchTerm" placeholder="Search" class="search-input">
      <div class="search-button-wrapper">
        <button type="submit" class="search-button">
          <span>{{ seltype === 'pfp' ? 'Search for Pfps' : 'Search for Wallpapers' }}</span>
          <a class="dropdown-btn" @click.prevent="toggleDropdown">
            <span class="dropdown-arrow">&#9207;</span>
          </a>
        </button>
        <div v-if="dropdownVisible" class="dropdown-menu">
          <button @click="searchOption(seltype === 'pfp' ? 'wallpaper' : 'pfp')">
            Search for {{ seltype === 'pfp' ? 'Wallpapers' : 'Pfps' }}
          </button>
        </div>
      </div>
    </form>
  </div>

  <div>
    <div id="images-pre">
      <div id="images">
        <div
          v-for="(image, index) in images"
          :key="index"
          class="image-container"
        >
          <img :src="image.url" :alt="image.title" />
          <div class="overlay">
            <button @click="openModal(image)">View</button>
          </div>
        </div>
      </div>
    </div>
    <div
      id="info-box"
      v-if="showInfoBox"
      class="info-box"
    >
      <p>Unable to reach the API.</p>
    </div>

    <!-- Modal component usage -->
    <ImageModal
      :show-modal="modalId !== null"
      :modal-content="findImageById(modalId)"
      @close="modalId = null"
      @delete-success="fetchNewestImages"
    />
  </div>
</template>

<script>
const baseURL = process.env.VUE_APP_API_URL;

import axiosService from '@/services/axiosService';
import ImageModal from '@/components/widgets/modals/UploadModal.vue';

export default {

  components: {
    ImageModal,
  },
  data() {
    return {
      images: [],
      showInfoBox: false,
      modalId: null,
      page: 1,
      loading: false, 
      hasMore: true, 
    };
  },
  mounted() {
    this.fetchNewestImages();
    this.setupScrollListener();
  },

  methods: {

    async fetchNewestImages() {
  if (!this.hasMore || this.loading) return;

  this.loading = true;

  try {
    const response = await axiosService.getNewestUploads("pfp", this.page);
    const newImages = response.uploads.map(image => ({
      ...image,
      url: `${baseURL}/image/view/${image.imgId}?lowRes=true`,
    }));

    this.images = [...this.images, ...newImages];
    this.page++;
    this.loading = false;

    this.hasMore = newImages.length > 0;

    this.checkScrollEnd();
  } catch (error) {
    console.error('Error fetching images:', error);
    this.showInfoBox = true;
    this.loading = false;
  }
},
checkScrollEnd() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
    this.fetchNewestImages();
  }
},

    openModal(image) {
      this.modalId = image.imgId;
    },

    findImageById(id) {
      return this.images.find(image => image.imgId === id);
    },

    setupScrollListener() {
  window.addEventListener('scroll', () => {
    this.checkScrollEnd();
  });
},
  },
};
</script>

<style scoped>
#images-pre {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  padding-left: calc((100% - (800px)) / 2);
  padding-right: calc((100% - (800px)) / 2);


}

#images {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  gap: 20px;
  padding-top: 40px;
  padding: auto;
  justify-content: center;
  margin-left: 50px;
  margin-right: 50px;




}


.image-container {
  position: relative;
  border-radius: 10%;
  width: 100px;
  height: 100px;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.image-container:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity 0.3s ease;
}

.image-container:hover .overlay {
  opacity: 1;
}

.overlay button {
  color: white;
  background-color: var(--submit-btn-primary);
  padding: 7px 15px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.topper {
  margin-bottom: 60px;
  margin-left: auto;
  margin-top: 70px;

  margin-right: auto;
  padding-left: calc((100% - (870px)) / 2);
  padding-right: calc((100% - (870px)) / 2);
}

.subtitle {
  text-align: left;

  margin-top: 6px;
  font-weight: 500;

  color: var(--white-surface-300);
}

.search-box {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin-top: 40px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

.overlay button:hover {
  background-color: var(--submit-btn-secondary);
}

.dropdown-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.dropdown-arrow {
  display: inline-block;
  margin-left: 6px;
  line-height: 1.3;
}

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

.search-input {
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}

.search-button-wrapper {
  position: relative;
  display: flex;
}

.info-box {
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  border: 1px solid #f5c6cb;
  border-radius: 5px;
  margin: 10px auto;
  width: 500px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
