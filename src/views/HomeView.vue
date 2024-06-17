<template>
    <MainHeroPfp/>
    <ListPfpSlide/>
    <ListWallpaperSlide/>
</template>
  
  <script>
  import MainHeroPfp from '@/components/decorations/MainHeroPfp.vue';
  import ListPfpSlide from '@/components/widgets/galleries/ListPfpSlide.vue';
  import ListWallpaperSlide from '@/components/widgets/galleries/ListWallpaperSlide.vue';
  
  
  
  export default {
    components: {
        MainHeroPfp,
        ListPfpSlide,
        ListWallpaperSlide,
    },

};
  </script>