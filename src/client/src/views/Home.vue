<template></template>

<script>
  export default {
    name: 'home',
    loading: true,
    created() {
      this.$router.push('/posts')
    }
  }
</script>
