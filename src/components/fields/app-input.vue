<template>
  <div class="form-field">
    <input type="text" :placeholder="placeholder" v-model="inputValue" />

    <span class="error" v-for="(item, key) in rules" :key="key">{{
      $v.value[key].$invalid ? $v.value[key].$message : ""
    }}</span>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
// eslint-disable-next-line no-unused-vars
import { required, maxLength } from "@vuelidate/validators";
export default {
  props: {
    placeholder: {
      type: String,
      default: "Введите значение",
    },
    rules: {
      type: Object,
      default: () => {},
    },
    name: {
      type: String,
      default: "field",
    },
  },
  data() {
    return {
      inputValue: null,
    };
  },
  validations() {
    return { inputValue: this.rules };
  },
  computed: {
    $v() {
      return useVuelidate(this.rules, this.inputValue);
    },
  },
  watch: {
    inputValue() {
      this.$emit("changeValue", this.name, this.inputValue);
    },
  },
  mounted() {
    if (Object.keys(this.rules).length)
      this.$emit("changeValue", this.name, false);
  },
};
</script>

<style lang="scss" scoped></style>
