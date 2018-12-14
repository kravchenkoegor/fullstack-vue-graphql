<template>
  <v-container grid-list-lg class="py-5">
    <template v-if="infiniteScrollPosts">
      <v-layout flex row wrap>
        <v-flex
          xs12
          sm6
          mb-2
          v-for="post in infiniteScrollPosts.posts"
          :key="post._id"
        >
          <v-hover>
            <v-card
              class="card"
              slot-scope="{ hover }"
              :class="`elevation-${hover ? 8 : 2}`"
            >
              <v-responsive
                class="card__media"
                @click.native="$router.push({path: `/post/${post._id}`})"
                :style="`background: url(${post.imageUrl}) 50% 50% no-repeat;`"
              >
              </v-responsive>

              <v-card-title class="card__title">
                <router-link
                  :to="`/post/${post._id}`"
                  tag="h3"
                  class="headline"
                >
                  {{post.title}}
                </router-link>
              </v-card-title>

              <v-card-actions class="pa-3">
                <v-card-title class="pa-0">
                <span class="grey--text">
                  {{post.likes}} {{post.likes !== 1 ? 'likes' : 'like'}}
                  <br>
                  {{post.messages.length}} {{post.messages.length !== 1 ? 'comments' : 'comment'}}
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
    </template>


    <template v-if="showMoreEnabled">
      <v-layout row>
        <v-flex xs12 text-xs-center>
          <v-btn
              raised
              color="primary"
              @click="showMorePosts"
          >Show More</v-btn>
        </v-flex>
      </v-layout>
    </template>

    <template v-if="infiniteScrollPosts && !infiniteScrollPosts.posts.length">
      <v-layout row>
        <v-flex xs12 text-xs-center>
          <h1>Unfortunately, there are no posts yet 😞</h1>
        </v-flex>
      </v-layout>
    </template>

  </v-container>
</template>

<script>
  import {INFINITE_SCROLL_POSTS} from '../../queries';
  const pageSize = 4;

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
    created() {
      return this.$store.dispatch('getPosts');
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
      }
    }
  }
</script>

<style lang="scss" scoped>
  .card {
    &__media {
      background-size: cover !important;
      cursor: pointer;
      height: 300px;
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

      h3 {
        cursor: pointer;
        // font-weight: 700;
        margin-bottom: 0;
        transition: color .2s ease-in-out;

        &:hover {
          color: #094D92;
          text-decoration: none;
        }
      }
    }
  }
</style>
