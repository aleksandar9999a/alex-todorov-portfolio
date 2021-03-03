<template>
  <div class="app">
    <constellation-canvas />

    <div class="app__content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ConstellationCanvas from './components/Constellation/ConstellationCanvas.vue';

@Options({
  components: {
    ConstellationCanvas
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  border: 0;
  outline: 0;
	font-size: 100%;
	font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
  font-family: Raleway, sans-serif;
  font-weight: 400;
}

body {
  line-height: 1;
  color: #fff;
}

.app {
  position: relative;
  background: linear-gradient(to bottom, #8360c3, #2ebf91);

  .app__content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
}
</style>
