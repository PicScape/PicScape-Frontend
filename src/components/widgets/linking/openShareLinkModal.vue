<template>
    <div>
      <ImageModal
        :show-modal="modalId !== null"
        :modal-content="modalContent"
        @close="modalId = null"
      />
    </div>
  </template>
  
  <script>
  import ImageModal from '@/components/widgets/modals/UploadModal.vue';
  import axiosService from '@/services/axiosService';
  
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
        imageType: 'pfp',
        userid: '',
        modalContent: null,
      };
    },
  
    mounted() {
      try {
        this.imgId = this.$route.params.imgId;
        if (this.imgId) {
          this.openModal(this.imgId);
        }
      } catch (error) {
        console.log("Error while mounting:", error);
      }
    },
  
    methods: {
      async openModal(imgId) {
        this.modalId = imgId;
        try {
            const modalupload = await axiosService.getImageDetails(this.modalId)
          this.modalContent = modalupload.upload;
        } catch (error) {
          console.error("Error fetching image details:", error);
        }
      },
    },
  };
  </script>
  