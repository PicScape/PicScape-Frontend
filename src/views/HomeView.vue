<template>
    <MainHeroPfp/>
    <ListPfpGrid/>
</template>
  
  <script>
  import MainHeroPfp from '@/components/decorations/MainHeroPfp.vue';
  import ListPfpGrid from '@/components/widgets/galleries/ListPfpGrid.vue';
  
  export default {
    components: {
        MainHeroPfp,
        ListPfpGrid
    },

};
  </script>