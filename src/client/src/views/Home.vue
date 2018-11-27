<template>
  <v-container>
    <v-layout v-if="loading">
      <v-flex xs12 text-xs-center>
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>


    <v-layout v-else flex row wrap>
      <v-flex xs12 my-4>
        <v-carousel
            v-if="!loading && posts.length"
            class="carousel"
            height="550"
            hide-delimiters
        >
          <v-carousel-item
              v-for="post in posts"
              :key="post._id"
              :src="post.imageUrl"
          >
            <h1 class="carousel__title">{{ post.title }}</h1>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'home',
    components: {},
    loading: true,
    computed: {
      // posts() {
      //   return this.$store.getters.getStatePosts
      // },
      // loading() {
      //   return this.$store.getters.getLoading
      // }
      ...mapGetters(['posts', 'loading'])
    },
    created() {
      return this.$store.dispatch('getPosts')
    }
  }
</script>

<style lang="scss" scoped>
  .carousel {
    position: relative;

    &__title {
      background-color: rgba(0,0,0,.5);
      color: #ffffff;
      bottom: 0;
      height: 50px;
      line-height: 50px;
      left: 0;
      position: absolute;
      right: 0;
      text-align: center;
    }
  }
</style>
