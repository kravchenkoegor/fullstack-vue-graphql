import Vue from 'vue';
import Vuex from 'vuex';
import {defaultClient as apolloClient} from './main';
import {gql} from 'apollo-boost';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    loading: false
  },
  mutations: {
    getPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, loading) {
      state.loading = loading;
    }
  },
  actions: {
    getPosts({commit}) {
      commit('setLoading', true);
      apolloClient.query({
        query: gql`
          query {
            getPosts {
              _id
              title
              imageUrl
              categories
              description
            }
          }
        `,
      })
      .then(({data}) => {
        commit('getPosts', data.getPosts);
        commit('setLoading', false);
      })
      .catch(error => {
        commit('setLoading', false);
        console.log(error)
      })
    }
  },
  getters: {
    posts(state) {
      return state.posts;
    },
    loading(state) {
      return state.loading;
    }
  }
});
