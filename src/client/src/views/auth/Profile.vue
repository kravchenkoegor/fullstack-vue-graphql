<template>
  <v-container text-xs-center py-5 my-5>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card class="user elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Info about you</v-toolbar-title>
          </v-toolbar>

          <v-layout>
            <v-flex d-flex align-center xs5>
              <v-responsive>
                <img :src="user.avatar" alt="" class="user__avatar">
              </v-responsive>
            </v-flex>

            <v-flex xs7>
              <v-card-title>
                <div>
                  <h3 class="headline mb-3">{{user.username}}</h3>
                  <p class="user__text">Joined {{user.joinDate}}</p>
                  <p class="user__text">{{user.favorites.length}} favorites</p>
                  <p class="user__text">{{userPosts.length}} posts added</p>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>

    <template v-if="!userFavorites.length">
      <v-layout row wrap mt-4 pt-4>
        <v-flex xs12>
          <h2 class="font-weight-light">You have no favorites currently. <router-link to="/posts">Go here</router-link> and add some 😉</h2>
        </v-flex>
      </v-layout>
    </template>

    <template v-else>
      <v-container grid-list-lg mt-4 pt-4 px-0 pb-0>
        <v-layout row wrap>
          <v-flex xs12 mb-2>
            <h2 class="font-weight-light">You have {{userFavorites.length}} favorite posts</h2>
          </v-flex>

          <v-flex xs12 sm6 lg4 mb-2
            v-for="post in userFavorites"
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
                >
                  <img :src="post.imageUrl" alt="" class="card__img">
                </v-responsive>

                <v-card-title class="card__title">
                  <router-link
                      :to="`/post/${post._id}`"
                      tag="h3"
                      class="headline"
                  >
                    {{post.title}}
                  </router-link>
                  <v-spacer></v-spacer>
                  <v-icon color="error">
                    fas fa-heart
                  </v-icon>
                </v-card-title>
              </v-card>
            </v-hover>
          </v-flex>
        </v-layout>
      </v-container>
    </template>

    <template v-if="!userPosts.length">
      <v-layout row wrap mt-4 pt-4>
        <v-flex xs12>
          <h2 class="font-weight-light">You have no added posts currently. <router-link to="/post/add">Go here</router-link> and add some 😉</h2>
        </v-flex>
      </v-layout>
    </template>

    <template v-else>
      <v-container grid-list-lg mt-4 pt-4 px-0 pb-0>
        <v-layout row wrap>
          <v-flex xs12 mb-2>
            <h2 class="font-weight-light">You have added {{userPosts.length}} posts</h2>
          </v-flex>

          <v-flex xs12>
            <v-list two-line>
              <v-list-tile
                v-for="(item, index) in userPosts"
                :key="item._id"
                avatar
                @click="$router.push(`/post/${item._id}`)"
                :class="{'border-bottom': index !== userPosts.length - 1}"
              >
                <v-list-tile-avatar>
                  <img :src="item.imageUrl" alt="">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                  <v-list-tile-sub-title>{{ item.description }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn flat @click.stop="loadPostDetails(item)">
                    <v-icon small left color="primary">fas fa-edit</v-icon>
                    Edit
                  </v-btn>

                  <v-btn flat class="ml-3" @click.stop="loadPostDetails(item, false)">
                    <v-icon small left color="error">fas fa-trash</v-icon>
                    Delete
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-container>
    </template>

    <v-dialog
      v-model="editPostDialog"
      max-width="720"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Update post</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-form
            v-model="isFormValid"
            lazy-validation
            ref="form"
            @submit.prevent="onSubmit"
          >
            <v-text-field
              v-model="title"
              name="title"
              label="Title"
              type="text"
              autocomplete="new-password"
              :rules="[() => !!title || 'Title is required']"
            ></v-text-field>

            <v-text-field
              v-model="imageUrl"
              name="imageUrl"
              label="Image URL"
              type="text"
              autocomplete="new-password"
              :rules="[() => !!imageUrl || 'Image URL is required']"
            ></v-text-field>

            <v-layout row v-if="imageUrl">
              <v-flex xs12 text-xs-center>
                <img :src="imageUrl" alt="" height="300px">
              </v-flex>
            </v-layout>

            <v-select
              v-model="selectedCategories"
              :items="categories"
              label="Categories"
              multiple
              :rules="[() => selectedCategories.length >= 1 || 'At least one category is required']"
            >
            </v-select>

            <v-textarea
              v-model="description"
              name="description"
              label="Description"
              rows="1"
              auto-grow
            ></v-textarea>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            flat
            @click="editPostDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            :loading="loading"
            color="success"
            @click="onSubmit"
            :disabled="!isFormValid || loading"
          >
            Update
            <span slot="loader" class="custom-loader">
              <v-icon dark small>fas fa-sync-alt</v-icon>
            </span>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="deletePostDialog"
      max-width="720"
      persistent
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-toolbar-title>Delete post</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <h3 class="font-weight-regular">Are you sure you want to delete this post?</h3>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="error"
            flat
            @click="deletePostDialog = false"
          >
            Cancel
          </v-btn>

          <v-btn
            color="success"
            @click="deletePost"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Profile',
    data: () => ({
      showPostAuthor: false,
      editPostDialog: false,
      deletePostDialog: false,
      postId: '',
      title: '',
      imageUrl: '',
      description: '',
      categories: [
        'Art',
        'Photo',
        'Travel',
        'Food',
        'Technology',
        'Cars',
        'Girls'
      ],
      selectedCategories: [],
      isFormValid: true,
    }),
    computed: {
      ...mapGetters(['user', 'userFavorites', 'userPosts', 'loading'])
    },
    created() {
      return this.$store.dispatch('getUserPosts', {userId: this.user._id})
    },
    methods: {
      loadPostDetails(post, editPostDialog = true) {
        const {_id, title, imageUrl, categories, description} = post;
        this.postId = _id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.selectedCategories = categories;
        this.description = description;
        editPostDialog ? this.editPostDialog = true : this.deletePostDialog = true;
      },
      onSubmit() {
        if (this.$refs.form.validate()) {
          this.$store.dispatch('updatePost', {
            postId: this.postId,
            userId: this.user._id,
            title: this.title,
            imageUrl: this.imageUrl,
            categories: this.selectedCategories,
            description: this.description,
          })
            .then(() => this.editPostDialog = false);
        }
      },
      deletePost() {
        this.$store.dispatch('deletePost', {postId: this.postId})
          .then(() => this.deletePostDialog = false)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .user {
    &__avatar {
      border-radius: 50%;
    }

    &__text {
      border-bottom: 1px solid lighten(#9e9e9e, 20%);;
      font-size: 16px;
      font-weight: 300;
      margin-bottom: 0;
      padding: .5rem 0;

      &:last-of-type {
        border-bottom: none;
        padding-bottom: 0;
        padding-top: .5rem;
      }
    }
  }

  .card {
    &__media {
      cursor: pointer;
      max-height: 460px;
    }

    &__img {
      max-width: 100%;
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
        margin-bottom: 0;
        transition: color .2s ease-in-out;

        &:hover {
          color: #094D92;
          text-decoration: none;
        }
      }
    }
  }

  .border-bottom {
    border-bottom: 1px solid #eee;
  }

  /deep/ .v-list--two-line {
    padding: 0;
  }

  /deep/ .v-list__tile__action {
    align-items: center;
    flex-direction: row;
    justify-content: center;
  }
</style>
