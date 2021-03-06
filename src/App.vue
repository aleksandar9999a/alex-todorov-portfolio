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
