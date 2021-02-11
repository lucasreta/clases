<template>
  <tr>
    <td>{{ link.name }}</td>
    <td>{{ link.url }}</td>
    <td>Borrar</td>
  </tr>
</template>

<script>
export default {
  name: 'Link',
  props: {
    link: Object,
  },
};
</script>
