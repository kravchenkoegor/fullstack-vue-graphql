<template>
  <v-container v-if="getPost" my-5 flexbox center>
    <v-layout row wrap>
      <v-flex xs12 >
        <v-card class="card">
          <v-card-title class="card__title">
            <h1>{{getPost.title}}</h1>

            <template v-if="user">
              <v-btn
                large
                icon
                @click="toggleLike"
              >
                <v-icon :color="checkIfPostLiked(getPost._id) ? 'error' : 'grey'">
                  fas fa-heart
                </v-icon>
              </v-btn>
            </template>

            <template v-else>
              <v-icon color="grey" class="ml-3 mr-2">
                fas fa-heart
              </v-icon>
            </template>

            <h3 class="font-weight-light text-uppercase">
              {{getPost.likes}} {{getPost.likes !== 1 ? 'likes' : 'like'}}
            </h3>

            <v-spacer></v-spacer>

            <v-btn large icon>
              <v-icon
                color="primary"
                @click="$router.push('/posts')"
              >fas fa-chevron-circle-left</v-icon>
            </v-btn>
          </v-card-title>

          <v-tooltip top>
            <span>Click to enlarge image</span>
            <v-responsive slot="activator" @click="showDialog">
              <img :src="getPost.imageUrl" alt="">
            </v-responsive>
          </v-tooltip>

          <v-dialog
            class="modal"
            v-model="dialog"
            fullscreen
            hide-overlay
          >
            <v-btn
              class="modal__close"
              icon
              @click="closeDialog"
            >
              <v-icon color="#fff">fas fa-times</v-icon>
            </v-btn>
            <img :src="getPost.imageUrl" alt="" class="modal__image">
          </v-dialog>

          <v-card-text>
            <span
              v-for="(category, index) in getPost.categories"
              :key="index"
            >
              <v-chip
                class="mb-3"
                :class="{'ml-0' : index === 0}"
                color="accent"
                text-color="white"
              >
                {{category}}
              </v-chip>
            </span>
            <h3 class="font-weight-light mb-0 mt-3 card__subtitle">{{getPost.description}}</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="user" class="mt-3" row wrap>
      <v-flex xs12>
        <v-form @submit.prevent>
          <v-layout row>
            <v-text-field
              v-model="messageBody"
              label="Add a comment"
              clearable
              clear-icon="fas fa-times"
              prepend-icon="fas fa-comment"
              :append-outer-icon="messageBody && 'fas fa-paper-plane'"
              @click:append-outer="addPostMessage"
              type="text"
            ></v-text-field>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="font-weight-bold my-3">Comments</h2>
        <v-list subheader two-line>
          <v-subheader>{{getPost.messages.length}} comments</v-subheader>

          <template v-for="message in getPost.messages">
            <v-divider :key="message._id"></v-divider>

            <v-list-tile
              avatar
              inset
              :key="message.title"
            >
              <v-list-tile-avatar>
                <img :src="message.messageUser.avatar" alt="">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{message.messageBody}}
                </v-list-tile-title>
                <v-list-tile-sub-title>
                  {{message.messageUser.username}}
                  <span class="text--grey lighten-1 hidden-xs-only">{{message.messageDate}}</span>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action class="hidden-xs-only">
                <v-icon :color="checkIfOwnMessage(message) ? 'primary' : 'grey'">fas fa-comment-dots</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {
    GET_POST,
    ADD_POST_MESSAGE,
    LIKE_POST,
    UNLIKE_POST
  } from '../../queries';

  export default {
    name: 'Post',
    props: ['postId'],
    data: () => ({
      dialog: false,
      messageBody: '',
      postLiked: false
    }),
    apollo: {
      getPost: {
        query: GET_POST,
        variables() {
          return {
            postId: this.postId
          }
        }
      }
    },
    computed: {
      ...mapGetters(['user', 'userFavorites'])
    },
    methods: {
      showDialog() {
        if (window.innerWidth > 600) {
          this.dialog = !this.dialog;
          this.$disableHTMLScroll();
        }
      },
      closeDialog() {
        this.dialog = !this.dialog;
        this.$enableHTMLScroll();
      },
      addPostMessage() {
        this.$apollo.mutate({
          mutation: ADD_POST_MESSAGE,
          variables: {
            messageBody: this.messageBody,
            userId: this.user._id,
            postId: this.postId
          },
          update: (cache, {data: {addPostMessage}}) => {
            // take the initial state
            const data = cache.readQuery({
              query: GET_POST,
              variables: {postId: this.postId}
            });
            // add new message to post
            data.getPost.messages.unshift(addPostMessage);
            // update post with new data
            cache.writeQuery({
              query: GET_POST,
              variables: {postId: this.postId},
              data
            });
          }
        })
          .then(() => this.messageBody = '')
          .catch((error) => console.error(error))
      },
      likePost() {
        this.$apollo.mutate({
          mutation: LIKE_POST,
          variables: {
            postId: this.postId,
            username: this.user.username
          },
          update: (cache) => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: {postId: this.postId}
            });
            data.getPost.likes++;
            cache.writeQuery({
              query: GET_POST,
              variables: {postId: this.postId},
              data
            });
          }
        })
          .then(({data}) => {
            const updatedUser = { ...this.user, favorites: data.likePost.favorites };
            this.$store.commit('setUser', updatedUser);
          })
          .catch(error => console.error(error))
      },
      unlikePost() {
        this.$apollo.mutate({
          mutation: UNLIKE_POST,
          variables: {
            postId: this.postId,
            username: this.user.username
          },
          update: (cache) => {
            const data = cache.readQuery({
              query: GET_POST,
              variables: {postId: this.postId}
            });
            data.getPost.likes--;
            cache.writeQuery({
              query: GET_POST,
              variables: {postId: this.postId},
              data
            });
          }
        })
          .then(({data}) => {
            const updatedUser = { ...this.user, favorites: data.unlikePost.favorites };
            this.$store.commit('setUser', updatedUser);
          })
          .catch(error => console.error(error))
      },
      toggleLike() {
        if (this.postLiked) {
          this.unlikePost()
        } else {
          this.likePost()
        }
      },
      checkIfOwnMessage(message) {
        return this.user && this.user._id === message.messageUser._id;
      },
      checkIfPostLiked(postId) {
        if (this.userFavorites && this.userFavorites.some(fave => fave._id === postId)) {
          this.postLiked = true;
          return true
        } else {
          this.postLiked = false;
          return false
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  /deep/ .v-responsive__content {
    text-align: center;

    img {
      border-radius: .5rem;
      max-height: 480px;
    }
  }

  /deep/ .v-tooltip {
    cursor: pointer;
  }

  .modal {
    &__image {
      height: 100%;
      max-height: none;
    }

    &__close {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  /deep/ .v-dialog {
    background: rgba(#000, .85);
    overflow: hidden;
    padding: 1rem;
    text-align: center;
  }

  .card {
    &__subtitle {
      position: relative;

      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: -16px;
        height: 1px;
        background-color: lighten(#9e9e9e, 20%);
      }
    }
  }
</style>
