import Vue from 'vue';

const disableScroll = () => {
  const elements = document.querySelectorAll('html, body');
  elements.forEach((el) => el.style.overflow = 'hidden');
};

const enableScroll = () => {
  const elements = document.querySelectorAll('html, body');
  elements.forEach((el) => el.removeAttribute('style'));
};

function disableHTMLScroll(Vue) {
  Vue.prototype.$disableHTMLScroll = disableScroll;
}

function enableHTMLScroll(Vue) {
  Vue.prototype.$enableHTMLScroll = enableScroll;
}

Vue.use(disableHTMLScroll);
Vue.use(enableHTMLScroll);
