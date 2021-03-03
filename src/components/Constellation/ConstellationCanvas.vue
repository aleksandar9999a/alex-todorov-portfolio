<template>
  <div>
    <canvas ref="constellation" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { createConstellation } from './ConstellationAdapter';

@Options({})
export default class ConstellationCanvas extends Vue {
  mounted () {
    const constellation = createConstellation(this.$refs.constellation as HTMLCanvasElement);
    constellation.init();
  }
}
</script>

<style lang="scss" scoped>
canvas {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
