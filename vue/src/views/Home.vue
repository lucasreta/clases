<template>
  <section>
    <header>
      <h1>{{ $t('home.welcome') }}<span v-if="userLogged">, {{username}}</span>!</h1>
    </header>
    <div>
      <p>{{ $t('home.first-paragraph') }}</p>
      <p>{{ $t('home.second-paragraph') }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'App',
  computed: {
    userLogged() {
      return this.$store.state
        && this.$store.state.authentication.status
        && this.$store.state.authentication.status.loggedIn;
    },
    username () {
      return this.$store.state.authentication.user.username;
    },
  },
};
</script>
