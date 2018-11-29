<template>
  <v-container v-if="getPost" my-5 flexbox center>
    <v-layout row wrap>
      <v-flex xs12 >
        <v-card class="card">
          <v-card-title class="card__title">
            <h1>{{getPost.title}}</h1>
            <v-btn v-if="user" large icon>
              <v-icon color="grey">fas fa-heart</v-icon>
            </v-btn>
            <h3 class="font-weight-light">{{getPost.likes}} LIKES</h3>
            <v-spacer></v-spacer>
            <v-btn large icon>
              <v-icon
                color="primary"
                @click="$router.go(-1)"
              >fas fa-chevron-circle-left</v-icon>
            </v-btn>
          </v-card-title>

          <v-tooltip top>
            <span>Click to enlarge image</span>
            <v-responsive slot="activator" @click="toggleImageDialog">
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
              @click="dialog = !dialog"
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
                color="accent"
                text-color="white"
              >
                {{category}}
              </v-chip>
            </span>
            <h3 class="mb-0">{{getPost.description}}</h3>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout v-if="user" class="my-3" row wrap>
      <v-flex xs12>
        <v-form>
          <v-layout row>
            <v-text-field
              v-model="messageText"
              label="Add a comment"
              clearable
              prepend-icon="fas fa-comment"
              append-outer-icon="fas fa-paper-plane"
              type="text"
            ></v-text-field>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12>
        <h2 class="font-weight-bold mb-3">Comments</h2>
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
                <v-icon color="grey">fas fa-comment-dots</v-icon>
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
  import {GET_POST} from '../../queries';

  export default {
    name: 'Post',
    props: ['postId'],
    data: () => ({
      dialog: false,
      messageText: ''
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
      ...mapGetters(['user'])
    },
    methods: {
      toggleImageDialog() {
        if (window.innerWidth > 600) {
          this.dialog = !this.dialog
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
</style>
