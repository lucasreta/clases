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
          <th class="actions">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <Link v-for="link in favoritos" :key="link.id" :link="link" />
      </tbody>
    </table>
    <form @submit.prevent="guardarLink">
      <table>
        <tbody>
          <tr class="add-link">
            <td><input type="text" v-model="newLink.name" /></td>
            <td><input type="url" v-model="newLink.url" /></td>
            <td class="actions"><input type="submit" class="primary" value="Guardar" /></td>
          </tr>
        </tbody>
      </table>
    </form>
  </section>
</template>

<script>
import Link from '@/components/Link.vue';

export default {
  name: 'Favoritos',
  components: {
    Link,
  },
  data: () => ({
    newLink: {
      name: '',
      url: '',
    },
  }),
  computed: {
    favoritos() {
      return this.$store.state.favoritos.lista;
    },
  },
  created() {
    this.$store.dispatch('favoritos/porUsuario', this.$store.state.autenticacion.user.id);
  },
  methods: {
    guardarLink() {
      if (this.newLink.name && this.newLink.url) {
        this.$store.dispatch('favoritos/crear', { name: this.newLink.name, url: this.newLink.url })
          .then(() => {
            this.newLink = {
              name: '',
              url: '',
            };
          });
      }
    },
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
  tr {
    &.link,
    &.add-link {
      td {
        border-top: 1px solid #eee;
        padding: 15px 5px;
        max-width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      input {
        width: calc(100% - 16px);
        padding: 8px;
        border: 1px solid $dark;
        border-radius: 6px;
      }
      button, input[type=submit] {
        width: 120px;
        padding: 8px;
        border-radius: 6px;
        text-transform: uppercase;
        font-weight: bold;
        cursor: pointer;
        border: none;
        &.primary {
          background-color: $dark;
          color: $primary;
        }
        &.danger {
          background-color: $danger;
        }
      }
    }
  }
  .actions {
    width: 120px;
  }
}
</style>
