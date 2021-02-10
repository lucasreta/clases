<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <span v-if="!loggedIn">
        <router-link to="/ingresar">Ingresar</router-link> |
        <router-link to="/registrarse">Registrarse</router-link>
      </span>
      <span v-if="loggedIn"><a href="#" v-on:click="logout">Cerrar sesión</a></span>
    </div>
    <router-view/>
  </div>
</template>

<script>
import { userService } from './services';

export default {
  name: 'App',
  data: () => ({
    loggedIn: false,
  }),
  computed() {
    this.loggedIn = localStorage.getItem('user');
  },
  methods: {
    logout() {
      userService.logout();
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
@import "./scss/_variables.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $dark;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $dark;

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
