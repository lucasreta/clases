<template>
  <section>
    <header>
      <h1>Crea un usuario</h1>
    </header>
    <form class="formulario registro" ref="form" @submit.prevent='submit'>
      <input name="username" v-model="user.username" type="text" placeholder="Usuario" />
      <input name="password" v-model="user.password" type="password" placeholder="Contraseña" />
      <input type="submit" value="Registrarse">
    </form>
    <footer>
      ¿Ya tenés un usuario? <router-link to="/ingresar">Ingresá</router-link>
    </footer>
  </section>
</template>

<script>
import { userService } from '../services';

export default {
  name: 'Registrarse',
  data: () => ({
    user: {
      username: '',
      password: '',
    },
  }),
  methods: {
    submit() {
      userService.signup(this.user);
    },
  },
};
</script>
