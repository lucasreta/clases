<template>
  <section>
    <header>
      <h1>Ingresa a tu cuenta</h1>
    </header>
    <form class="formulario login" @submit.prevent="loginSubmit">
      <input name="username" v-model="user.username" type="text" placeholder="Usuario" />
      <input name="password" v-model="user.password" type="password" placeholder="Contraseña" />
      <input type="submit" value="Ingresar">
    </form>
    <footer>
      ¿Nuevo usuario? <router-link to="/registrarse">Registrate</router-link>
    </footer>
  </section>
</template>

<script>
export default {
  name: 'Ingresar',
  data: () => ({
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    loginSubmit() {
      const { username, password } = this.user;
      if (username && password) {
        this.$store.dispatch('autenticacion/login', { username, password });
      }
    },
  },
};
</script>
