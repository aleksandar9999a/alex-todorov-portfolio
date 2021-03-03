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
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

// Interfaces
import { ISocialLink } from '@/interfaces';

// Assets
import './../assets/collapse.png';
import './../assets/expand.png';
import './../assets/instagram.png';
import './../assets/github.png';
import './../assets/gmail.png';

@Options({})
export default class ProfileCard extends Vue {
  isExanded = false;

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
.card {
  background: #fff;
  border-radius: 4px;
  padding: 0.8rem 0.6rem 1rem;
  color: #151515;
  text-align: center;
  position: relative;
  box-shadow: 0px 0px 20px -10px rgb(0, 0, 0, 75%);
  transition: width 0.5s, height 0.5s, padding .5s;
  width: 40vw;
  height: 220px;

  .card__inner {
    background: #fff;
    transition: background 0.5s, height 0.5s, width 0.5s, margin 0.5s, padding 0.5s;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &.fullscreen {
    width: 80vw;
    height: 80vh;
    padding: 0;

    .card__inner {
      background: #008080;
      width: 16rem;
      height: 80vh;
      padding: 12rem 0.6rem 1rem;
      overflow-y: auto;
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }

    .card__image {
      top: 4vh;
      left: 3.5vw;
    }

    .card__footer {
      width: 16rem;
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
    width: 10rem;
    height: 10rem;
    position: absolute;
    top: calc(-50% + 1rem);
    left: calc(50% - 5rem);

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
    width: 55vw;

    p {
      font-size: 1.2rem;
    }

    &.fullscreen {
      width: 90vw;

      .card__inner {
        width: 10rem;
        padding-top: 10rem;
      }

      h1 {
        font-size: 1.4rem;
        margin-bottom: 0.6rem;
      }

      p {
        font-size: 0.9rem;
      }

      .card__image {
        left: 2vw;
        top: 1rem;
        width: 8rem;
        height: 8rem;
      }
    }
  }

  @media (max-width: 700px) {
    width: 80vw;

    &.fullscreen {
      .card__image {
        left: 2.4vw;
      }
    }
  }

  @media (max-width: 500px) {
    width: 95vw;

    &.fullscreen {
      width: 98vw;
      .card__image {
        left: 3.5vw;
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
