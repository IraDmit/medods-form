<template>
  <div class="step">
    <h2 class="titleStep">01. Основная информация</h2>
    <component
      v-for="(field, idx) in fieldsList"
      :key="'step1field' + idx"
      :is="field.component"
      :placeholder="field.placeholder"
      :rules="field.rules"
      :options="field.options"
      :name="field.name"
      :showErrors="showErrors"
      @changeValue="changeValue"
    />
    <div class="btn" @click="toNextStep">Далее</div>
  </div>
</template>

<script>
import appInput from "./fields/app-input.vue";
import appSelect from "./fields/app-select.vue";
import appMultiSelect from "./fields/app-multiSelect.vue";
import appPhone from "./fields/app-phone.vue";
import appDate from "./fields/app-date.vue";
import { required } from "@vuelidate/validators";
import appCheckbox from "./fields/app-checkbox.vue";

export default {
  components: {
    appInput,
    appSelect,
    appPhone,
    appDate,
    appMultiSelect,
    appCheckbox,
  },
  data() {
    return {
      isOpen: false,
      fieldsList: [
        {
          component: "appInput",
          placeholder: "Фамилия*",
          rules: { required },
          name: "lastName",
        },
        {
          component: "appInput",
          placeholder: "Имя*",
          rules: { required },
          name: "name",
        },
        {
          component: "appInput",
          placeholder: "Отчество",
          rules: {},
          name: "thirdName",
        },
        {
          component: "appDate",
          placeholder: "Дата рождения*",
          rules: { required },
          name: "dateOfBitrh",
        },
        {
          component: "appPhone",
          placeholder: "Номер телефона*",
          rules: { required },
          name: "phone",
        },
        {
          component: "appSelect",
          placeholder: "Пол",
          rules: {},
          name: "sex",
          options: [
            {
              item: "Мужской",
            },
            {
              item: "Женский",
            },
          ],
        },
        {
          component: "appMultiSelect",
          placeholder: "Группа клиентов*",
          rules: { required },
          name: "groupClient",
          options: [
            {
              item: "VIP",
            },
            {
              item: "Проблемные",
            },
            {
              item: "ОМС",
            },
          ],
        },
        {
          component: "appSelect",
          placeholder: "Лечащий врач",
          rules: {},
          name: "doctor",
          options: [
            {
              item: "Иванов",
            },
            {
              item: "Захаров",
            },
            {
              item: "Чернышева",
            },
          ],
        },
        {
          component: "appCheckbox",
          name: "isCall",
          rules: {},
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
  computed: {
    isValid() {
      return !Object.values(this.stepData).includes("not valid");
    },
  },
  watch: {
    stepData: {
      handler() {
        this.$emit("updateFirstStep", this.stepData, this.isValid);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
