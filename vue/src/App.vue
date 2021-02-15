<template>
  <div id="app">
    <Languages />
    <nav>
      <router-link to="/"><img src="/img/logo.png" :class="userLogged ? 'logged-in' : ''" />{{ $t('nav.home') }}</router-link>
      <router-link to="/bookmarks">{{ $t('nav.bookmarks') }}</router-link>
      <router-link to="/login" v-if="!userLogged">{{ $t('nav.login') }}</router-link>
      <router-link to="/signup" v-if="!userLogged">{{ $t('nav.signup') }}</router-link>
      <a v-if="userLogged" href="#" v-on:click="logout">{{ $t('nav.logout') }}</a>
    </nav>
    <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}<span v-on:click="clearAlert" class="close"></span></div>
    <router-view/>
  </div>
</template>

<script>
import Languages from "@/components/Languages"

export default {
  name: 'App',
  components: {
    Languages
  },
  computed: {
    userLogged() {
      return this.$store.state
        && this.$store.state.authentication.status
        && this.$store.state.authentication.status.loggedIn;
    },
    alert () {
      return this.$store.state.alert;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('authentication/logout');
      this.$router.push('/');
    },
    clearAlert() {
      this.$store.dispatch('alert/clear');
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
  max-width: 600px;
  padding: 25px 15px;
  margin: 50px auto;
  background-color: white;
  border-radius: 12px;
  min-height: 400px;
  position: relative;
}

nav {
  @media (min-width: 680px) {
    display: flex;
  }
  padding: 10px 40px;
  border-radius: 12px;
  background-color: $dark;
  > * {
    flex-grow: 1;
    flex-basis: 0;
  }
  a {
    display: block;
    margin: 10px 0;
    @media (min-width: 680px) {
      display: inline;
      margin: auto;
    }
    font-weight: bold;
    color: white;
    text-decoration: none;
    position: relative;
    img {
      width: 80px;
      position: absolute;
      left: -34px;
      top: 8px;
      &.logged-in {
        top: -4px;
      }
      @media (min-width: 680px) {
        left: -38px;
        top: -32px;
        &.logged-in {
          top: -32px;
        }
      }
    }
    &.router-link-exact-active {
      color: $primary;
    }
  }
}

.alert {
  margin: 15px 0;
  padding: 10px;
  border-radius: 12px;
  position: relative;
  &.alert-danger {
    background-color: $danger;
  }
  &.alert-success {
    background-color: $success;
  }
  .close::after {
    content: '\2715';
    position: absolute;
    line-height: 38px;
    height: 38px;
    width: 38px;
    top: 0;
    right: 0;
    cursor: pointer;
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
