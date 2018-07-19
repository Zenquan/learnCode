<template>
  <div class="test"></div>
</template>

<script>
export default {
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.scrollHanderOne(this.getStatusData, this.page);
    }
  }
}
</script>
