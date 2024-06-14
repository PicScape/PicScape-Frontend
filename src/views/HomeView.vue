<template>
    <MainHeroPfp/>
    <ListUploads/>
</template>
  
  <script>
  import MainHeroPfp from '@/components/decorations/MainHeroPfp.vue';
  import ListUploads from '@/components/widgets/ListUploads.vue';
  
  export default {
    components: {
        MainHeroPfp,
        ListUploads
    }
  };
  
  </script>