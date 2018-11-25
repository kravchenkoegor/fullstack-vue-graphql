import Vue from 'vue';
import Vuex from 'vuex';
import {defaultClient as apolloClient} from './main';
import {GET_POSTS, LOGIN, REGISTER, GET_CURRENT_USER} from '../queries';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false,
    user: null
  },
  mutations: {
    getPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    getPosts({commit}) {
      commit('setLoading', true);
      apolloClient.query({query: GET_POSTS})
        .then(({data}) => {
          commit('getPosts', data.getPosts);
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          console.error(error)
        })
    },
    setUser({commit}, payload) {
      apolloClient.mutate({
        mutation: LOGIN,
        variables: payload
      })
        .then(({data}) => {
          localStorage.setItem('graph-token', data.login.token);
          router.push({name: 'home'})
        })
        .catch(error => console.error(error))
    },
    getCurrentUser({commit}) {
      commit('setLoading', true);
      apolloClient.query({query: GET_CURRENT_USER})
        .then(({data}) => {
          console.log(data.getCurrentUser)
          commit('setUser', data.getCurrentUser)
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error)
          commit('setLoading', false);
        })
    }
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    loading(state) {
      return state.loading;
    },
    user: (state) => state.user
  }
});
