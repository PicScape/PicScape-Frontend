<template>
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
              <button @click="openModal(image)">View Details</button>
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
    </div>
  </template>
  
  <script>
  import axiosService from '@/services/axiosService';
  
  export default {

    data() {
      return {
        images: [],
        showInfoBox: false,
        modalId: null,
      };
    },
    mounted() {
      this.fetchNewestImages();
    },
    methods: {
      async fetchNewestImages() {
        try {
          const response = await axiosService.getNewestUploads("pfp");
          console.log(response);
          this.images = response.uploads.map(image => ({
            ...image,
            url: `/image/view/${image.imgId}`,
          }));
        } catch (error) {
          console.error('Error fetching images:', error);
          this.showInfoBox = true;
        }
      },
      openModal(image) {
        this.modalId = image.imgId;
      },
    },
  };
  </script>
  <style>
  #images-pre {
    display: flex;
    justify-content: center;
    padding-bottom: 20px;
  }
  
  #images {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    padding-top: 40px;
  }
  
  @media (min-width: 768px) {
    #images {
      padding-left: calc((100% - (200px * 4) - (3 * 10px)) / 2);
      padding-right: calc((100% - (200px * 4) - (3 * 10px)) / 2);
    }
  }
  
  
  .image-container {
    position: relative;
    border-radius: 15%;
    width: 120px;
    height: 120px;
    overflow: hidden;
    border: 1px solid #ccc;
    text-align: center;
    transition: transform 0.3s ease;
  }
  
  .image-container:hover {
    transform: scale(1.1);
  }
  
  .image-container img {
    height: 120px;
    width: 120px;
    transition: transform 0.3s ease;
  }
  
  .image-container:hover img {
    transform: scale(1.1);
  }
  
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: none;
    transition: opacity 0.3s ease;
  }
  
  .image-container:hover .overlay {
    display: block;
    opacity: 1;
  }
  
  .overlay button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }
  
  .container {
    padding-left: 2000px;
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