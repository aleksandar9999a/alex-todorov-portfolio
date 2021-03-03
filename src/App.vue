<template>
  <div class="app">
    <constellation-canvas />

    <div class="app__inner">
      <div class="app__content" :class="expandClass">
        <profile-card @on-expand="handleExpand" @on-collapse="handleCollapse" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import ConstellationCanvas from './components/Constellation/ConstellationCanvas.vue';
import ProfileCard from './components/ProfileCard.vue';

@Options({
  components: {
    ConstellationCanvas,
    ProfileCard
  }
})
export default class App extends Vue {
  isExpanded = false;

  get expandClass () {
    return this.isExpanded
      ? 'expand'
      : ''
  }

  handleExpand () {
    this.isExpanded = true
  }

  handleCollapse () {
    this.isExpanded = false
  }
}
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
  font-family: Chivo, sans-serif;
  font-weight: 400;
}

*::-webkit-scrollbar {
  width: 5px;
}

*::-webkit-scrollbar-track {
  border-radius: 10px;
}

*::-webkit-scrollbar-thumb {
  border-radius: 2rem;
  background-color: #333333;
}

body {
  line-height: 1;
  background: linear-gradient(to bottom, #8360c3, #2ebf91);
  color: #fff;
}

canvas {
  background: linear-gradient(to bottom, #8360c3, #2ebf91);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}

.app {
  position: relative;

  .app__inner {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;

    .app__content {
      padding-top: 30vh;
      transition: padding 0.5s;

      &.expand {
        padding-top: 10vh;
      }
    }
  }
}
</style>
