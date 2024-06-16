<template>
  <div>
    <div id="slider-container" ref="sliderContainer">
      <div
        id="slider"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
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
      <button class="slider-button right" @click="nextSlide">›</button>
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
      currentSlide: 0,
    };
  },
  mounted() {
    this.fetchNewestImages();
  },
  methods: {
    async fetchNewestImages() {
      try {
        const response = await axiosService.getNewestUploads("pfp");
        this.images = response.uploads.map(image => ({
          ...image,
          url: `${baseURL}/image/view/${image.imgId}`,
        }));
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
#slider-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

#slider {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.image-container {
  position: relative;
  border-radius: 10%;
  width: 100px;
  height: 100px;
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
}

.slider-button.right {
  right: 0;
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
