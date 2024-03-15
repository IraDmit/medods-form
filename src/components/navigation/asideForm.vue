<template>
  <div class="aside">
    <div class="btn" @click="$emit('tryRegister')">Оформить пациента</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.btn {
  position: sticky;
  top: 0;
  max-width: unset;
}
</style>
