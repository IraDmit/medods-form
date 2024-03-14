<template>
  <div class="form-field">
    <div class="select" @click="isOpen = !isOpen">
      <span @click="isOpen = !isOpen" v-if="!inputValue.length">{{
        placeholder
      }}</span>
      <div class="selectValues" v-else>
        <div
          class="value"
          v-for="(val, idx) in inputValue"
          :key="'value' + idx"
          @click="deleteValue($event)"
        >
          {{ val }}
          &times;
        </div>
      </div>
      <div class="options" :class="{ open: isOpen }">
        <div
          class="item"
          v-for="(option, idx) in options"
          :key="'option' + idx"
          @click="selectValue($event)"
        >
          {{ option.item }}
        </div>
      </div>
    </div>
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
    options: {
      type: Array,
      default: () => {},
    },
    name: {
      type: String,
      default: "field",
    },
  },
  data() {
    return {
      inputValue: [],
      isOpen: false,
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
  methods: {
    selectValue(e) {
      if (this.inputValue.includes(e.target.innerHTML)) return;
      this.inputValue.push(e.target.innerHTML);
    },
    deleteValue(e) {
      this.inputValue.splice(this.inputValue.indexOf(e.target.innerHTML), 1);
    },
  },
  watch: {
    inputValue() {
      this.$emit("changeValue", this.name, this.inputValue);
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  cursor: pointer;
  position: relative;
  border-radius: 10px;
  padding: 15px 20px;
  max-width: 675px;
  width: 100%;
  background: #f5f4f9;
  color: #949494;
  .options {
    position: absolute;
    top: 90%;
    transform: translateY(10px);
    left: 0;
    background-color: #f5f4f9;
    border-radius: 10px;
    padding: 15px 20px;
    width: 100%;
    opacity: 0;
    visibility: hidden;
    border: 1px solid #d9d9d9;
    background-color: #fff;
    z-index: 2;
    .option:hover {
      color: #000;
    }
    &.open {
      opacity: 1;
      visibility: visible;
    }
  }
  .selectValues {
    display: flex;
    grid-gap: 12px;
    .value {
      background-color: #fff;
      padding: 3px 5px;
      border-radius: 7px;
      border: 1px solid #d9d9d9;
    }
  }
}
</style>
