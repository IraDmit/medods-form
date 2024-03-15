<template>
  <div class="step">
    <h2 class="titleStep active" @click="slideToggle($event.target)">
      01. Основная информация
      <img src="../assets/img/icon-arrow-down.png" alt="arrow-down" />
    </h2>
    <div class="wrp">
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
      <div class="btn-wrp">
        <div class="btn" @click="toNextStep">Далее</div>
      </div>
    </div>
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
import accordion from "../mixins/accordion.js";

export default {
  mixins: [accordion],
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
  computed: {
    isValid() {
      return !Object.values(this.stepData).includes("not valid");
    },
  },
  methods: {
    changeValue(key, value) {
      this.$set(this.stepData, key, value);
    },
    toNextStep() {
      this.showErrors = true;

      if (this.isValid) {
        this.$emit("changeStep", "firstStep", "secondStep");
      }
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
