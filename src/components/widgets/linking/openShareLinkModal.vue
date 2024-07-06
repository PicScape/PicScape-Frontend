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
        modalContent: {},
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
          const modalupload = await axiosService.getImageDetails(this.modalId);
          if (!modalupload) {
            console.log("image not found")
            return;
          }
          const newModalContent = modalupload.upload;
          let authorInfo = null;
          try {
            authorInfo = await axiosService.getUser('userId', newModalContent.authorId);
          } catch (error) {
            console.error("Error fetching author with id:", newModalContent.authorId);
          }
  
          this.modalContent = {
            id: newModalContent.id,
            title: newModalContent.title,
            description: newModalContent.description,
            type: newModalContent.type,
            tags: newModalContent.tags,
            imgId: imgId,
            authorId: newModalContent.authorId || null,
            username: authorInfo?.user?.username || null,
            uploadedDate: newModalContent.uploadedDate,
          };
        } catch (error) {
          console.error("Error fetching image details:", error);
          this.$router.push('/');
        }
      },
    },
  };
  </script>
  