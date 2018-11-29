<template>
  <v-app style="background: #eeeeee">
    <v-toolbar
      app
      class="toolbar"
      color="primary"
      fixed
      dark
    >
      <v-toolbar-side-icon
        class="hidden-md-and-up"
        @click.stop="drawer = !drawer"
      ></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="toolbar__link">
          {{ title }}
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="search__container">
        <v-text-field
          v-model="searchText"
          @input="performSearch"
          class="hidden-sm-and-down"
          color="#fff"
          flex
          prepend-icon="fas fa-search"
          placeholder="Search girls"
          single-line
          clearable
          clear-icon="fas fa-times"
          @click:clear="clearSearchResults"
        ></v-text-field>

        <v-card
          v-if="searchResults.length"
          class="search__card"
          light
        >
          <v-list>
            <v-list-tile
              v-for="result in searchResults"
              :key="result._id"
              @click="goToSearchResult(result._id)"
              avatar
              inset
            >
              <v-list-tile-avatar>
                <img :src="result.imageUrl" alt="">
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>
                  {{result.title}}
                </v-list-tile-title>

                <v-list-tile-sub-title>
                  <span class="font-weight-light">
                    {{formatDescription(result.description)}}
                  </span>
                </v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action v-if="checkIfUserFavorite(result._id)">
                <v-icon color="error"
                >fas fa-heart</v-icon>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </div>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          v-for="button in menuButtons"
          :key="button.title"
          :to="button.link"
          flat
        >
          <v-icon left>{{ button.icon }}</v-icon>
          {{ button.title }}
        </v-btn>

        <template v-if="user">
          <v-btn
            flat
            to="/profile"
          >
            <v-icon left>fas fa-user-circle</v-icon>
            <v-badge
              right
              color="success"
              :class="{'bounce': badgeAnimated}"
            >
              <span
                v-if="userFavorites.length"
                slot="badge"
              >{{userFavorites.length}}</span>
                Profile
            </v-badge>
          </v-btn>

          <v-btn
            flat
            @click="signoutUser"
          >
            <v-icon left>fas fa-sign-out-alt</v-icon>
            Logout
          </v-btn>
        </template>
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
    >
      <v-toolbar color="accent" flat dark>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" class="toolbar__link">
            {{ title }}
          </router-link>
        </v-toolbar-title>
      </v-toolbar>

      <v-list>
        <v-list-tile
          v-for="button in menuButtons"
          :key="button.title"
          :to="button.link"
        >
          <v-list-tile-action>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{ button.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <template v-if="user">
          <v-list-tile
            to="/profile"
          >
            <v-list-tile-action>
              <v-icon left>fas fa-user-circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <v-badge right color="primary">
                <span
                  v-if="userFavorites.length"
                  slot="badge"
                >{{userFavorites.length}}</span>
                  Profile
                </v-badge>
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-tile @click="signoutUser">
            <v-list-tile-action>
              <v-icon left>fas fa-sign-out-alt</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <transition name="fade">
        <router-view/>
      </transition>

      <v-snackbar
        v-model="authSnackbar"
        :timeout="3000"
        color="success"
        bottom
        left
      >
        <v-icon class="mr-3">fas fa-check-circle</v-icon>
        <h3>Login successful!</h3>
        <v-btn
          flat
          @click="authSnackbar = false"
        >Close</v-btn>
      </v-snackbar>

      <v-snackbar
        v-if="authError"
        v-model="authErrorSnackbar"
        :timeout="5000"
        color="error"
        bottom
        left
      >
        <v-icon class="mr-3">fas fa-exclamation-circle</v-icon>
        <h3>{{authError.message}}</h3>
        <v-btn
          flat
          to="/login"
        >Login</v-btn>
      </v-snackbar>
    </v-content>

  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'App',
    data: () => ({
      searchText: '',
      drawer: false,
      title: 'InstaGirls',
      authSnackbar: false,
      authErrorSnackbar: false,
      badgeAnimated: false
    }),
    watch: {
      user(newValue, oldValue) {
        if (oldValue === null) {
          this.authSnackbar = true;
        }
      },
      authError(value) {
        if (value !== null) {
          this.authErrorSnackbar = true;
        }
      },
      userFavorites(value) {
        if (value) {
          this.badgeAnimated = true;
          setTimeout(() => (this.badgeAnimated = false), 1000);
        }
      }
    },
    computed: {
      ...mapGetters(['user', 'authError', 'userFavorites', 'searchResults']),
      menuButtons() {
        let items = [
          { title: 'Posts', icon: 'fas fa-images', link: '/posts' },
          { title: 'Create', icon: 'fas fa-edit', link: '/post/add' }
        ];

        if (!this.user) {
          items = [
            { title: 'Posts', icon: 'fas fa-images', link: '/posts' },
            { title: 'Login', icon: 'fas fa-sign-in-alt', link: '/login' },
            { title: 'Register', icon: 'fas fa-user-plus', link: '/register' }
          ];
        }

        return items;
      }
    },
    methods: {
      signoutUser() {
        return this.$store.dispatch('clearUser');
      },
      performSearch() {
        return this.$store.dispatch('searchPosts', {searchText: this.searchText})
      },
      goToSearchResult(postId) {
        this.clearSearchResults();
        this.$router.push(`/post/${postId}`);
      },
      clearSearchResults() {
        this.searchText = '';
        this.$store.commit('clearSearchResults');
      },
      formatDescription(desc) {
        return desc.length > 20 ? `${desc.slice(0, 20)}...` : desc
      },
      checkIfUserFavorite(postId) {
        return this.userFavorites && this.userFavorites.some(fave => fave._id === postId)
      }
    }
  }
</script>

<style lang="scss">
  html {
    background-color: #eeeeee;
    overflow-y: auto !important;
  }

  .container {
    max-width: 1170px !important;
    padding: 0 15px !important;
  }

  .toolbar {
    z-index: 9;

    &__link {
      cursor: pointer;
      transition: opacity .2s ease-in-out;

      &:hover {
        opacity: .8;
      }
    }
  }

  .v-list__tile__title {
     overflow: visible !important;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .2s ease-in-out;
  }

  .fade-enter-active {
    transition-delay: .2s;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0;
  }

  .bounce {
    animation: bounce 1s both;
  }

  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0, 0, 0);
    }

    40%, 43% {
      transform: translate3d(0, -20px, 0);
    }

    70% {
      transform: translate3d(0, -10px, 0);
    }

    90% {
      transform: translate3d(0, -4px, 0);
    }
  }

  .search {
    &__container {
      position: relative;
      min-width: 33%;
      max-width: 480px;

      .v-text-field {
        max-width: 480px;
      }
    }

    &__card {
      left: 0;
      max-width: 480px;
      right: 0;
      position: absolute !important;
      top: 100%;
      z-index: 9;
    }
  }
</style>
