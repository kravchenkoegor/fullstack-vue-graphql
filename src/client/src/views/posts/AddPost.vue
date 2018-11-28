<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout align-center justify-center>
      <v-flex xs12 sm6>

        <v-card class="elevation-12 form">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Create a post</v-toolbar-title>
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
                <v-flex xs12>
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
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn
              color="error"
              to="/posts"
              flat
            >
              Cancel
            </v-btn>

            <v-btn
              :loading="loading"
              color="primary"
              @click="onSubmit"
              :disabled="!isFormValid || loading"
            >
              Create
              <span slot="loader" class="custom-loader">
                <v-icon dark small>fas fa-sync-alt</v-icon>
              </span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'AddPost',
    data: () => ({
      title: '',
      imageUrl: '',
      description: '',
      categories: [
        'Art',
        'Photo',
        'Travel',
        'Food',
        'Technology',
        'Cars'
      ],
      selectedCategories: [],
      isFormValid: true
    }),
    computed: {
      ...mapGetters(['loading', 'user'])
    },
    watch: {
      user(value) {
        if (value) {
          this.$router.push('/');
        }
      }
    },
    methods: {
      onSubmit() {
        if (this.$refs.form.validate()) {
          return this.$store.dispatch('addPost', {
            title: this.title,
            imageUrl: this.imageUrl,
            categories: this.selectedCategories,
            description: this.description,
            creatorId: this.user._id
          })
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }

  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
