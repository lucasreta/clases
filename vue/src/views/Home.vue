<template>
  <section>
    <header>
      <h1>¡Bienvenido<span v-if="userLogged">, {{username}}</span>!</h1>
    </header>
    <div>
      <p>Esta es una aplicación simple para guardar los links a tus sitios favoritos.</p>
      <p>
        <router-link to="/registrarse">Creando un usuario</router-link> o 
        <router-link to="/ingresar">ingresando a tu cuenta</router-link>, 
        vas a poder acceder a la sección de <router-link to="/favoritos">favoritos</router-link>,
        desde la cual vas a poder administrar los links que quieras guardar.
      </p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'App',
  computed: {
    userLogged() {
      return this.$store.state
        && this.$store.state.autenticacion.status
        && this.$store.state.autenticacion.status.loggedIn;
    },
    username () {
      return this.$store.state.autenticacion.user.username;
    },
  },
};
</script>
