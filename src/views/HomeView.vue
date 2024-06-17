<template>
    <MainHeroPfp/>

    <ListPfpSlide/>
</template>
  
  <script>
  import MainHeroPfp from '@/components/decorations/MainHeroPfp.vue';
  import ListPfpSlide from '@/components/widgets/galleries/ListPfpSlide.vue';
  
  
  
  export default {
    components: {
        MainHeroPfp,
        ListPfpSlide
    },

};
  </script>