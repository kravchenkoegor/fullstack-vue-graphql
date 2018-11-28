<template>
  <v-container grid-list-lg my-5>
    <v-layout v-if="loading">
      <v-flex xs12 text-xs-center>
        <v-progress-circular
            indeterminate
            color="primary"
        ></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout v-else flex row wrap>
      <v-flex
        xs12
        sm6
        lg4
        mb-4
        v-for="post in posts"
        :key="post._id"
      >
        <v-card class="card elevation-4">
          <v-responsive aspect-ratio="16/10" class="card__media">
            <img :src="post.imageUrl" alt="" class="card__img">
          </v-responsive>

          <v-card-title>
            <div>
              <h3 class="headline mb-0">{{post.title}}</h3>
              <div>{{post.description}}</div>
            </div>
          </v-card-title>

          <v-card-actions class="pa-3">
            <v-spacer></v-spacer>
            <v-btn raised color="accent">Explore</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'home',
    loading: true,
    computed: {
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

  .card {
    &__media {
      max-height: 460px;
    }

    &__img {
      height: 100%;
      // max-width: 100%;
    }
  }
</style>
