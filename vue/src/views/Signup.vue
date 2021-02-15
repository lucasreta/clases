<template>
  <section>
    <header>
      <h1>{{ $t('signup.title') }}</h1>
    </header>
    <form class="formulario registro" ref="form" @submit.prevent="submit">
      <input name="username" v-model="user.username" type="text" :placeholder="$t('user-form.username')" />
      <input name="password" v-model="user.password" type="password" :placeholder="$t('user-form.password')" />
      <input type="submit" :value="$t('signup.submit')">
    </form>
    <footer>
      {{ $t('signup.footer-text') }} <router-link to="/ingresar">{{ $t('signup.footer-link') }}</router-link>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'Signup',
  data: () => ({
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    submit() {
      const { username, password } = this.user;
      if (username && password) {
        this.$store.dispatch('authentication/signup', { username, password });
      }
    },
  },
};
</script>
