<template>
  <section>
    <header>
      <h1>{{ $t('login.title') }}</h1>
    </header>
    <form class="formulario login" @submit.prevent="loginSubmit">
      <input name="username" v-model="user.username" type="text" :placeholder="$t('user-form.username')" />
      <input name="password" v-model="user.password" type="password" :placeholder="$t('user-form.password')" />
      <div id="signin" class="g-signin2" data-onsuccess="onSignIn"></div>
      <input type="submit" :value="$t('login.submit')">
    </form>
    <footer>
      {{ $t('login.footer-text') }} <router-link to="/signup">{{ $t('login.footer-link') }}</router-link>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    user: {
      username: '',
      password: '',
    },
  }),
  created() {
    this.googleInit();
  },
  methods: {
    loginSubmit() {
      const { username, password } = this.user;
      if (username && password) {
        this.$store.dispatch('authentication/login', { username, password });
      }
    },
    googleInit() {
      if (!gapi.auth2) {
        gapi.load('auth2', function() {
          gapi.auth2.init();
        });
      } else {
        gapi.auth2.init();
      }
    }
  },
};
</script>
