<template>
    Odjava
</template>

<script>
export default {
    created() {
      localStorage.clear();
      this.$router.push('/');
    },
}
</script>