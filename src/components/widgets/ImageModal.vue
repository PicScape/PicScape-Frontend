<template>
  <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <button class="close" @click="closeModal">&times;</button>

      <div class="image-modal-details-container">
        <img :src="imageURL" alt="Modal Image" class="modal-image" />
        <div class="information-box">
          <h3 class="text-set-large">{{ modalContent.title }}</h3>
          <h3 class="text-set-middle-sub">{{ modalContent.imgId }}</h3>
        </div>
        <hr />

        <div class="information-box">
          <div style="margin-bottom: 10px;">
            <h3 class="text-set-middle-bottom">Description:</h3>
            <p class="img-description">{{ modalContent.description }}</p>
          </div>
          <div style="margin-bottom: 10px;">
            <h3 class="text-set-middle-bottom">Tags:</h3>
            <div>
              <span v-for="tag in modalContent.tags" :key="tag" class="img-tag">{{ tag }}</span>
            </div>
          </div>

          <div style="margin-bottom: 10px;">
            <h3 class="text-set-middle-bottom">Uploaded by:</h3>
            <p class="img-author">{{ modalContent.author }}</p>
          </div>

          <div style="margin-bottom: 10px;">
            <h3 class="text-set-middle-bottom">Publish Date:</h3>
            <p class="img-upload-date">{{ modalContent.uploadDate }}</p>
          </div>
        </div>

        <div>
          <button class="action-button" @click="confirmDelete" id="delete-button">Delete</button>
          <button class="action-button" id="downloadButton">Download</button>
        </div>
      </div>
    </div>
  </div>
</template>

  
  <script>
  export default {
    props: {
      showModal: {
        type: Boolean,
        required: true
      },
      modalContent: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        imageURL: ''
      };
    },
    watch: {
      modalContent: {
        immediate: true,
        handler(newVal) {
          if (newVal && newVal.imgId) {
            this.imageURL = `http://localhost:3000/image/view/${newVal.imgId}`;
          }
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      confirmDelete() {
        this.$emit('delete');
      }
    }
  };
  </script>
  
  <style>
  /* Global styles for the modal */
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.5s ease-in-out;
  }
  
  .modal-content {
    background-color: #23272a;
    margin: 5% auto;
    padding: 20px;
    border: 1px solid #888;
    border-radius: 4%;
    width: 500px;
    max-height: 80%;
    overflow-y: auto;
    text-align: left;
    animation: slideIn 0.5s ease-in-out;
  }
  
  .close {
    position: absolute;
    color: #757575;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  
  .close:hover {
    color: #ff0000;
  }
  
  .modal-image {
    width: 150px;
    height: 150px;
    margin: 15px;
    margin-bottom: 0;
    border-radius: 15%;
    background-color: #101213;
    box-shadow: 10px 10px #15181a;
  }
  
  .information-box {
    margin: 15px;
  }
  
  hr {
    margin: 15px;
    border: 1px solid #4e4e4e;
  }
  
  .text-set-large {
    font-size: 30px;
  }
  
  .text-set-middle-sub,
  .text-set-middle-bottom-sub {
    font-size: 17px;
    color: #e7e7e7;
  }
  
  .text-set-middle-bottom {
    font-size: 17px;
    color: #919191;
  }
  
  .img-tag {
    display: inline-block;
    background-color: #007bff;
    color: white;
    padding: 1px 8px;
    border-radius: 3px;
    margin-right: 6px;
    margin-top: 6px;
  }
  
  .action-button {
    margin: 5px 15px;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-align: center;
    text-decoration: none;
    transition: 0.2s ease-in-out;
  }
  
  .action-button:nth-child(1) {
    background-color: #ff0000;
    color: white;
  }
  
  .action-button:nth-child(2) {
    background-color: #007bff;
    color: white;
  }
  
  .action-button:hover {
    opacity: 0.8;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  @keyframes slideIn {
    from {
      transform: translateY(-50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>
  