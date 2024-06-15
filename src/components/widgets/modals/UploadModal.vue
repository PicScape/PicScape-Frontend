<template>
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <button class="close" @click="closeModal" aria-label="Close modal">&times;</button>
            <div class="image-modal-details-container">
                
                <div class="image-modal-wallpaper-wrapper" @click="toggleImageSize" :class="{ 'magnified': isImageMagnified }">
                    <img v-if="!isImageMagnified"
                         :src="imageURL" :alt="modalContent.title"
                         :class="getImageClass(modalContent.type)" />
                    <img v-else
                         :src="imageURL" :alt="modalContent.title"
                         class="modal-image-wallpaper-magnified" />
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
                    <div v-if="modalContent.username">
                        <div class="text-set-middle-bottom">Uploaded by:</div>
                        <div class="img-author text-set-middle-bottom-sub">{{ modalContent.username }}</div>
                    </div>
                    <div>
                        <div class="text-set-middle-bottom">Publish Date:</div>
                        <div class="img-upload-date text-set-middle-bottom-sub">{{ formattedDate }}</div>
                    </div>
                </div>
            </div>
            <button v-if="canDelete" id="delete-button" @click="handleDelete">Delete</button>
            <button id="downloadButton" @click="downloadImage">Download</button>
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
            default: () => ({
                title: '',
                imgId: '',
                description: '',
                tags: [],
                username: '',
                uploadedDate: '',
                author: ''
            })
        }
    },

    data() {
        return {
            imageURL: '',
            userId: null,
            authorId: null,
            authorUsername: null,
            isImageMagnified: false
        };
    },


    computed: {
        canDelete() {
            return this.userId === this.modalContent.authorId;

        },
        formattedDate() {
            if (this.modalContent.uploadedDate) {
                const date = new Date(this.modalContent.uploadedDate);
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const hours = date.getHours().toString().padStart(2, '0');
                const minutes = date.getMinutes().toString().padStart(2, '0');

                return `${day}.${month}.${year} ${hours}:${minutes}`;
            }
            return '';
        }
    },
    async created() {
        try {
            const user = await axiosService.checkTokenValidity();
            this.userId = user.user.id;
            if (this.modalContent && this.modalContent.author) {
            const author = await axiosService.getUser("userId", this.modalContent.author);
            this.authorUsername = author.user.username;
        }
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
            toggleImageSize() {
            this.isImageMagnified = !this.isImageMagnified;
        },
        getImageClass(type) {
            // Determine the class based on the image type (pfp or wallpaper)
            return {
                'modal-image-pfp': type === 'pfp',
                'modal-image-wallpaper': type === 'wallpaper'
            };
        },
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
                        this.$emit('error', 'Failed to delete the image.');
                    }
                }
            },

            downloadImage() {
    fetch(this.imageURL)
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;

            const filename = `${this.modalContent.title}-${this.modalContent.imgId}`.replace(/\s+/g, '_') + '.jpg';
            link.download = filename || 'download';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
        })
        .catch(error => {
            console.error('Error downloading image:', error);
        });
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

.image-modal-wallpaper-wrapper.magnified {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(0, 0, 0, 0.8);
    padding: 20px;
}

.image-modal-wallpaper-wrapper.magnified img {
    max-height: 80vh;
    max-width: 80%;
    display: block;
    margin: auto;
}

.modal-image-pfp {
    width: 150px;
    height: 150px;
    margin: 15px;
    margin-bottom: 0;
    border-radius: 15%;
    margin-bottom: 30px;
    background-color: #101213;
    box-shadow: 10px 10px #15181a;
}

.modal-image-wallpaper {
    width: calc(100% - 40px);
    max-height: 240px;
    object-fit: contain;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    margin-bottom: 5px;
    height: auto;
    box-shadow: 0 5px 9px rgba(0, 0, 0, 0.4);
}

.modal-image-wallpaper-magnified {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
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
    margin-bottom: 10px;
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
    margin-bottom: 10px;
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



.modal-image-pfp {
    width: 150px;
    height: 150px;
    margin: 15px;
    margin-bottom: 0;
    border-radius: 15%;
    margin-bottom: 30px;

    background-color: #101213;
    box-shadow: 10px 10px #15181a;
}

.modal-image-wallpaper {
    width: calc(100% - 40px);
    max-height: 240px;
    object-fit: contain;
    margin-left: 15px;
    margin-right: 15px;
    margin-top: 15px;
    margin-bottom: 5px;
    height: auto;
    box-shadow: 0 5px 9px rgba(0, 0, 0, 0.4);

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
    color: #e7e7e7;
    font-weight: bold;
    margin-bottom: 10px;


}

.text-set-middle-sub {
    font-size: 16px;
    color: #919191;
    font-weight: bold;

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