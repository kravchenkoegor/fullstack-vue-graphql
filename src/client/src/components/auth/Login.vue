<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>

        <v-card class="elevation-12 form">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Welcome back!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="onSubmit">
              <v-text-field
                  v-model="username"
                  prepend-icon="fas fa-user"
                  name="login"
                  label="Username"
                  type="text"
                  autocomplete="new-password"
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  prepend-icon="fas fa-lock"
                  name="password"
                  label="Password"
                  type="password"
              ></v-text-field>
            </v-form>

            <router-link to="/register" class="form__link">Don't have an account?</router-link>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="onSubmit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'Login',
    data: () => ({
      username: process.env.VUE_APP_USER,
      password: process.env.VUE_APP_PASSWORD
    }),
    computed: {
      ...mapGetters(['user'])
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
        return this.$store.dispatch('setUser', {
          username: this.username,
          password: this.password
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .form {
    &__link {
      display: block;
      font-size: 16px;
      padding-top: 8px;
      text-align: left;
      text-decoration: none;

      &:hover {
        color: rgba(#000, .87);
      }
    }
  }
</style>
