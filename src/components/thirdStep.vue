<template>
  <div class="step">
    <h2 class="titleStep" @click="slideToggle($event.target)" ref="thirdStep">
      03. Паспорт
      <img src="../assets/img/icon-arrow-down.png" alt="arrow-down" />
    </h2>
    <div class="wrp" hidden>
      <component
        v-for="(field, idx) in fieldsList"
        :key="'step3field' + idx"
        :is="field.component"
        :placeholder="field.placeholder"
        :rules="field.rules"
        :options="field.options"
        :name="field.name"
        :showErrors="showErrors"
        @changeValue="changeValue"
      />
      <div class="btn-wrp">
        <div class="btn btn-black" @click="toPrevStep">Назад</div>
      </div>
    </div>
  </div>
</template>

<script>
import appInput from "./fields/app-input.vue";

import { required, maxLength, minLength, numeric } from "@vuelidate/validators";
import appSelect from "./fields/app-select.vue";
import appDate from "./fields/app-date.vue";
import accordion from "../mixins/accordion.js";
export default {
  mixins: [accordion],
  components: { appInput, appSelect, appDate },
  data() {
    return {
      fieldsList: [
        {
          component: "appSelect",
          placeholder: "Тип документа*",
          rules: { required },
          name: "typeDocument",
          options: [
            {
              item: "Паспорт",
            },
            {
              item: "Свидетельство о рождении",
            },
            {
              item: "Вод. удостоверение",
            },
          ],
        },
        {
          component: "appInput",
          placeholder: "Серия",
          rules: { maxlength: maxLength(4), minLength: minLength(4), numeric },
          name: "series",
        },
        {
          component: "appInput",
          placeholder: "Номер",
          rules: { maxlength: maxLength(6), minLength: minLength(6), numeric },
          name: "number",
        },
        {
          component: "appInput",
          placeholder: "Кем выдан",
          rules: {},
          name: "issuedBy",
        },
        {
          component: "appDate",
          placeholder: "Дата выдачи*",
          rules: { required },
          name: "dateOfIssue",
        },
      ],
      stepData: {},
      showErrors: false,
    };
  },
  computed: {
    isValid() {
      return !Object.values(this.stepData).includes("not valid");
    },
  },
  methods: {
    changeValue(key, value) {
      this.$set(this.stepData, key, value);
    },
    toPrevStep() {
      this.showErrors = true;
      if (this.isValid) this.$emit("changeStep", "thirdStep", "secondStep");
    },
  },
  watch: {
    stepData: {
      handler() {
        this.$emit("updateThirdStep", this.stepData, this.isValid);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
