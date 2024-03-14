<template>
  <div class="checkbox">
    <input type="checkbox" v-model="inputValue" :id="name" />
    <label :for="name">Не отправлять СМС</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inputValue: false,
    };
  },
  props: {
    name: {
      type: String,
      default: "field",
    },
  },
  mounted() {
    this.$emit("changeValue", this.name, false);
  },
  watch: {
    inputValue() {
      this.$emit("changeValue", this.name, this.inputValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  grid-gap: 11px;
  align-items: center;
  label {
    cursor: pointer;
  }
}
</style>
