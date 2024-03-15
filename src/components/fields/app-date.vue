<template>
  <div class="form-field">
    <span class="placeholder">{{ placeholder }}</span>
    <input
      type="text"
      v-date="'##.##.####'"
      :placeholder="placeholder"
      v-model="inputValue"
    />

    <span class="error" v-for="(item, key) in rules" :key="key">{{
      $v.value[key].$invalid && showErrors && isValidDate
        ? $v.value[key].$message
        : ""
    }}</span>
  </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
// eslint-disable-next-line no-unused-vars
import { required, maxLength } from "@vuelidate/validators";
export default {
  directives: {
    date: {
      bind(el) {
        el.addEventListener("keyup", function () {
          let $this = el;
          let mydate = $this.value;
          mydate = mydate.replace(/\D|\s/, "");
          mydate = mydate.replace(/^(00)(.*)?/, "01$2");
          mydate = mydate.replace(/^([0-9]{2})(00)(.*)?/, "$101");
          mydate = mydate.replace(/^([3-9])([2-9])(.*)?/, "2$2");
          mydate = mydate.replace(/^(3[01])(02)(.*)?/, "29$2");
          mydate = mydate.replace(/^([0-9]{2})([2-9]|1[3-9])(.*)?/, "$112");
          mydate = mydate.replace(
            /^([0-9]{2})([0-9]{2})([0-9].*?)/,
            "$1/$2/$3"
          );
          mydate = mydate.replace(/^([0-9]{2})([0-9])/, "$1/$2");

          // Check for leap year
          let day = mydate.substr(0, 2) || "01";
          let month = mydate.substr(3, 2) || "01";
          let year = mydate.substr(6, 4);

          if (
            year.length === 4 &&
            day === "29" &&
            month === "02" &&
            (year % 4 !== 0 || (year.substr(2, 2) === "00" && year % 400 !== 0))
          ) {
            mydate = mydate.replace(/^29/, "28");
          }

          mydate = mydate.substr(0, 10);
          $this.value = mydate;
        });
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
    showErrors: {
      type: Boolean,
      default: false,
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
      if (this.rules?.required && this.$v.value.$invalid) {
        this.$emit("changeValue", this.name, "not valid");
      } else {
        this.$emit("changeValue", this.name, this.inputValue);
      }
    },
  },
  mounted() {
    if (this.rules?.required) this.$emit("changeValue", this.name, "not valid");
  },
};
</script>

<style lang="scss" scoped></style>
