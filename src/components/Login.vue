<template>
  <div class="login">
    <form @submit="handleSubmit" novalidate>
      <div class="login__group">
        <label for="email">
          Email
        </label>

        <input v-model="email" id="email" type="email">
      </div>

      <div class="login__group">
        <label for="password">
          Password
        </label>

        <input v-model="password" id="password" type="password">
      </div>

      <div class="login__foot">
        <button>Log In</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { AuthService } from '@/services/AuthService';
import { Options, Vue } from 'vue-class-component';


@Options({})
export default class Login extends Vue {
  email = '';
  password = '';

  $authService!: AuthService;

  handleSubmit (e: Event) {
    e.preventDefault();

    this.$authService.login(this.email, this.password)
      .then(result => {
        this.$emit('login')
      })
  }
}
</script>
