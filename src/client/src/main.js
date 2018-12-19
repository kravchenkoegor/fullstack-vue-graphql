import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vuetify'
import './plugins/scrollFix'

// Register global component
import FormAlert from './components/shared/FormAlert'
Vue.component('form-alert', FormAlert)

// Apollo
import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo'
Vue.use(VueApollo)

export const defaultClient = new ApolloClient({
  uri: `${process.env.VUE_APP_HOST}/graphql`,
  fetchOptions: {
    credentials: 'include'
  },
  request: (operation) => {
    if (!localStorage.getItem('graph-token')) {
      localStorage.setItem('graph-token', '')
    }

    operation.setContext({
      headers: {
        authorization: localStorage.getItem('graph-token')
      }
    })
  },
  onError: ({graphQLErrors, networkError}) => {
    if (networkError) {
      console.error({networkError})
    }

    if (graphQLErrors) {
      for (let error of graphQLErrors) {
        console.error(error)

        if (error.name === 'AuthenticationError') {
          store.commit('setAuthError', error);
          return store.dispatch('clearUser');
        }
      }
    }
  }
})
const apolloProvider = new VueApollo({defaultClient})

Vue.config.productionTip = false

new Vue({
  apolloProvider,
  router,
  store,
  render: h => h(App),
  created() {
    return this.$store.dispatch('getCurrentUser')
  }
}).$mount('#app')
