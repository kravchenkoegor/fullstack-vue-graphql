import {gql} from 'apollo-boost';

// Posts Queries
export const GET_POSTS = gql`
  query {
    getPosts {
      _id
      title
      imageUrl
    }
  }  
`;

// Posts Mutations
export const ADD_POST = gql`
  mutation ($title: String!, $imageUrl: String!, $categories: [String]!, $description: String, $creatorId: ID) {
    addPost(title: $title, imageUrl: $imageUrl, categories: $categories, description: $description, creatorId: $creatorId) {
      _id
      title
      imageUrl
      categories
      description
      createdDate
    }
  }
`;

// User Mutations
export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      token
    }
  }
`;

// User Query
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      username
      email
      password
      avatar
      joinDate
      favorites {
        _id
        title
        imageUrl
      }
    }
  }
`;
