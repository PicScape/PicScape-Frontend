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

  <hr>

  <div class="list-container">

    <div id="images-pre">
      <div id="images">
        <div v-for="(image, index) in images" :key="index"
          :class="['image-container', { pfp: localType === 'pfp', wallpaper: localType === 'wallpaper' }]">
          <img :src="image.url" :alt="image.title" />
          <div class="overlay">
            <button @click="openModal(image)">View</button>
          </div>
        </div>
      </div>
    </div>

    <div id="info-box" v-if="showInfoBox" class="info-box">
      <p>Unable to reach the API.</p>
    </div>

    <!-- Modal component usage -->
    <ImageModal :show-modal="modalId !== null" :modal-content="findImageById(modalId)" @close="modalId = null"
      @delete-success="handleDeleteSuccess" />
  </div>
</template>



<script>
const baseURL = process.env.VUE_APP_API_URL;

import axiosService from '@/services/axiosService';
import ImageModal from '@/components/widgets/modals/UploadModal.vue';
import SearchTitleAnimation from '@/components/decorations/SearchTitleAnimation.vue';

export default {
  props: {
    searchQuery: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false
    }
  },
  components: {
    ImageModal,
    SearchTitleAnimation,
  },
  data() {
    return {
      images: [],
      showInfoBox: false,
      modalId: null,
      page: 1,
      loading: false,
      hasMore: true,
      userid: '',
      searchTerm: '',
      dropdownVisible: false,
      localType: 'pfp',
      localQuery: '',
      seltype: 'pfp',
      total_uploads: 0,


    };
  },
  async mounted() {

    const stats = await axiosService.getStats()
    this.total_uploads = stats.uploads.total
    const user = await axiosService.checkTokenValidity()
    if (user) {
      this.userid = user.user.id;
    }


    try {
      if(this.type){
        this.localType = this.type

      }
      if(this.searchQuery){
        this.localQuery = this.searchQuery

      }
      this.seltype = this.localType
      this.fetchSearchQuery(this.localType, this.localQuery);
      
    } catch (error) {
      console.log("Error while mounting:", error);
    }
    this.searchTerm = this.searchQuery || '';
    this.setupScrollListener();
  },

  methods: {
    async fetchSearchQuery(type, searchQuery) {
      if (!this.hasMore || this.loading) return;

      this.loading = true;

      try {
        if (!type || !searchQuery) {
          const response = await axiosService.getNewestUploads(type, this.page, searchQuery);
          const newImages = response.uploads.map(image => ({
            ...image,
            url: `${baseURL}/image/view/${image.imgId}?lowRes=true`,
          }));

          this.images = [...this.images, ...newImages];
          this.page++;
          this.loading = false;

          this.hasMore = newImages.length > 0;

          this.checkScrollEnd();
        } else {
          const response = await axiosService.getUploadsQuery(type, this.page, searchQuery);
          const newImages = response.uploads.map(image => ({
            ...image,
            url: `${baseURL}/image/view/${image.imgId}?lowRes=true`,
          }));

          this.images = [...this.images, ...newImages];
          this.page++;
          this.loading = false;

          this.hasMore = newImages.length > 0;

          this.checkScrollEnd();
        }

      } catch (error) {
        console.error('Error fetching images:', error);
        this.showInfoBox = true;
        this.loading = false;
      }
    },
    openSearchQuery() {
      this.localType = this.seltype
      this.page = 1;
      this.images = [];
      this.hasMore = true;
      this.localQuery = this.searchTerm
      this.$router.push(`/search?type=${this.localType}&searchQuery=${this.searchTerm}`);
      this.fetchSearchQuery(this.localType, this.localQuery);
    },
    checkScrollEnd() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        this.fetchSearchQuery(this.localType, this.localQuery);
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

    handleDeleteSuccess() {
      this.modalId = null;
      this.page = 1;
      this.images = [];
      this.hasMore = true;
      this.fetchSearchQuery(this.localType, this.localQuery);
    },
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    },
    searchOption(option) {
      this.seltype = option;
      this.dropdownVisible = false;
      if (this.searchTerm) {
        this.openSearchQuery()
      }

    }
  },
};
</script>

<style scoped>
.subtitle {
  text-align: left;

  margin-top: 6px;
  font-weight: 500;

  color: var(--white-surface-300);
}



.topper {
  margin-bottom: 60px;
  margin-left: auto;
  margin-top: 70px;

  margin-right: auto;
  padding-left: calc((100% - (870px)) / 2);
  padding-right: calc((100% - (870px)) / 2);

}

hr {
  border: 1px solid #4e4e4e;
  margin-bottom: 20px;
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

.search-box {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  margin-top: 40px;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
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


.list-container {
  width: 870px;
  margin-left: auto;
  margin-right: auto;

}

@media (max-width: 890px) {

  .list-container {
    width: calc(100% - 20px);

  }

  .topper {
    margin-left: 20px;
    margin-right: 20px;

  }

  .image-container.wallpaper {
    width: 40% !important;
    height: 130px;
  }
}

@media (max-width: 400px) {

  .image-container.wallpaper {
    height: 90px !important;
  }


}

#toggle-buttons.tabs {

  display: flex;
  justify-content: left;
  margin-bottom: 20px;


}


#toggle-buttons.tabs button {
  font-weight: bold;

  margin: 0;
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--color-surface-900);
  color: #333;
  border: none;
  border-bottom: 2px solid transparent;
  transition: color 0.3s ease, border-bottom 0.3s ease;
  font-size: 16px;
  width: 180px;
}

#toggle-buttons.tabs button.active {
  background-color: var(--color-surface-1000);
  color: #dbdbdb;
  border-bottom: 2px solid var(--submit-btn-primary);
}

#toggle-buttons.tabs button:not(.active):hover {
  color: #a0a0a0;
}

#images-pre {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  padding-left: calc((100% - (870px)) / 2);
  padding-right: calc((100% - (870px)) / 2);

}

#images {

  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding-top: 40px;
  padding: auto;
  justify-content: center;
  width: 100%;

}

.image-container {
  position: relative;
  border-radius: 10px;

  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin: 10px;
}

.image-container.pfp {
  border-radius: 10%;
  width: 100px;
  height: 100px;
}

.image-container.wallpaper {
  width: 30%;
  height: 150px;
}




.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-container:hover {
  transform: scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
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

.overlay button:hover {
  background-color: var(--submit-btn-secondary);
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