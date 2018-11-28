<template>
  <v-container v-if="infiniteScrollPosts" grid-list-lg>
    <v-layout flex row wrap>
      <v-flex xs12 sm6 lg4 mb-2
        v-for="post in infiniteScrollPosts.posts"
        :key="post._id"
      >
        <v-hover>
          <v-card
            class="card"
            slot-scope="{ hover }"
            :class="`elevation-${hover ? 8 : 2}`"
          >
            <v-responsive class="card__media">
              <img :src="post.imageUrl" :alt="post.description" class="card__img">
            </v-responsive>

            <v-card-title class="card__title">
              <h3 class="headline mb-0">{{post.title}}</h3>
            </v-card-title>

            <v-card-actions class="pa-3">
              <v-card-title class="pa-0">
                <span class="grey--text">
                  {{post.likes}} likes
                  <br>
                  {{post.messages.length}} comments
                </span>
              </v-card-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="showPostAuthor = !showPostAuthor">
                <v-icon small>{{`fas fa-chevron-${showPostAuthor ? 'up' : 'down'}`}}</v-icon>
              </v-btn>
            </v-card-actions>

            <v-slide-y-transition>
              <v-card-text v-show="showPostAuthor" class="grey lighten-4">
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="post.createdBy.avatar" alt="">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title class="text--primary">{{post.createdBy.username}}</v-list-tile-title>
                    <v-list-tile-sub-title class="font-weight-thin">Added {{post.createdDate}}</v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-btn icon ripple>
                      <v-icon
                        small
                        color="grey lighten-1"
                      >fas fa-info</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </v-card-text>
            </v-slide-y-transition>
          </v-card>
        </v-hover>

      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 text-xs-center>
        <v-btn
          v-if="showMoreEnabled"
          raised
          color="primary"
          @click="showMorePosts"
        >Show More</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {INFINITE_SCROLL_POSTS} from '../../queries';
  const pageSize = 3;

  export default {
    name: 'Posts',
    data: () => ({
      pageNum: 1,
      showMoreEnabled: true,
      showPostAuthor: false
    }),
    apollo: {
      infiniteScrollPosts: {
        query: INFINITE_SCROLL_POSTS,
        variables: {
          pageNum: 1,
          pageSize
        }
      }
    },
    methods: {
      showMorePosts() {
        this.pageNum += 1;
        this.$apollo.queries.infiniteScrollPosts.fetchMore({
          variables: {
            pageNum: this.pageNum,
            pageSize
          },
          updateQuery(prevResult, {fetchMoreResult}) {
            const newPosts = fetchMoreResult.infiniteScrollPosts.posts;
            const hasMore = fetchMoreResult.infiniteScrollPosts.hasMore;


            return {
              infiniteScrollPosts: {
                __typename: prevResult.infiniteScrollPosts.__typename,
                posts: [
                  ...prevResult.infiniteScrollPosts.posts,
                  ...newPosts
                ],
                hasMore
              }
            }
          }
        })
          .then(({data}) => this.showMoreEnabled = data.infiniteScrollPosts.hasMore)
          .catch(error => console.error(error))
      },
      formatDate(timestamp) {
        console.log(Math.floor(+timestamp / 1000))
        return new Date(Math.floor(+timestamp / 1000))
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    &__media {
      max-height: 460px;
    }

    &__img {
      height: 100%;
      // max-width: 100%;
    }

    &__title {
      position: relative;

      &:after {
        content: '';
        display: block;
        position: absolute;
        left: 16px;
        right: 16px;
        bottom: 0;
        height: 1px;
        background-color: lighten(#9e9e9e, 20%);
      }
    }
  }
</style>
