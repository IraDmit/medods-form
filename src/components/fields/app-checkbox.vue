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
    rules: {
      type: Object,
      default: () => {},
    },
    showErrors: {
      type: Boolean,
      default: false,
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
    if (this.rules?.required) {
      this.$emit("changeValue", this.name, "not valid");
    } else {
      this.$emit("changeValue", this.name, false);
    }
  },
};
</script>

<style lang="scss" scoped>
.checkbox {
  display: flex;
  grid-gap: 11px;
  align-items: center;
  margin: 10px 0;
  label {
    cursor: pointer;
  }
}
</style>
