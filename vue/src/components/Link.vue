<template>
  <tr class="link">
    <td>{{ link.name }}</td>
    <td><a :href="link.url" target="_blank">{{ link.url }}</a></td>
    <td><button class="danger" v-on:click="borrar" :disabled="borrando">Borrar</button></td>
  </tr>
</template>

<script>
export default {
  name: 'Link',
  props: {
    link: Object,
  },
  data: () => ({
    borrando: false,
  }),
  methods: {
    borrar() {
      console.log(this.$props.link._id)
      this.borrando = true;
      this.$store.dispatch('favoritos/borrar', this.$props.link._id)
        .then(() => this.borrando = false);
    },
  },
};
</script>
