import Vue from 'vue';
import Vuex from 'vuex';
import {defaultClient as apolloClient} from './main';
import {
  GET_POSTS,
  INFINITE_SCROLL_POSTS,
  GET_USER_POSTS,
  ADD_POST,
  LOGIN,
  REGISTER,
  GET_CURRENT_USER,
  SEARCH_POSTS,
  UPDATE_POST,
  DELETE_POST
} from './queries';
import router from './router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    posts: [],
    userPosts: [],
    loading: false,
    user: null,
    error: null,
    authError: null,
    searchResults: []
  },
  mutations: {
    getPosts(state, posts) {
      state.posts = posts;
    },
    setUserPosts(state, userPosts) {
      state.userPosts = userPosts;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setUser(state, user) {
      state.user = user;
    },
    clearUser(state) {
      state.user = null;
    },
    setError(state, error) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
    setAuthError(state, error) {
      state.authError = error;
    },
    setSearchResults(state, searchResults) {
      if (searchResults !== null) {
        state.searchResults = searchResults;
      }
    },
    clearSearchResults(state) {
      state.searchResults = [];
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
          console.error(error);
        })
    },
    getUserPosts({commit}, payload) {
      apolloClient.query({
        query: GET_USER_POSTS,
        variables: payload
      })
        .then(({data}) => {
          commit('setUserPosts', data.getUserPosts);
          // commit('setLoading', false);
        })
        .catch(error => {
          // commit('setLoading', false);
          console.error(error);
        })
    },
    searchPosts({commit}, payload) {
      apolloClient.query({
        query: SEARCH_POSTS,
        variables: payload
      })
        .then(({data}) => {
          commit('setSearchResults', data.searchPosts)
        })
        .catch(error => console.error(error))
    },
    addPost({commit}, payload) {
      apolloClient.mutate({
        mutation: ADD_POST,
        variables: payload,
        update: (cache, {data: {addPost}}) => {
          const data = cache.readQuery({query: GET_POSTS});
          data.getPosts.unshift(addPost);
          cache.writeQuery({
            query: GET_POSTS,
            data
          });
        },
        optimisticResponse: {
          __typename: 'Mutation',
          addPost: {
            __typename: 'Post',
            _id: -1,
            ...payload
          }
        },
        // rerun specified queries after performing a mutation
        refetchQueries: [
          {
            query: INFINITE_SCROLL_POSTS,
            variables: {
              pageNum: 1,
              pageSize: 4
            }
          }
        ]
      })
        .then(() => {
          commit('setLoading', false);
        })
        .catch(error => {
          commit('setLoading', false);
          console.error(error);
        })
    },
    updatePost({state, commit}, payload) {
      apolloClient.mutate({
        mutation: UPDATE_POST,
        variables: payload
      })
        .then(({data}) => {
          const index = state.userPosts.findIndex(post => post._id === data.updatePost._id);
          const updatedPosts = [
            // all posts before updated post
            ...state.userPosts.slice(0, index),
            // updated post
            data.updatePost,
            // all posts after updated post
            ...state.userPosts.slice(index + 1)
          ];

          commit('setUserPosts', updatedPosts)
        })
        .catch(error => console.error(error))
    },
    deletePost({state, commit}, payload) {
      apolloClient.mutate({
        mutation: DELETE_POST,
        variables: payload
      })
        .then(({data}) => {
          const index = state.userPosts.findIndex(post => post._id === data.deletePost._id);
          const updatedPosts = [
            // all posts before updated post
            ...state.userPosts.slice(0, index),
            // all posts after updated post
            ...state.userPosts.slice(index + 1)
          ];

          commit('setUserPosts', updatedPosts);
        })
        .catch(error => console.error(error))
    },
    registerUser({commit}, payload) {
      commit('clearError');
      commit('setLoading', true);
      apolloClient.mutate({
        mutation: REGISTER,
        variables: payload
      })
        .then(({data}) => {
          localStorage.setItem('graph-token', data.register.token);
          router.go()
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.error(error);
        });
    },
    setUser({commit}, payload) {
      commit('clearError');
      commit('setLoading', true);
      apolloClient.mutate({
        mutation: LOGIN,
        variables: payload
      })
        .then(({data}) => {
          localStorage.setItem('graph-token', data.login.token);
          router.go();
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error);
          console.error(error);
        });
    },
    getCurrentUser({commit}) {
      commit('setLoading', true);
      apolloClient.query({query: GET_CURRENT_USER})
        .then(({data}) => {
          commit('setUser', data.getCurrentUser);
          commit('setLoading', false);
        })
        .catch(error => {
          console.error(error);
          commit('setLoading', false);
        })
    },
    async clearUser({commit}) {
      commit('clearUser');
      await apolloClient.resetStore();
      router.push('/');
    }
  },
  getters: {
    posts: (state) => state.posts,
    userPosts: (state) => state.userPosts,
    loading: (state) => state.loading,
    user: (state) => state.user,
    userFavorites: (state) => state.user && state.user.favorites,
    error: (state) => state.error,
    authError: (state) => state.authError,
    searchResults: (state) => state.searchResults
  }
});
