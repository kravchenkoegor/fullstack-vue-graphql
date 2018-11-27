<template>
  <v-alert
    class="mb-4 elevation-4"
    type="error"
    :value="true"
    dismissible
    transition="scale-transition"
  >
    <h3>{{message}}</h3>
  </v-alert>
</template>

<script>
  export default {
    name: 'FormAlert',
    props: ['message']
  }
</script>

<style scoped>

</style>
