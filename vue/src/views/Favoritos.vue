<template>
  <section>
    <header>
      <h1>Favoritos</h1>
      <p>Administra tus links.</p>
    </header>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>URL</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <Link v-for="link in favoritos" :key="link.id" link="link" />
      </tbody>
    </table>
  </section>
</template>

<script>
import Link from '@/components/Link.vue';

export default {
  name: 'Favoritos',
  components: {
    Link,
  },
  computed: {
    favoritos() {
      return this.$store.state.favoritos.lista;
    },
  },
  created() {
    this.$store.dispatch('favoritos/porUsuario', this.$store.state.autenticacion.user.id);
  },
};
</script>

<style lang="scss">
@import "@/scss/_variables.scss";

table {
  width: 100%;
  th {
    color: $dark;
  }
}
</style>
