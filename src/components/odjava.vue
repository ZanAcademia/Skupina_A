<template>
    Odjava
</template>

<script>
export default {
    created() {
      localStorage.removeItem("vpisanUporabnik");
      this.$router.push('/');
    },
}
</script>