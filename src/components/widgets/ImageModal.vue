<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close" @click="closeModal">&times;</button>
  
        <div class="image-modal-details-container">
          <img :src="imageURL" id="modal-image" />
  
          <div class="information-box">
            <h3 class="img-title text-set-large">{{ modalContent.title }}</h3>
            <h3 class="img-id text-set-middle-sub">{{ modalContent.imgId }}</h3>
          </div>
          <hr>
  
          <div class="information-box">
            <div>
              <div class="text-set-middle-bottom">Description:</div>
              <div class="img-description text-set-middle-bottom-sub">{{ modalContent.description }}</div>
            </div>
  
            <div>
              <div class="text-set-middle-bottom" style="margin-bottom: 5px">Tags:</div>
              <div class="img-tags text-set-middle-bottom-sub">
                <span v-for="tag in modalContent.tags" :key="tag" class="img-tag">{{ tag }}</span>
              </div>
            </div>
  
            <div>
              <div class="text-set-middle-bottom">Uploaded by:</div>
              <div class="img-author text-set-middle-bottom-sub">{{ modalContent.author }}</div>
            </div>
  
            <div>
              <div class="text-set-middle-bottom">Publish Date:</div>
              <div class="img-upload-date text-set-middle-bottom-sub">{{ modalContent.uploadedDate }}</div>
            </div>
          </div>
        </div>
  
        <button v-if="canDelete" id="delete-button" @click="handleDelete">Delete</button>
  
        <button id="downloadButton">Download</button>
      </div>
    </div>
  </template>
  
  <script>
  import axiosService from '@/services/axiosService';
  
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
        imageURL: '',
        userId: null,
        authorId: null
      };
    },
  
    computed: {
      canDelete() {
        return this.userId == this.modalContent.author;
      }
    },
  
    async created() {
      try {
        const response = await axiosService.checkTokenValidity();
        this.userId = response.user.id;
        
      } catch (error) {
        console.error('Error fetching user ID:', error.message);
      }
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
  
      async handleDelete() {
        let confirmMessage = '';
        if (this.modalContent.type === 'pfp') {
          confirmMessage = 'Are you sure you want to delete this Profile Picture?';
        } else if (this.modalContent.type === 'wallpaper') {
          confirmMessage = 'Are you sure you want to delete this Wallpaper?';
        } else {
          confirmMessage = 'Are you sure you want to delete this upload?';
        }
  
        if (window.confirm(confirmMessage)) {
          try {
            await axiosService.deleteUpload(this.modalContent.imgId);
            this.$emit('delete-success', this.modalContent.imgId);
            this.closeModal();
          } catch (error) {
            console.error('Error deleting upload:', error.message);
          }
        }
      }
    }
  };
  </script>

  <style>

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.modal-content {
  background-color: #23272a;
  margin: 5% auto;
  padding: 20px;
  border-radius: 3%;

  width: 430px;
  max-height: 80%;
  overflow-y: auto;

  animation: slideIn 0.5s ease-in-out;
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




.close {
    color: #757575;
    float: right;

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
  





#delete-button {
  float: right;
  margin-right: 15px;
  margin-bottom: 5px;
  padding: 10px 20px;
  background-color: #ff0000;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  font-weight: 700;

}

#delete-button:hover {
  background-color: #8d0000;

}

#downloadButton {
  float: left;
  margin-left: 15px;
  margin-bottom: 5px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: 0.2s ease-in-out;
  font-weight: 700;


}

#downloadButton:hover {
  background-color: #0056b3;
}




.image-modal-details-container {
  text-align: left;
  padding-bottom: 10px;
}

#modal-image {
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
  margin-left: 15px;
  margin-right: 15px;
  border: 1px solid #4e4e4e;
}

.text-set-large {
  font-size: 30px;
}

.text-set-middle-sub {
  font-size: 16px;
  color: #919191;
}

.text-set-middle-bottom-sub {
  font-size: 17px;
  color: #e7e7e7;
  font-weight: bold;
  margin-bottom: 20px;


}

.text-set-middle-bottom {
  color: #919191;
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 10px;
}

img-tag {
  text-decoration: none;
  color: #fff;
  background-color: #007bff;
  padding: 1px 8px;
  border-radius: 3px;
  margin-right: 6px;
  display: inline-block;
  transition: background-color 0.3s ease;
  margin-top: 6px;
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

</style>
  