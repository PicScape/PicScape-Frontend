<template>
  <div>
    <div id="module-container">
      <router-link to="/wallpapers" id="slide-title">
        Wallpapers<i> &#11106;</i>
      </router-link>
    <div id="slider-container" ref="sliderContainer">
      <div id="slider" :style="{ transform: `translateX(-${currentSlide * 700}px)` }">
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
      <button class="slider-button left" @click="prevSlide">‹</button>
      <button v-if="currentSlide <= 4" class="slider-button right" @click="nextSlide">›</button>
      <button v-else class="slider-button right" @click="redirectToAnotherPage">Show More</button>
    </div>
  </div>
    <div id="info-box" v-if="showInfoBox" class="info-box">
      <p>Unable to reach the API.</p>
    </div>

    <ImageModal
      :show-modal="modalId !== null"
      :modal-content="findImageById(modalId)"
      @close="modalId = null"
      @delete-success="fetchNewestImages"
    />
  </div>
</template>


<script>
import axiosService from '@/services/axiosService';
import ImageModal from '@/components/widgets/modals/UploadModal.vue';

const baseURL = process.env.VUE_APP_API_URL;

export default {
  components: {
    ImageModal,
  },
  data() {
    return {
      images: [],
      showInfoBox: false,
      modalId: null,
      currentSlide: 0,
    };
  },
  mounted() {
    this.fetchNewestImages();
  },
  methods: {
    async fetchNewestImages() {
      try {
        const response = await axiosService.getNewestUploads("wallpaper");
        this.images = response.uploads.map(image => ({
          ...image,
          url: `${baseURL}/image/view/${image.imgId}`,
        }));
        console.log(response)
      } catch (error) {
        console.error('Error fetching images:', error);
        this.showInfoBox = true;
      }
    },
    openModal(image) {
      this.modalId = image.imgId;
    },
    findImageById(id) {
      return this.images.find(image => image.imgId === id);
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    nextSlide() {
      if (this.currentSlide < this.images.length - 1) {
        this.currentSlide++;
      }
    },

  },
};
</script>

<style scoped>

#slide-title {
  font-size: 25px;
  font-weight: bold;
  margin-left: 5px;
  margin-bottom: 10px;
  display: inline-block;
  cursor: pointer;
  color: inherit;
  text-decoration: none;

}

#slide-title:hover {
  text-decoration: underline;
}

#slide-title i {
  font-size: 25px;
  font-weight: bold;
  text-align: left;
  margin-left: -1px;
  font-style: normal;
}

#slider-container {
  position: relative;
  overflow: hidden; 
  margin-bottom: 40px;

}

#module-container{
  margin-left: auto;
  margin-right: auto;
  width: 1200px;
  text-align: left;


}

#slider-container::before,
#slider-container::after {
  content: '';
  position: absolute;
  top: 0;
  width: 1%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
}

#slider-container::before {
  left: 0;
  background: linear-gradient(to right, var(--background-color), rgba(255, 255, 255, 0));
}

#slider-container::after {
  right: 0;
  background: linear-gradient(to left, var(--background-color), rgba(255, 255, 255, 0));
}
#slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.image-container {
  position: relative;
  border-radius: 10px;
  width: 300px;
  height: 180px;
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  margin: 10px;
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

.overlay button:hover {
  background-color: var(--submit-btn-secondary);
}

.slider-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
}

.slider-button.left {
  left: 0;
  z-index: 3;

}

.slider-button.right {
  right: 0;
  z-index: 3;
}

.show-more-button {
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background-color: var(--submit-btn-primary);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.show-more-button:hover {
  background-color: var(--submit-btn-secondary);
}
</style>

