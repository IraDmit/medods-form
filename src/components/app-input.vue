<template>
  <div class="form-field">
    <input
      type="date"
      :placeholder="placeholder"
      v-model="inputValue"
      v-if="placeholder === 'Дата рождения*'"
    />
    <input
      type="text"
      :placeholder="placeholder"
      v-model="inputValue"
      v-phone
      v-if="placeholder === 'Номер телефона*'"
    />
    <input type="text" :placeholder="placeholder" v-model="inputValue" v-else />
    <span clas="error" v-for="(item, key) in rules" :key="key">{{
      $v.value[key].$invalid
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
};
</script>

<style lang="scss" scoped>
.form-field {
  max-width: 675px;
  width: 100%;

  input {
    width: 100%;
    border-radius: 10px;
    padding: 15px 20px;
    background: #f5f4f9;
    border: unset;
    outline: none;
    color: #949494;
    transition: 0.3s ease;
    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      color: #949494;
    }
    &:focus {
      border: 1px solid #d9d9d9;
      background-color: #fff;
    }
  }
}
</style>
