<template>
  <div class="step">
    <h2 class="titleStep">02. Адрес</h2>
    <component
      v-for="(field, idx) in fieldsList"
      :key="'step2field' + idx"
      :is="field.component"
      :placeholder="field.placeholder"
      :rules="field.rules"
      :name="field.name"
      :showErrors="showErrors"
      @changeValue="changeValue"
    />
    <div class="btn" @click="toNextStep">Далее</div>
  </div>
</template>

<script>
import appInput from "./fields/app-input.vue";
import { required } from "@vuelidate/validators";
export default {
  components: { appInput },
  data() {
    return {
      fieldsList: [
        {
          component: "appInput",
          placeholder: "Индекс",
          rules: {},
          name: "index",
        },
        {
          component: "appInput",
          placeholder: "Страна",
          rules: {},
          name: "country",
        },
        {
          component: "appInput",
          placeholder: "Область",
          rules: {},
          name: "region",
        },
        {
          component: "appInput",
          placeholder: "Город*",
          rules: { required },
          name: "city",
        },
        {
          component: "appInput",
          placeholder: "Улица",
          rules: {},
          name: "street",
        },
        {
          component: "appInput",
          placeholder: "Дом",
          rules: {},
          name: "house",
        },
      ],
      stepData: {},
      showErrors: false,
    };
  },
  methods: {
    changeValue(key, value) {
      this.$set(this.stepData, key, value);
    },
    toNextStep() {
      this.showErrors = true;
    },
  },
  watch: {
    stepData: {
      handler() {
        this.$emit("updateSecondStep", this.stepData, this.isValid);
      },
      deep: true,
    },
  },
  computed: {
    isValid() {
      return !Object.values(this.stepData).includes("not valid");
    },
  },
};
</script>

<style lang="scss" scoped></style>
