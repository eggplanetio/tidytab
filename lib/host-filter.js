import Vue from 'vue';

export default Vue.filter('host', function (url) {
  const parser = document.createElement('a');
  parser.href = url;
  return parser.host;
});
