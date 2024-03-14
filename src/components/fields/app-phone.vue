<template>
  <div class="form-field">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="inputValue"
      v-phone
    />
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
  directives: {
    phone: {
      bind(el) {
        el.oninput = function (e) {
          if (!e.isTrusted) {
            return;
          }

          const x = this.value
            .replace(/\D/g, "")
            .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);

          if (!x[2] && x[1] !== "") {
            this.value = x[1] === "7" ? x[1] : "7" + x[1];
          } else {
            this.value = !x[3]
              ? x[1] + x[2]
              : x[1] + "(" + x[2] + ") " + x[3] + (x[4] ? "-" + x[4] : "");
          }
        };
      },
    },
  },
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
};
</script>

<style lang="scss" scoped></style>
