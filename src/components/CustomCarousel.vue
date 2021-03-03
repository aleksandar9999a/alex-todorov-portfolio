<template>
  <div>
    <Carousel :settings="settings" :breakpoints="breakpoints">
      <Slide v-for="slide in entities" :key="slide.id">
        <div class="section-secondary">
          <div class="section__head">
            <h3>{{ slide.title }}</h3>
          </div>

          <div class="section__content">
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
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

// Components
import 'vue3-carousel/dist/carousel.css';
import {
  Carousel,
  Slide,
  Navigation
} from 'vue3-carousel';
import { IEntity } from '@/interfaces';


@Options({
  components: {
    Carousel,
    Slide,
    Navigation
  },
  props: ['entities']
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

  entities: IEntity[] = [];
}
</script>

<style lang="scss">
.section-secondary {
  height: 180px;
  width: 100%;
  background-color: var(--carousel-color-primary);
  color:  var(--carousel-color-white);
  border-radius: 8px;
  padding: 1rem 0.6rem;
  line-height: 1.2;

  time {
    font-size: 0.7rem;
  }

  .section__head h3 {
    font-size: 1.2rem;
  }

  .section__content {
    margin: 0.6rem 0;
    height: 100px;
    overflow-y: auto;
  }

  .section__content p {
    font-size: 0.8rem;
  }

  .section__footer {
    display: flex;
    justify-content: space-between;
  }
}

.carousel__slide {
  padding: 10px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
</style>