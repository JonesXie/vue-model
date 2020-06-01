const mixin = {
  watch: {
    $route: {
      handler: function() {
        this.init();
      },
      immediate: true,
    },
  },
};

export default mixin;
