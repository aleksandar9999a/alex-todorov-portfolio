<template>
  <div class="card">
    <div class="card__image">
      <img src="./../assets/profile.jpg" alt="profile">
    </div>

    <div class="card__head">
      <img src="./../assets/expand.png" alt="expand">
    </div>

    <div class="card__content">
      <h1>Alexander Todorov</h1>

      <p>Front-End Developer</p>
    </div>

    <div class="card__footer">
      <div class="social">
        <a href="https://www.instagram.com/sandi9999a/" target="_blank">
          <img src="./../assets/instagram.png" alt="instagram">
        </a>

        <a href="https://github.com/aleksandar9999a" target="_blank">
          <img src="./../assets/github.png" alt="github">
        </a>

        <a href="https://mail.google.com/mail/u/0/?fs=1&to=aleksandar9999a@gmail.com&tf=cm" target="_blank">
          <img src="./../assets/gmail.png" alt="gmail">
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ISocialLink } from '@/interfaces';
import { Options, Vue } from 'vue-class-component';

@Options({})
export default class ProfileCard extends Vue {
  links: ISocialLink[] = [
    {
      id: 'instagram',
      name: 'instagram',
      link: 'https://www.instagram.com/sandi9999a/',
      image: 'instagram.png'
    },
    {
      id: 'github',
      name: 'github',
      link: 'https://github.com/aleksandar9999a',
      image: './../assets/github.png'
    },
    {
      id: 'gmail',
      name: 'gmail',
      link: 'https://mail.google.com/mail/u/0/?fs=1&to=aleksandar9999a@gmail.com&tf=cm',
      image: './../assets/gmail.png'
    }
  ]
}
</script>

<style lang="scss">
.card {
  background: #fff;
  border-radius: 4px;
  padding: 0.8rem 0.6rem 1rem;
  height: auto;
  color: #575757;
  text-align: center;
  min-width: 40vw;
  position: relative;
  box-shadow: 0px 0px 20px -10px rgb(0, 0, 0, 75%);

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
      transition: transform .3s;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  .card__footer {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 1000px) {
    min-width: 55vw;

    p {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 700px) {
    min-width: 80vw;
  }

  @media (max-width: 500px) {
    min-width: 90vw;
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
