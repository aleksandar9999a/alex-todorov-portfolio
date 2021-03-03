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
