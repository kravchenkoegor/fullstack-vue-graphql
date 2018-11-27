<template>
  <v-app style="background: #e3e3ee">
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

      <!--<v-text-field-->
        <!--class="hidden-sm-and-down"-->
        <!--color="#fff"-->
        <!--flex-->
        <!--prepend-icon="fas fa-search"-->
        <!--placeholder="Search girls"-->
        <!--single-line-->
      <!--&gt;</v-text-field>-->

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
            to="profile"
          >
            <v-icon left>fas fa-user-circle</v-icon>
            <v-badge right color="accent">
              <!--<span slot="badge">1</span>-->
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
            to="profile"
          >
            <v-list-tile-action>
              <v-icon left>fas fa-user-circle</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                <v-badge right color="accent">
                <!--<span slot="badge">1</span>-->
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
    </v-content>

  </v-app>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'App',
    data: () => ({
      drawer: false,
      title: 'Vue + GraphQL'
    }),
    computed: {
      ...mapGetters(['user']),
      menuButtons() {
        let items = [
          { title: 'Posts', icon: 'fas fa-images', link: '/posts' },
          { title: 'Create', icon: 'fas fa-edit', link: '/post/add' },
          // { title: 'Profile', icon: 'fas fa-user-circle', link: '/profile' },
        ];

        if (!this.user) {
          items = [
            { title: 'Login', icon: 'fas fa-sign-in-alt', link: '/login' },
            { title: 'Register', icon: 'fas fa-user-plus', link: '/register' }
          ];
        }

        return items;
      }
    },
    methods: {
      signoutUser() {
        return this.$store.dispatch('signoutUser');
      }
    }
  }
</script>

<style lang="scss">
  .toolbar {
    &__link {
      cursor: pointer;
      transition: opacity .2s ease-in-out;

      &:hover {
        opacity: .8;
      }
    }

    /*/deep/ .v-icon.fas.fa-search {*/
      /*font-size: 18px;*/
    /*}*/
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
</style>
