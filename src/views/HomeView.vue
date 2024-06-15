<template>
    <MainHeroPfp/>
    <ListPfpGrid/>
    <ListWallpaperGrid/>
</template>
  
  <script>
  import MainHeroPfp from '@/components/decorations/MainHeroPfp.vue';
  import ListPfpGrid from '@/components/widgets/galleries/ListPfpGrid.vue';
  import ListWallpaperGrid from '@/components/widgets/galleries/ListWallpaperGrid.vue';
  
  
  
  export default {
    components: {
        MainHeroPfp,
        ListPfpGrid,
        ListWallpaperGrid
    },

};
  </script>