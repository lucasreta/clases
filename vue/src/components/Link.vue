<template>
  <tr class="link">
    <td>{{ link.name }}</td>
    <td><a :href="link.url" target="_blank">{{ link.url }}</a></td>
    <td><button class="danger" v-on:click="deleteLink" :disabled="processing">{{ $t('bookmarks.link.delete') }}</button></td>
  </tr>
</template>

<script>
export default {
  name: 'Link',
  props: {
    link: Object,
  },
  data: () => ({
    processing: false,
  }),
  methods: {
    deleteLink() {
      this.processing = true;
      this.$store.dispatch('bookmarks/delete', this.$props.link._id)
        .then(() => this.processing = false);
    },
  },
};
</script>
