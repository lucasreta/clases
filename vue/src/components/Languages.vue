
<template>
  <div class="languages">
    <label><input type="radio" v-model="$i18n.locale" value="es">ES</label>
    <label><input type="radio" v-model="$i18n.locale" value="en">EN</label>
  </div>
</template>

<style lang="scss">
.languages {
  position: absolute;
  right: 0;
  top: -30px;
  padding: 12px;
  border: none;
  background: white;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  outline: none!important;
  font-weight: bold;
  label {
    cursor: pointer;
  }
}
</style>
