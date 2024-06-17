<template>
    <MainHeroPfp/>
<ListWallpaperGrid/>
    <ListPfpSlide/>
    <ListWallpaperSlide/>
</template>
  
  <script>
  import MainHeroPfp from '@/components/decorations/MainHeroPfp.vue';
  import ListPfpSlide from '@/components/widgets/galleries/ListPfpSlide.vue';
  import ListWallpaperGrid from '@/components/widgets/galleries/ListWallpaperGrid.vue';
  import ListWallpaperSlide from '@/components/widgets/galleries/ListWallpaperSlide.vue';
  
  
  
  export default {
    components: {
        MainHeroPfp,
        ListPfpSlide,
        ListWallpaperSlide,
        ListWallpaperGrid
    },

};
  </script>