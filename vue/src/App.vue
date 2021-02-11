<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/favoritos">Favoritos</router-link>
      <router-link to="/ingresar" v-if="!userLogged">Ingresar</router-link>
      <router-link to="/registrarse" v-if="!userLogged">Registrarse</router-link>
      <a v-if="userLogged" href="#" v-on:click="logout">Cerrar sesión</a>
    </nav>
    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    userLogged() {
      return this.$store.state.autenticacion.status
        && this.$store.state.autenticacion.status.loggedIn;
    },
    alert () {
      return this.$store.state.alert;
    },
  },
  watch:{
    $route (to, from){
      this.$store.dispatch('alert/clear');
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('autenticacion/logout');
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";

html, body {
  background-color: $dark;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark;
  width: 600px;
  max-width: 100%;
  padding: 25px 15px;
  margin: 50px auto;
  background-color: white;
  border-radius: 12px;
  min-height: 400px;
}

nav {
  display: flex;
  padding: 15px;
  border-radius: 12px;
  background-color: $dark;
  > * {
    flex-grow: 1;
    flex-basis: 0;
  }
  a {
    font-weight: bold;
    color: white;
    text-decoration: none;

    &.router-link-exact-active {
      color: $primary;
    }
  }
}

.formulario {
  input {
    margin: 10px 15px;
    padding: 12px;
    border: 1px solid $dark;
    border-radius: 6px;
    &[type=submit] {
      text-transform: uppercase;
      font-weight: bold;
      background-color: $dark;
      color: $primary;
    }
    &:not([type=submit]) {
      width: calc(100% - 54px);
    }
  }
}
</style>
