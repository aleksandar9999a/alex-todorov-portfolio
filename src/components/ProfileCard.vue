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
        <img src="./../assets/instagram.png" alt="instagram">

        <img src="./../assets/github.png" alt="github">

        <img src="./../assets/gmail.png" alt="gmail">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
// import './../assets/profile.jpg'

@Options({})
export default class ProfileCard extends Vue {
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

  img {
    height: 100%;
    width: auto;
    object-fit: cover;
    margin-right: 1rem;
    cursor: pointer;
    transition: transform .3s;

    &:last-child {
      margin-right: 0;
    }

    &:hover {
      transform: scale(1.1);
    }
  }
}
</style>
