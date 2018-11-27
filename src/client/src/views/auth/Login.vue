<template>
  <v-container text-xs-center mt-5 pt-5>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>

        <template v-if="error">
          <form-alert :message="error.message"></form-alert>
        </template>

        <v-card class="elevation-12 form">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Welcome back!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form
                v-model="isFormValid"
                lazy-validation
                ref="form"
                @submit.prevent="onSubmit"
            >
              <v-text-field
                  v-model="username"
                  prepend-icon="fas fa-user"
                  name="login"
                  label="Username"
                  type="text"
                  autocomplete="new-password"
                  :rules="usernameRules"
              ></v-text-field>
              <v-text-field
                  v-model="password"
                  prepend-icon="fas fa-lock"
                  name="password"
                  label="Password"
                  type="password"
                  :rules="passwordRules"
              ></v-text-field>
            </v-form>

            <router-link to="/register" class="form__link">Don't have an account?</router-link>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              :loading="loading"
              color="primary"
              @click="onSubmit"
              :disabled="!isFormValid"
            >
              Login
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
    name: 'Login',
    data: () => ({
      username: '', //process.env.VUE_APP_USER,
      password: '', //process.env.VUE_APP_PASSWORD,
      usernameRules: [
        username => !!username || 'Username is required',
        username => username.length >= 3 || 'Username must be at least 3 characters'
      ],
      passwordRules: [
        password => !!password || 'Password is required',
        password => password.length >= 6 || 'Password must be at least 6 characters'
      ],
      isFormValid: true
    }),
    computed: {
      ...mapGetters(['user', 'error', 'loading'])
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
          return this.$store.dispatch('setUser', {
            username: this.username,
            password: this.password
          });
        }
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
