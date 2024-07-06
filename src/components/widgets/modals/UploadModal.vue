<template>
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <div v-if="showModal" class="modal-overlay" @click.self="closeModal">
        <div class="modal-content">
            <button class="close" @click="closeModal" aria-label="Close modal">&times;</button>


            <div class="image-modal-details-container">
                <div class="image-modal-img-wrapper"
                    :class="{ 'magnified': isImageMagnified, 'centered': modalContent.type === 'wallpaper', 'rounded': isRounded && modalContent.type === 'pfp' }">
                    <div :class="{ 'image-group': !isImageMagnified }">
                        <img v-if="!isImageMagnified" :src="imageURL" :alt="modalContent.title"
                            :class="getImageClass(modalContent.type)" />
                        <img v-else :src="imageURL" :alt="modalContent.title" class="modal-image-img-magnified"
                            @click="toggleImageSize" />

                        <div class="overlay-button-group" v-if="!isImageMagnified">
                            <button @click="toggleImageSize" class="overlay-button"><span
                                    class="material-symbols-outlined">
                                    fullscreen
                                </span></button>
                            <button @click="toggleRoundImage" v-if="modalContent.type === 'pfp'" class="overlay-button">
                                <span v-if="!isRounded" class="material-symbols-outlined">circle</span>
                                <span v-if="isRounded" class="material-symbols-outlined">crop_square</span>
                            </button>
                        </div>
                    </div>
                </div>


                <div class="information-box">
                    <div class="title-container">
                        <h3 class="img-title text-set-large title-ctn-item">{{ modalContent.title }}</h3>
                        <div @click="shareClick" class="share-container"><span
                                class="material-symbols-outlined title-ctn-item share noselect">share</span></div>
                    </div>
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
                    <div v-if="modalContent.username" @click="redirectToAuthorMyScape">
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
        <div id="snackbar">Copied to Clipboard</div>

    </div>

</template>

<script>
import axiosService from '@/services/axiosService';
const baseURL = process.env.VUE_APP_API_URL;

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
    emits: ['close', 'delete-success'],
    data() {
        return {
            imageURL: '',
            userId: null,
            authorId: null,
            authorUsername: null,
            isImageMagnified: false,
            isRounded: false,
            isAdmin: false,
            imgId: '',


        };
    },


    computed: {
        canDelete() {
            return this.userId === this.modalContent.authorId || this.isAdmin === true;

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
            const storedIsRounded = localStorage.getItem("isRounded");
            this.isRounded = storedIsRounded ? JSON.parse(storedIsRounded) : false;
            const user = await axiosService.checkTokenValidity();
            this.userId = user.user.id;
            this.isAdmin = user.user.isAdmin;
            if (this.modalContent && this.modalContent.author) {
                const author = await axiosService.getUser("userId", this.modalContent.author);
                this.authorUsername = author.user.username;
            }
        } catch (error) {
            console.info('Error fetching user ID:', error.message);
        }

    },

    watch: {
        modalContent: {
            immediate: true,
            handler(newVal) {
                if (newVal && newVal.imgId) {
                    this.imageURL = `${baseURL}/image/view/${newVal.imgId}`;
                    this.imgId = newVal.imgId
                }
            }
        }
    },

    methods: {
        shareClick() {
            var x = document.getElementById("snackbar");
            navigator.clipboard.writeText(`${window.location}uploads/${this.imgId}`);
            x.className = "show";

            setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
        },
        toggleImageSize() {
            this.isImageMagnified = !this.isImageMagnified;
        },
        getImageClass(type) {
            return {
                'modal-image-pfp': type === 'pfp',
                'modal-image-wallpaper': type === 'wallpaper'
            };
        },
        closeModal() {
    this.imgId = this.$route.params.imgId;
    
    if (this.imgId) {
        this.$router.push('/');
    }
    

    this.imageURL = '';
    this.imgId = '';
    this.authorId = '';
    this.authorUsername = '';
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
            },
            toggleRoundImage() {
                this.isRounded = !this.isRounded;
                localStorage.setItem("isRounded", this.isRounded.toString());

            },
            redirectToAuthorMyScape() {

                window.location.href = '/myscape/' + this.modalContent.authorId;

            }

        }
    };
</script>
<style scoped>
.image-group {
    position: relative;
    display: inline-block;
}

.title-container {
    display: flex;
    align-items: center;
    margin-top: 30px;
    width: 100%;

}

.share-container {
    align-items: center;
    margin-left: auto;
}

.share {
    margin-left: auto;

}

.share:hover {
    cursor: pointer;
}

.overlay-button {
    background-color: rgba(0, 0, 0, 0.281);
    color: white;
    border: none;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    width: 36px;
    height: 36px;
    vertical-align: middle;

}

.title-ctn-item {
    flex: auto;
    margin: 0 !important;
}


.overlay-button-group {
    display: flex;
    position: absolute;
    transform: translateX(-50%);
    left: 50%;
    bottom: calc(50% - 26px);
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    gap: 10px;

}

.image-group img:hover+.overlay-button-group {
    opacity: 1;
}


.noselect {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.overlay-button-group:hover {
    opacity: 1;
}

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

.image-modal-img-wrapper.magnified {
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

.rounded img {

    border-radius: 50%;
    transition: border-radius 0.3s ease;
}

.image-modal-img-wrapper img {
    transition: border-radius 0.3s ease;
}


.image-modal-img-wrapper.magnified img {
    max-height: 80vh;
    max-width: 80%;
    min-width: 20%;
    display: block;
    margin: auto;
}

.img-author {
    cursor: pointer;

}

.img-author:hover {
    text-decoration: underline;

}

.modal-image-pfp {
    width: 150px;
    height: 150px;
    margin: 15px;
    border-radius: 20px;
    margin-bottom: 0px;
    background-color: #101213;
    box-shadow: 10px 10px #15181a;
}


.centered {
    text-align: center;
}

.modal-image-wallpaper {
    width: calc(100% - 40px);
    max-height: 230px;
    object-fit: contain;
    margin-left: 15px;
    border-radius: 5px;
    margin-right: 15px;
    margin-top: 40px;
    margin-bottom: 5px;
    height: auto;
    box-shadow: 0 5px 9px rgba(0, 0, 0, 0.4);
    width: auto;
    max-width: calc(100% - 30px);


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
    position: relative;
    background-color: #23272a;
    margin: 5% auto;
    padding: 20px;
    border-radius: 20px;
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

.close-div {
    width: 100%;
    display: flex;
    justify-content: flex-end;
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
    position: absolute;
    top: 20px;
    right: 20px;
    color: #757575;
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    z-index: 10;
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



#snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #333;
    color: #fff;
    text-align: center;
    border-radius: 2px;
    padding: 16px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
}

#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}

@keyframes fadein {
    from {
        bottom: 0;
        opacity: 0;
    }

    to {
        bottom: 30px;
        opacity: 1;
    }
}

@-webkit-keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}

@keyframes fadeout {
    from {
        bottom: 30px;
        opacity: 1;
    }

    to {
        bottom: 0;
        opacity: 0;
    }
}
</style>