Vue.component("validation-provider", VeeValidate.ValidationProvider);
Vue.component("validation-observer", VeeValidate.ValidationObserver);

var forms = new Vue({
  el: "#app",
  data: {
    field1: null,
    field2: null,
    activeTab: 0,
    feedback: null,
    topic: null,
    company: null,
    //transport
    trns: null,
    date: null,
    slideNum: 1,
    start: false,
    bckwrd: false,
    baColor:" ",
    choice: 1
  }
});
