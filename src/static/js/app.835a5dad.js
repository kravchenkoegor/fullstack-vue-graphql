(function(t){function e(e){for(var r,a,i=e[0],c=e[1],u=e[2],l=0,f=[];l<i.length;l++)a=i[l],o[a]&&f.push(o[a][0]),o[a]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);d&&d(e);while(f.length)f.shift()();return s.push.apply(s,u||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var r={},a={app:0},o={app:0},s=[];function i(t){return c.p+"static/js/"+({}[t]||t)+"."+{"chunk-5ffaf29e":"01e66df3","chunk-694bfe65":"969edeb6","chunk-7b8085e4":"a4cbb1c6","chunk-7edd1a2c":"630dcc8c","chunk-a7558998":"c39a6726","chunk-a9c23a80":"cb620534"}[t]+".js"}function c(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-5ffaf29e":1,"chunk-694bfe65":1,"chunk-7b8085e4":1,"chunk-7edd1a2c":1,"chunk-a7558998":1,"chunk-a9c23a80":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise(function(e,n){for(var r="static/css/"+({}[t]||t)+"."+{"chunk-5ffaf29e":"3dca64b6","chunk-694bfe65":"13f58630","chunk-7b8085e4":"d31ec78e","chunk-7edd1a2c":"922c8e25","chunk-a7558998":"c9d818c7","chunk-a9c23a80":"92212aed"}[t]+".css",a=c.p+r,o=document.getElementsByTagName("link"),s=0;s<o.length;s++){var i=o[s],u=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(u===r||u===a))return e()}var l=document.getElementsByTagName("style");for(s=0;s<l.length;s++){i=l[s],u=i.getAttribute("data-href");if(u===r||u===a)return e()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=e,f.onerror=function(e){var r=e&&e.target&&e.target.src||a,o=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");o.request=r,n(o)},f.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(f)}).then(function(){a[t]=0}));var r=o[t];if(0!==r)if(r)e.push(r[2]);else{var s=new Promise(function(e,n){r=o[t]=[e,n]});e.push(r[2]=s);var u,l=document.getElementsByTagName("head")[0],f=document.createElement("script");f.charset="utf-8",f.timeout=120,c.nc&&f.setAttribute("nonce",c.nc),f.src=i(t),u=function(e){f.onerror=f.onload=null,clearTimeout(d);var n=o[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src,s=new Error("Loading chunk "+t+" failed.\n("+r+": "+a+")");s.type=r,s.request=a,n[1](s)}o[t]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:f})},12e4);f.onerror=f.onload=u,l.appendChild(f)}return Promise.all(e)},c.m=t,c.c=r,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)c.d(n,r,function(e){return t[e]}.bind(null,r));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var f=0;f<u.length;f++)e(u[f]);var d=l;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"0c60":function(t,e,n){},"39ff":function(t,e,n){"use strict";n.d(e,"f",function(){return _}),n.d(e,"h",function(){return y}),n.d(e,"e",function(){return k}),n.d(e,"g",function(){return P}),n.d(e,"l",function(){return S}),n.d(e,"d",function(){return $}),n.d(e,"a",function(){return w}),n.d(e,"n",function(){return I}),n.d(e,"c",function(){return O}),n.d(e,"b",function(){return j}),n.d(e,"i",function(){return E}),n.d(e,"m",function(){return U}),n.d(e,"j",function(){return x}),n.d(e,"k",function(){return A});var r=n("23ee");function a(){var t=b(["\n  mutation ($username: String!, $email: String!, $password: String!) {\n    register(username: $username, email: $email, password: $password) {\n      token\n    }\n  }\n"]);return a=function(){return t},t}function o(){var t=b(["\n  mutation ($username: String!, $password: String!) {\n    login(username: $username, password: $password) {\n      token\n    }\n  }\n"]);return o=function(){return t},t}function s(){var t=b(["\n  mutation ($postId: ID!, $username: String!) {\n    unlikePost(postId: $postId, username: $username) {\n      likes\n      favorites {\n        _id\n        title\n        imageUrl\n      }\n    }\n  }\n"]);return s=function(){return t},t}function i(){var t=b(["\n  mutation ($postId: ID!, $username: String!) {\n    likePost(postId: $postId, username: $username) {\n      likes\n      favorites {\n        _id\n        title\n        imageUrl\n      }\n    }\n  }\n"]);return i=function(){return t},t}function c(){var t=b(["\n  mutation ($messageBody: String!, $userId: ID!, $postId: ID!) {\n    addPostMessage(messageBody: $messageBody, userId: $userId, postId: $postId) {\n      _id\n      messageBody\n      messageDate\n      messageUser {\n        _id\n        username\n        avatar\n      }\n    }\n  }\n"]);return c=function(){return t},t}function u(){var t=b(["\n  mutation($postId: ID!) {\n    deletePost(postId: $postId) {\n      _id\n    }\n  }\n"]);return u=function(){return t},t}function l(){var t=b(["\n  mutation ($postId: ID!, $userId: ID!, $title: String!, $imageUrl: String!, $categories: [String]!, $description: String) {\n    updatePost(postId: $postId, userId: $userId, title: $title, imageUrl: $imageUrl, categories: $categories, description: $description) {\n      _id\n      title\n      imageUrl\n      categories\n      description\n      createdDate\n    }\n  }\n"]);return l=function(){return t},t}function f(){var t=b(["\n  mutation ($title: String!, $imageUrl: String!, $categories: [String]!, $description: String, $creatorId: ID!) {\n    addPost(title: $title, imageUrl: $imageUrl, categories: $categories, description: $description, creatorId: $creatorId) {\n      _id\n      title\n      imageUrl\n      categories\n      description\n    }\n  }\n"]);return f=function(){return t},t}function d(){var t=b(["\n  query {\n    getCurrentUser {\n      _id\n      username\n      email\n      password\n      avatar\n      joinDate\n      favorites {\n        _id\n        title\n        imageUrl\n      }\n    }\n  }\n"]);return d=function(){return t},t}function p(){var t=b(["\n  query($searchText: String) {\n    searchPosts(searchText: $searchText) {\n      _id\n      title\n      imageUrl\n      description\n      likes\n    }\n  }\n"]);return p=function(){return t},t}function h(){var t=b(["\n  query($userId: ID!) {\n    getUserPosts(userId: $userId) {\n      _id\n      title\n      imageUrl\n      categories\n      description\n    }\n  }\n"]);return h=function(){return t},t}function v(){var t=b(["\n  query($postId: ID!) {\n    getPost(postId: $postId) {\n      _id\n      title\n      imageUrl\n      categories\n      description\n      likes\n      createdDate\n      messages {\n        _id\n        messageBody\n        messageDate\n        messageUser {\n          _id\n          username\n          avatar\n        }\n      }\n    }\n  }\n"]);return v=function(){return t},t}function m(){var t=b(["\n  query($pageNum: Int!, $pageSize: Int!) {\n    infiniteScrollPosts(pageNum: $pageNum, pageSize: $pageSize) {\n      hasMore\n      posts {\n        _id\n        title\n        imageUrl\n        categories\n        description\n        likes\n        createdDate\n        messages {\n          _id\n        }\n        createdBy {\n          _id\n          username\n          avatar\n        }\n      }\n    }\n  }\n"]);return m=function(){return t},t}function g(){var t=b(["\n  query {\n    getPosts {\n      _id\n      title\n      imageUrl\n    }\n  }  \n"]);return g=function(){return t},t}function b(t,e){return e||(e=t.slice(0)),Object.freeze(Object.defineProperties(t,{raw:{value:Object.freeze(e)}}))}var _=Object(r["b"])(g()),y=Object(r["b"])(m()),k=Object(r["b"])(v()),P=Object(r["b"])(h()),S=Object(r["b"])(p()),$=Object(r["b"])(d()),w=Object(r["b"])(f()),I=Object(r["b"])(l()),O=Object(r["b"])(u()),j=Object(r["b"])(c()),E=Object(r["b"])(i()),U=Object(r["b"])(s()),x=Object(r["b"])(o()),A=Object(r["b"])(a())},"56d7":function(t,e,n){"use strict";n.r(e);n("744f"),n("6c7b"),n("7514"),n("20d6"),n("1c4c"),n("6762"),n("cadf"),n("e804"),n("55dd"),n("d04f"),n("c8ce"),n("217b"),n("7f7f"),n("f400"),n("7f25"),n("536b"),n("d9ab"),n("f9ab"),n("32d7"),n("25c9"),n("9f3c"),n("042e"),n("c7c6"),n("f4ff"),n("049f"),n("7872"),n("a69f"),n("0b21"),n("6c1a"),n("c7c62"),n("84b4"),n("c5f6"),n("2e37"),n("fca0"),n("7cdf"),n("ee1d"),n("b1b1"),n("87f3"),n("9278"),n("5df2"),n("04ff"),n("f751"),n("4504"),n("fee7"),n("ffc1"),n("0d6d"),n("9986"),n("8e6e"),n("25db"),n("e4f7"),n("b9a1"),n("64d5"),n("9aea"),n("db97"),n("66c8"),n("57f0"),n("165b"),n("456d"),n("cf6a"),n("fd24"),n("8615"),n("551c"),n("097d"),n("df1b"),n("2397"),n("88ca"),n("ba16"),n("d185"),n("ebde"),n("2d34"),n("f6b3"),n("2251"),n("c698"),n("a19f"),n("9253"),n("9275"),n("3b2b"),n("3846"),n("4917"),n("a481"),n("28a5"),n("386d"),n("6b54"),n("4f7f"),n("8a81"),n("ac4d"),n("8449"),n("9c86"),n("fa83"),n("48c0"),n("a032"),n("aef6"),n("d263"),n("6c37"),n("9ec8"),n("5695"),n("2fdb"),n("d0b0"),n("5df3"),n("b54a"),n("f576"),n("ed50"),n("788d"),n("14b9"),n("f386"),n("f559"),n("1448"),n("673e"),n("242a"),n("c66f"),n("b05c"),n("34ef"),n("6aa2"),n("15ac"),n("af56"),n("b6e4"),n("9c29"),n("63d9"),n("4dda"),n("10ad"),n("c02b"),n("4795"),n("130f"),n("ac6a"),n("96cf");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-app",{staticStyle:{background:"#eeeeee"}},[n("v-toolbar",{staticClass:"toolbar",attrs:{app:"",color:"primary",fixed:"",dark:""}},[n("v-toolbar-side-icon",{staticClass:"hidden-md-and-up",on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-toolbar-title",[n("router-link",{staticClass:"toolbar__link",attrs:{to:"/",tag:"span"}},[t._v("\n        "+t._s(t.title)+"\n      ")])],1),n("v-spacer"),n("div",{staticClass:"search__container"},[n("v-text-field",{staticClass:"hidden-sm-and-down",attrs:{color:"#fff",flex:"","prepend-icon":"fas fa-search",placeholder:"Search","single-line":"",clearable:"","clear-icon":"fas fa-times"},on:{input:t.performSearch,"click:clear":t.clearSearchResults},model:{value:t.searchText,callback:function(e){t.searchText=e},expression:"searchText"}}),t.searchResults.length?n("v-card",{staticClass:"search__card",attrs:{light:""}},[n("v-list",t._l(t.searchResults,function(e){return n("v-list-tile",{key:e._id,attrs:{avatar:"",inset:""},on:{click:function(n){t.goToSearchResult(e._id)}}},[n("v-list-tile-avatar",[n("img",{attrs:{src:e.imageUrl,alt:""}})]),n("v-list-tile-content",[n("v-list-tile-title",[t._v("\n                "+t._s(e.title)+"\n              ")]),n("v-list-tile-sub-title",[n("span",{staticClass:"font-weight-light"},[t._v("\n                  "+t._s(t.formatDescription(e.description))+"\n                ")])])],1),t.checkIfUserFavorite(e._id)?n("v-list-tile-action",[n("v-icon",{attrs:{color:"error"}},[t._v("fas fa-heart")])],1):t._e()],1)}))],1):t._e()],1),n("v-spacer"),n("v-toolbar-items",{staticClass:"hidden-sm-and-down"},[t._l(t.menuButtons,function(e){return n("v-btn",{key:e.title,attrs:{to:e.link,flat:""}},[n("v-icon",{attrs:{left:""}},[t._v(t._s(e.icon))]),t._v("\n        "+t._s(e.title)+"\n      ")],1)}),t.user?[n("v-btn",{attrs:{flat:"",to:"/profile"}},[n("v-icon",{attrs:{left:""}},[t._v("fas fa-user-circle")]),n("v-badge",{class:{bounce:t.badgeAnimated},attrs:{right:"",color:"success"}},[t.userFavorites.length?n("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.userFavorites.length))]):t._e(),t._v("\n              Profile\n          ")])],1),n("v-btn",{attrs:{flat:""},on:{click:t.signoutUser}},[n("v-icon",{attrs:{left:""}},[t._v("fas fa-sign-out-alt")]),t._v("\n          Logout\n        ")],1)]:t._e()],2)],1),n("v-navigation-drawer",{attrs:{app:"",temporary:""},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-toolbar",{attrs:{color:"accent",flat:"",dark:""}},[n("v-toolbar-side-icon",{on:{click:function(e){e.stopPropagation(),t.drawer=!t.drawer}}}),n("v-toolbar-title",[n("router-link",{staticClass:"toolbar__link",attrs:{to:"/",tag:"span"}},[t._v("\n          "+t._s(t.title)+"\n        ")])],1)],1),n("v-list",[t._l(t.menuButtons,function(e){return n("v-list-tile",{key:e.title,attrs:{to:e.link}},[n("v-list-tile-action",[n("v-icon",[t._v(t._s(e.icon))])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v(t._s(e.title))])],1)],1)}),t.user?[n("v-list-tile",{attrs:{to:"/profile"}},[n("v-list-tile-action",[n("v-icon",{attrs:{left:""}},[t._v("fas fa-user-circle")])],1),n("v-list-tile-content",[n("v-list-tile-title",[n("v-badge",{attrs:{right:"",color:"primary"}},[t.userFavorites.length?n("span",{attrs:{slot:"badge"},slot:"badge"},[t._v(t._s(t.userFavorites.length))]):t._e(),t._v("\n                Profile\n              ")])],1)],1)],1),n("v-list-tile",{on:{click:t.signoutUser}},[n("v-list-tile-action",[n("v-icon",{attrs:{left:""}},[t._v("fas fa-sign-out-alt")])],1),n("v-list-tile-content",[n("v-list-tile-title",[t._v("Logout")])],1)],1)]:t._e()],2)],1),n("v-content",[n("transition",{attrs:{name:"fade"}},[n("router-view")],1),n("v-snackbar",{attrs:{timeout:3e3,color:"success",bottom:"",left:""},model:{value:t.authSnackbar,callback:function(e){t.authSnackbar=e},expression:"authSnackbar"}},[n("v-icon",{staticClass:"mr-3"},[t._v("fas fa-check-circle")]),n("h3",[t._v("Login successful!")]),n("v-btn",{attrs:{flat:""},on:{click:function(e){t.authSnackbar=!1}}},[t._v("Close")])],1),t.authError?n("v-snackbar",{attrs:{timeout:5e3,color:"error",bottom:"",left:""},model:{value:t.authErrorSnackbar,callback:function(e){t.authErrorSnackbar=e},expression:"authErrorSnackbar"}},[n("v-icon",{staticClass:"mr-3"},[t._v("fas fa-exclamation-circle")]),n("h3",[t._v(t._s(t.authError.message))]),n("v-btn",{attrs:{flat:"",to:"/login"}},[t._v("Login")])],1):t._e()],1)],1)},o=[],s=n("2f62");function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){c(t,e,n[e])})}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={name:"App",data:function(){return{searchText:"",drawer:!1,title:"Vue.js + GraphQL App",authSnackbar:!1,authErrorSnackbar:!1,badgeAnimated:!1}},watch:{user:function(t,e){null===e&&(this.authSnackbar=!0)},authError:function(t){null!==t&&(this.authErrorSnackbar=!0)},userFavorites:function(t){var e=this;t&&(this.badgeAnimated=!0,setTimeout(function(){return e.badgeAnimated=!1},1e3))}},computed:i({},Object(s["b"])(["user","authError","userFavorites","searchResults"]),{menuButtons:function(){var t=[{title:"Posts",icon:"fas fa-images",link:"/posts"},{title:"Create",icon:"fas fa-edit",link:"/post/add"}];return this.user||(t=[{title:"Posts",icon:"fas fa-images",link:"/posts"},{title:"Login",icon:"fas fa-sign-in-alt",link:"/login"},{title:"Register",icon:"fas fa-user-plus",link:"/register"}]),t}}),methods:{signoutUser:function(){return this.$store.dispatch("clearUser")},performSearch:function(){return this.$store.dispatch("searchPosts",{searchText:this.searchText})},goToSearchResult:function(t){this.clearSearchResults(),this.$router.push("/post/".concat(t))},clearSearchResults:function(){this.searchText="",this.$store.commit("clearSearchResults")},formatDescription:function(t){return t.length>20?"".concat(t.slice(0,20),"..."):t},checkIfUserFavorite:function(t){return this.userFavorites&&this.userFavorites.some(function(e){return e._id===t})}}},l=u,f=(n("5c0b"),n("2877")),d=Object(f["a"])(l,a,o,!1,null,null,null);d.options.__file="App.vue";var p=d.exports,h=n("8c4f"),v=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div")},m=[],g={name:"home",loading:!0,created:function(){this.$router.push("/posts")}},b=g,_=Object(f["a"])(b,v,m,!1,null,null,null);_.options.__file="Home.vue";var y=_.exports,k=n("a34a"),P=n.n(k),S=n("39ff");function $(t,e,n,r,a,o,s){try{var i=t[o](s),c=i.value}catch(u){return void n(u)}i.done?e(c):Promise.resolve(c).then(r,a)}function w(t){return function(){var e=this,n=arguments;return new Promise(function(r,a){var o=t.apply(e,n);function s(t){$(o,r,a,s,i,"next",t)}function i(t){$(o,r,a,s,i,"throw",t)}s(void 0)})}}function I(t){return E(t)||j(t)||O()}function O(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function j(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function E(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function U(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){x(t,e,n[e])})}return t}function x(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}r["default"].use(s["a"]);var A=new s["a"].Store({state:{posts:[],userPosts:[],loading:!1,user:null,error:null,authError:null,searchResults:[]},mutations:{getPosts:function(t,e){t.posts=e},setUserPosts:function(t,e){t.userPosts=e},setLoading:function(t,e){t.loading=e},setUser:function(t,e){t.user=e},clearUser:function(t){t.user=null},setError:function(t,e){t.error=e},clearError:function(t){t.error=null},setAuthError:function(t,e){t.authError=e},setSearchResults:function(t,e){null!==e&&(t.searchResults=e)},clearSearchResults:function(t){t.searchResults=[]}},actions:{getPosts:function(t){var e=t.commit;e("setLoading",!0),K.query({query:S["f"]}).then(function(t){var n=t.data;e("getPosts",n.getPosts),e("setLoading",!1)}).catch(function(t){e("setLoading",!1),console.error(t)})},getUserPosts:function(t,e){var n=t.commit;K.query({query:S["g"],variables:e}).then(function(t){var e=t.data;n("setUserPosts",e.getUserPosts)}).catch(function(t){console.error(t)})},searchPosts:function(t,e){var n=t.commit;K.query({query:S["l"],variables:e}).then(function(t){var e=t.data;n("setSearchResults",e.searchPosts)}).catch(function(t){return console.error(t)})},addPost:function(t,e){var n=t.commit;K.mutate({mutation:S["a"],variables:e,update:function(t,e){var n=e.data.addPost,r=t.readQuery({query:S["f"]});r.getPosts.unshift(n),t.writeQuery({query:S["f"],data:r})},optimisticResponse:{__typename:"Mutation",addPost:U({__typename:"Post",_id:-1},e)},refetchQueries:[{query:S["h"],variables:{pageNum:1,pageSize:4}}]}).then(function(){n("setLoading",!1)}).catch(function(t){n("setLoading",!1),console.error(t)})},updatePost:function(t,e){var n=t.state,r=t.commit;K.mutate({mutation:S["n"],variables:e}).then(function(t){var e=t.data,a=n.userPosts.findIndex(function(t){return t._id===e.updatePost._id}),o=I(n.userPosts.slice(0,a)).concat([e.updatePost],I(n.userPosts.slice(a+1)));r("setUserPosts",o)}).catch(function(t){return console.error(t)})},deletePost:function(t,e){var n=t.state,r=t.commit;K.mutate({mutation:S["c"],variables:e}).then(function(t){var e=t.data,a=n.userPosts.findIndex(function(t){return t._id===e.deletePost._id}),o=I(n.userPosts.slice(0,a)).concat(I(n.userPosts.slice(a+1)));r("setUserPosts",o)}).catch(function(t){return console.error(t)})},registerUser:function(t,e){var n=t.commit;n("clearError"),n("setLoading",!0),K.mutate({mutation:S["k"],variables:e}).then(function(t){var e=t.data;localStorage.setItem("graph-token",e.register.token),C.go()}).catch(function(t){n("setLoading",!1),n("setError",t),console.error(t)})},setUser:function(t,e){var n=t.commit;n("clearError"),n("setLoading",!0),K.mutate({mutation:S["j"],variables:e}).then(function(t){var e=t.data;localStorage.setItem("graph-token",e.login.token),C.go()}).catch(function(t){n("setLoading",!1),n("setError",t),console.error(t)})},getCurrentUser:function(t){var e=t.commit;e("setLoading",!0),K.query({query:S["d"]}).then(function(t){var n=t.data;e("setUser",n.getCurrentUser),e("setLoading",!1)}).catch(function(t){console.error(t),e("setLoading",!1)})},clearUser:function(){var t=w(P.a.mark(function t(e){var n;return P.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,n("clearUser"),t.next=4,K.resetStore();case 4:C.push("/");case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},getters:{posts:function(t){return t.posts},userPosts:function(t){return t.userPosts},loading:function(t){return t.loading},user:function(t){return t.user},userFavorites:function(t){return t.user&&t.user.favorites},error:function(t){return t.error},authError:function(t){return t.authError},searchResults:function(t){return t.searchResults}}}),T=function(t,e,n){A.getters.user?n():n({path:"/login"})};r["default"].use(h["a"]);var C=new h["a"]({routes:[{path:"/",name:"home",component:y},{path:"/login",name:"login",component:function(){return n.e("chunk-a9c23a80").then(n.bind(null,"5326"))}},{path:"/register",name:"register",component:function(){return n.e("chunk-694bfe65").then(n.bind(null,"935e"))}},{path:"/profile",name:"profile",component:function(){return n.e("chunk-7edd1a2c").then(n.bind(null,"b35c"))},beforeEnter:T},{path:"/posts",name:"posts",component:function(){return n.e("chunk-a7558998").then(n.bind(null,"cb8a"))}},{path:"/post/add",name:"add",component:function(){return n.e("chunk-5ffaf29e").then(n.bind(null,"762e"))},beforeEnter:T},{path:"/post/:postId",name:"post",component:function(){return n.e("chunk-7b8085e4").then(n.bind(null,"366c"))},props:!0}]}),L=n("ce5b"),q=n.n(L);n("bf40");r["default"].use(q.a,{iconfont:"fa",theme:{primary:"#094D92",secondary:"#1D3461",accent:"#5D737E",error:"#FE4A49",success:"#68B684"}});var D=function(){var t=document.querySelectorAll("html, body");t.forEach(function(t){return t.style.overflow="hidden"})},R=function(){var t=document.querySelectorAll("html, body");t.forEach(function(t){return t.removeAttribute("style")})};function B(t){t.prototype.$disableHTMLScroll=D}function F(t){t.prototype.$enableHTMLScroll=R}r["default"].use(B),r["default"].use(F);var M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-alert",{staticClass:"mb-4 elevation-4",attrs:{type:"error",value:!0,dismissible:"",transition:"scale-transition"}},[n("h3",[t._v(t._s(t.message))])])},N=[],z={name:"FormAlert",props:["message"]},Q=z,H=(n("6c3d"),Object(f["a"])(Q,M,N,!1,null,"34215e77",null));H.options.__file="FormAlert.vue";var J=H.exports,G=n("23ee"),V=n("522d");n.d(e,"defaultClient",function(){return K}),r["default"].component("form-alert",J),r["default"].use(V["a"]);var K=new G["a"]({uri:"http://localhost:4000/graphql",fetchOptions:{credentials:"include"},request:function(t){localStorage.getItem("graph-token")||localStorage.setItem("graph-token",""),t.setContext({headers:{authorization:localStorage.getItem("graph-token")}})},onError:function(t){var e=t.graphQLErrors,n=t.networkError;if(n&&console.error({networkError:n}),e){var r=!0,a=!1,o=void 0;try{for(var s,i=e[Symbol.iterator]();!(r=(s=i.next()).done);r=!0){var c=s.value;if(console.error(c),"AuthenticationError"===c.name)return A.commit("setAuthError",c),A.dispatch("clearUser")}}catch(u){a=!0,o=u}finally{try{r||null==i.return||i.return()}finally{if(a)throw o}}}}}),W=new V["a"]({defaultClient:K});r["default"].config.productionTip=!1,new r["default"]({apolloProvider:W,router:C,store:A,render:function(t){return t(p)},created:function(){return this.$store.dispatch("getCurrentUser")}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("5e27"),a=n.n(r);a.a},"5e27":function(t,e,n){},"6c3d":function(t,e,n){"use strict";var r=n("0c60"),a=n.n(r);a.a}});
//# sourceMappingURL=app.835a5dad.js.map