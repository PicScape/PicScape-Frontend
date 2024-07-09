<template>
    <div>
      <div class="content">
        <div class="content__container">
          <p class="content__container__text">
            Search for
          </p>

          <div class="content__container__list ">
            <li class="content__container__list__item text-animation" v-for="(item, index) in items" :key="index">
              {{ item }}
            </li>
        </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TextAnimation',
  
    data() {
      return {
        items: ['Cute Profile Pictures', 'Minecraft Wallpapers', 'Anime Profile Pictures', 'Gaming Wallpapers', 'Paris Wallpaper', 'Cat Profile Pictures', 'LoFi Wallpapers', 'GTA Profile Pictures', 'Fortnite Profile Pictures', 'Linux Wallpaper']
      };
    },
  

  };
  </script>
  
  <style scoped>



@media screen and (max-width: 630px) {
  .content__container__list {
    opacity: 0;
  
  }
  .content__container__text{
    opacity: 0;
  }

}



.text-animation {
  background: linear-gradient(87deg, #80608b, #d07ca2, #9f3c6a, #f6a2b1, #f5688b, #d884e7);
  background-size: 1200% 1200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 600;

  -webkit-animation: TextAnimation 70s ease infinite;
  -moz-animation: TextAnimation 70s ease infinite;
  animation: TextAnimation 70s ease infinite;
}

@-webkit-keyframes TextAnimation {
  0% { background-position: 0% 99%; }
  50% { background-position: 100% 2%; }
  100% { background-position: 0% 99%; }
}

@-moz-keyframes TextAnimation {
  0% { background-position: 0% 99%; }
  50% { background-position: 100% 2%; }
  100% { background-position: 0% 99%; }
}

@keyframes TextAnimation {
  0% { background-position: 0% 99%; }
  50% { background-position: 100% 2%; }
  100% { background-position: 0% 99%; }
}

  
  .content {


    overflow: hidden;
    font-family: "Lato", sans-serif;
    font-size: 35px;
    line-height: 40px;
    color: #ecf0f1;
  }
  .content__container {
    font-weight: 600;
    overflow: hidden;
    height: 40px;
  }
  
  .content__container:after, .content__container:before {

    color: #16a085;
    font-size: 42px;
    line-height: 40px;
    animation-name: opacity;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }
  .content__container__text {
    display: inline;
    float: left;
    margin: 0;
  }
  .content__container__list {
    margin-top: 0;
    padding-left: 183px;
    text-align: left;
    list-style: none;
    animation-name: change;
    animation-duration: 22s;
    animation-iteration-count: infinite;
  }
  .content__container__list__item {
    line-height: 40px;
    margin: 0;
  }
  
  @keyframes opacity {
    0%, 100% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
  }

  @keyframes change {
  0% {
    transform: translate3d(0, 0, 0);
  }
  5% {
    transform: translate3d(0, -10%, 0);
  }
  10% {
    transform: translate3d(0, -10%, 0);
  }
  15% {
    transform: translate3d(0, -20%, 0);
  }
  20% {
    transform: translate3d(0, -20%, 0);
  }
  25% {
    transform: translate3d(0, -30%, 0);
  }
  30% {
    transform: translate3d(0, -30%, 0);
  }
  35% {
    transform: translate3d(0, -40%, 0);
  }
  40% {
    transform: translate3d(0, -40%, 0);
  }
  45% {
    transform: translate3d(0, -50%, 0);
  }
  50% {
    transform: translate3d(0, -50%, 0);
  }
  55% {
    transform: translate3d(0, -60%, 0);
  }
  60% {
    transform: translate3d(0, -60%, 0);
  }
  65% {
    transform: translate3d(0, -70%, 0);
  }
  70% {
    transform: translate3d(0, -70%, 0);
  }
  75% {
    transform: translate3d(0, -80%, 0);
  }
  80% {
    transform: translate3d(0, -80%, 0);
  }
  85% {
    transform: translate3d(0, -90%, 0);
  }
  90% {
    transform: translate3d(0, -90%, 0);
  }
  100% {
    transform: translate3d(0, 0%, 0);
  }

}
  </style>
  