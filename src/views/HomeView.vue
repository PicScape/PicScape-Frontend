<template>
  <openShareLinkModal />
  <MainHeroPfp />
  <ListPfpSlide />
  <ListWallpaperSlide />
</template>

<script>
import openShareLinkModal from '@/components/widgets/linking/openShareLinkModal.vue'
import MainHeroPfp from '@/components/decorations/MainHeroPfp.vue';
import ListPfpSlide from '@/components/widgets/galleries/ListPfpSlide.vue';
import ListWallpaperSlide from '@/components/widgets/galleries/ListWallpaperSlide.vue';

export default {
  components: {
    openShareLinkModal,
    MainHeroPfp,
    ListPfpSlide,
    ListWallpaperSlide,
  },

};
</script>