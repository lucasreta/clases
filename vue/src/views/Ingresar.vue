<template>
  <section>
    <header>
      <h1>Ingresa a tu cuenta</h1>
    </header>
    <form class="formulario login" ref="form" @submit.prevent='submit'>
      <input name="username" v-model="user.username" type="text" placeholder="Usuario" />
      <input name="password" v-model="user.password" type="password" placeholder="Contraseña" />
      <input type="submit" value="Registrarse">
    </form>
    <footer>
      ¿Nuevo usuario? <router-link to="/registrarse">Registrate</router-link>
    </footer>
  </section>
</template>

<script>
import { userService } from '../services';

export default {
  name: 'Ingresar',
  data: () => ({
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    submit() {
      userService.login(this.user);
    },
  },
};
</script>
