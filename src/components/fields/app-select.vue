<template>
  <div class="form-field" @click="isOpen = !isOpen">
    <span class="placeholder">{{ placeholder }}</span>
    <div class="select">
      <span @click="isOpen = !isOpen" :class="{ selected: inputValue }">{{
        inputValue || placeholder
      }}</span>
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
      $v.value[key].$invalid && showErrors ? $v.value[key].$message : ""
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
    showErrors: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      inputValue: null,
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
      this.open = !this.isOpen;
      this.inputValue = e.target.innerHTML;
    },
    handleClickOutside({ target }) {
      console.log(target);
      if (target && !target.classlist?.contains("select")) this.isOpen = false;
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
  span {
    pointer-events: none;
    &.selected {
      color: #000;
    }
  }
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
    .item {
      padding: 7px 0px;
    }
    .item:hover {
      color: #000;
    }
    &.open {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
