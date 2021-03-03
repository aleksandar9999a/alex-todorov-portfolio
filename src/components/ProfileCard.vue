<template>
  <div class="card" :class="fullscreenClass">
    <div class="card__inner">
      <div class="card__image">
        <img src="./../assets/profile.jpg" alt="profile">
      </div>

      <div class="card__head">
        <img :src="expandIcon" alt="expand" @click="handleExpand">
      </div>

      <div class="card__content">
        <h1>Alexander Todorov</h1>

        <p>Front-End Developer</p>
      </div>

      <div class="card__footer">
        <div class="social">
          <a v-for="social in links" :key="social.id" :href="social.link" target="_blank">
            <img :src="social.image" :alt="social.name">
          </a>
        </div>
      </div>
    </div>

    <div class="card__section">
      <div class="section-primary">
        <legend>
          Information
        </legend>

        <div class="section__inner">
          {{ aboutme }}
        </div>
      </div>

      <div class="section-primary">
        <legend>
          Experience
        </legend>

        <div class="section__inner">
          <custom-carousel v-if="isFullExpand" :entities="experience" />
        </div>
      </div>

      <div class="section-primary">
        <legend>
          Projects
        </legend>

        <div class="section__inner">
          <custom-carousel v-if="isFullExpand" />
        </div>
      </div>

      <div class="section-primary">
        <legend>
          Certificates
        </legend>

        <div class="section__inner">
          <custom-carousel v-if="isFullExpand" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

// Components
import CustomCarousel from './CustomCarousel.vue';

// Interfaces
import { ISocialLink, IEntity } from '@/interfaces';

// Assets
import './../assets/collapse.png';
import './../assets/expand.png';
import './../assets/instagram.png';
import './../assets/github.png';
import './../assets/gmail.png';

@Options({
  components: {
    CustomCarousel
  }
})
export default class ProfileCard extends Vue {
  isExanded = false;
  isFullExpand = false;

  links: ISocialLink[] = [
    {
      id: 'instagram',
      name: 'instagram',
      link: 'https://www.instagram.com/sandi9999a/',
      image: require('./../assets/instagram.png')
    },
    {
      id: 'github',
      name: 'github',
      link: 'https://github.com/aleksandar9999a',
      image: require('./../assets/github.png')
    },
    {
      id: 'gmail',
      name: 'gmail',
      link: 'https://mail.google.com/mail/u/0/?fs=1&to=aleksandar9999a@gmail.com&tf=cm',
      image: require('./../assets/gmail.png')
    }
  ]

  aboutme = 'Hello, My name is Alexander Velichkov Todorov. I am a native of Ruse, Bulgaria, 22 years old. I have loved computer technology since I was a child and for this reason I am involved in programming. I graduated in computer engineering and technology at PGEE Apostol Arnaudov in Ruse, and now I study programming at SoftUni, Sofia. So far I have one second place and two first places in applied electronics competitions, as well as a few certificates, which you can see below. There will be many more in the future!'

  experience: IEntity[] = [
    { id: '1', title: 'OrderAdmin', description: 'OrderAdmin is company who develop a Cloud Software for Warehouse and Delivery Services Automation.', start: '2020', end: 'now' },
    { id: '2', title: '2CreateStudio', description: '2Create is a software company who have a big portfolio of any interesting projects.', start: '2020', end: '2020' },
    { id: '3', title: 'Time Assistants', description: 'Time Assistant is a Sales Representative of Econt. We made deliveries of postal, courier and cargo shipments.', start: '2018', end: '2020' },
    { id: '4', title: 'Montupet Bulgaria', description: 'Casting of engine heads.', start: '2017', end: '2018' }
  ]

  get fullscreenClass () {
    return this.isExanded
      ? 'fullscreen'
      : ''
  }

  get expandIcon () {
    return this.isExanded
      ? require('./../assets/collapse.png')
      : require('./../assets/expand.png')
  }

  handleExpand (e: Event) {
    this.isExanded = !this.isExanded;

    if (this.isExanded) {
      setTimeout(() => {
        if (this.isExanded) {
          this.isFullExpand = true;
        }
      }, 700)
    } else {
      this.isFullExpand = false;
    }

    this.emitExpandState(this.isExanded)
  }

