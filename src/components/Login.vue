<template>
  <div class="login">
    <div v-if="isLoading" class="loading">
      <div class="loader"></div>
    </div>

    <form v-else @submit="handleSubmit" novalidate>
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
// Vue
import { Options, Vue } from 'vue-class-component';

// Interfaces
import { AuthService } from '@/services/AuthService';
import { Subscription } from 'rxjs';


@Options({})
export default class Login extends Vue {
  email = '';
  password = '';

  isLoading = false;
  subsciption!: Subscription;

  $authService!: AuthService;

  mounted () {
    this.subsciption = this.$authService.loadingCounter.subscribe(val => {
      this.isLoading = val > 0;
    })
  }

  unmounted () {
    this.subsciption.unsubscribe();
  }

  handleSubmit (e: Event) {
    e.preventDefault();

    return this.$authService.login(this.email, this.password)
      .then(result => {
        this.$emit('login', result);
        return result;
      })
  }
}
</script>
