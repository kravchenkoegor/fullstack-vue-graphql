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
        <router-link to="/" tag="span" class="toolbar__link">Insta Girls</router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-text-field
        class="hidden-sm-and-down"
        color="#fff"
        flex
        prepend-icon="fas fa-search"
        placeholder="Search girls"
        single-line
      ></v-text-field>

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
          <router-link to="/" tag="span" class="toolbar__link">Insta Girls</router-link>
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
  export default {
    name: 'App',
    data: () => ({
      drawer: false,
      menuButtons: [
        { title: 'Posts', icon: 'fas fa-images', link: '/posts' },
        { title: 'Login', icon: 'fas fa-sign-in-alt', link: '/login' },
        { title: 'Register', icon: 'fas fa-user-plus', link: '/register' }
      ]
    })
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