  emitExpandState (isExanded: boolean) {
    const event = isExanded
      ? 'on-expand'
      : 'on-collapse'

    this.$emit(event)
  }
}
</script>

<style lang="scss">
.section-primary {
  text-align: left;
  padding: 0.4rem;

  legend {
    font-size: 1.4rem;
  }

  .section__inner {
    padding: 0.8rem 0.5rem;
    font-size: 1rem;
  }
}

$card-width: 500px;
$card-width-fullscreen: 800px;
$card-height-fullscreen: 500px;
$card-width-md: 500px;
$card-width-fullscreen-md: 600px;
$card-width-sx: 96vw;
$card-width-fullscreen-sx: 96vw;
$card-height: 220px; 
$card-image-size: 140px;
$card-image-size-sx: 140px;

$card-inner-width: 200px;

.card {
  background: #fff;
  border-radius: 4px;
  padding: 0.8rem 0.6rem 1rem;
  color: #151515;
  text-align: center;
  position: relative;
  box-shadow: 0px 0px 20px -10px rgb(0, 0, 0, 75%);
  transition: width 0.5s, height 0.5s, padding .5s;
  width: $card-width;
  height: $card-height;
  display: flex;

  .card__section {
    display: none;
    padding: 0.8rem 0.6rem 1rem;
    width: calc(100% - #{$card-inner-width});
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .card__inner {
    background: #fff;
    transition: background 0.5s, height 0.5s, width 0.5s, margin 0.5s, padding 0.5s;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &.fullscreen {
    width: $card-width-fullscreen;
    height: $card-height-fullscreen;
    padding: 0;

    .card__section {
      display: block;
    }

    .card__inner {
      background: #008080;
      width: $card-inner-width;
      height: $card-height-fullscreen;
      padding: calc(#{$card-image-size} + 30px) 0.6rem 1rem;
      overflow-y: auto;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .card__image {
      top: 20px;
      left: calc((#{$card-inner-width} - #{$card-image-size}) / 2);
    }

    .card__footer {
      width: $card-inner-width;
    }

    .card__head {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      margin: 0.8rem 0.6rem 1rem;
    }
  }

  h1 {
    font-size: 1.8rem;
    margin-bottom: 0.4rem;
  }

  p {
    margin-bottom: 1.4rem;
    font-size: 1rem;
  }

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
  }

  .card__image {
    transition: top .5s, left .5s, width .5s, height .5s;
    width: $card-image-size;
    height: $card-image-size;
    position: absolute;
    top: calc(-50% + 40px);
    left: calc((#{$card-width} / 2) - (#{$card-image-size} / 2));

    img {
      border-radius: 50%;
      box-shadow: 0px 0px 20px -10px rgb(0, 0, 0, 75%);
    }
  }

  .card__head {
    height: 1.0rem;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3.6rem;

    img {
      cursor: pointer;
    }
  }

  .card__footer {
    transition: height 0.5s, width 0.5s, border-color .5s;
    display: flex;
    justify-content: center;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid #40ff00;
    animation: 4s linear infinite colors;
  }

  @keyframes colors {
    0% {
      border-color: #40ff00;
    }
    
    50% {
      border-color: #0000ff;
    }

    75% {
      border-color: #800080;
    }
  }

  @media (max-width: 1000px) {
    width: $card-width-md;

    &.fullscreen {
      width: $card-width-fullscreen-md;
    }

    p {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 700px) {
    width: $card-width-sx;

    .card__image {
      width: $card-image-size-sx;
      height: $card-image-size-sx;
      top: calc(-50% + 40px);
      left: calc((#{$card-width-sx} / 2) - (#{$card-image-size-sx} / 2));
    }

    &.fullscreen {
      width: $card-width-fullscreen-sx;
      
      .card__inner {
        padding: calc(#{$card-image-size-sx} + 30px) 0.6rem 1rem;
      }
            
      .card__image {
        left: calc((#{$card-inner-width} - #{$card-image-size-sx}) / 2);
      }
    }
  }
}

.social {
  height: 2rem;

  a {
    margin-right: 1rem;

    &:last-child {
      margin-right: 0;
    }
  }

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
    cursor: pointer;
    transition: transform .3s;

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
