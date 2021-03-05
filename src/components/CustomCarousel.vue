<template>
  <div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="slide in entities" :key="slide.id" @click="handleClick(slide)">
        <div class="section-secondary">
          <div v-if="slide.image" class="section__image">
            <img :src="slide.image" :alt="slide.name">
          </div>

          <div class="section__head">
            <h3>{{ slide.title }}</h3>
          </div>

          <div v-if="!slide.image" class="section__content">
            <p>{{ slide.description }}</p>
          </div>

          <div class="section__footer">
            <time>
              <span>Start: </span>

              <span>{{ slide.start }}</span>
            </time>

            <time>
              <span>End: </span>

              <span>{{ slide.end }}</span>
            </time>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>

    <div v-if="isEnabledAdd" class="carousel-add">
      <button @click="handleAdd">
        Add
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Prop } from 'vue-property-decorator'

// Components
import 'vue3-carousel/dist/carousel.css';
import {
  Carousel,
  Slide,
  Navigation
} from 'vue3-carousel';

// Interfaces
import { IEntity } from '@/interfaces';


@Options({
  components: {
    Carousel,
    Slide,
    Navigation
  }
})
export default class ProfileCard extends Vue {
  settings = {
    itemsToShow: 1,
    snapAlign: 'center'
  }

  breakpoints = {
    700: {
      itemsToShow: 2,
      snapAlign: 'center'
    }
  }

  @Prop(Boolean)
  isEnabledAdd = false;

  @Prop(Array)
  entities: IEntity[] = [];

  handleAdd () {
    this.$emit('submit')
  }

  handleClick (entity: IEntity) {
    this.$emit('on-click', entity)
  }
}
</script>
