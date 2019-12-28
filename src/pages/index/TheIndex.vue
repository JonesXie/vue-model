<template>
  <section class="TheIndex">
    <svg-icon icon-class="happy"></svg-icon>
    <span class="cursor">首页</span>
    <router-link to="/login">登录</router-link>
  </section>
</template>

<script>
export default {
  name: "TheIndex",
  data() {
    return {};
  },
  components: {},
  watch: {},
  computed: {},
  mounted() {},
  activated() {},
  methods: {}
};
</script>

<style scoped lang="scss">
.cursor {
  color: $colorRed;
}
</style>
