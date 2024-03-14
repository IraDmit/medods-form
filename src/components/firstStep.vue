<template>
  <div class="step">
    <h2 class="titleStep">01. Основная информация</h2>
    <component
      v-for="(field, idx) in fieldsList"
      :key="'field' + idx"
      :is="field.component"
      :placeholder="field.placeholder"
      :rules="field.rules"
      :options="field.options"
      :name="field.name"
      @changeValue="changeValue"
    />
    <div class="btn">Далее</div>
  </div>
</template>

<script>
import appInput from "./fields/app-input.vue";
import appSelect from "./fields/app-select.vue";
import appMultiSelect from "./fields/app-multiSelect.vue";
import appPhone from "./fields/app-phone.vue";
import appDate from "./fields/app-date.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, maxLength } from "@vuelidate/validators";
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
          rules: { required, maxLength: maxLength(10) },
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
        },
      ],
      stepData: {},
    };
  },
  methods: {
    changeValue(key, value) {
      this.stepData[key] = value;
    },
  },
  computed: {
    $v() {
      return useVuelidate();
    },
  },
};
</script>

<style lang="scss" scoped>
.step {
  display: flex;
  align-items: center;
  flex-direction: column;
  grid-gap: 20px;
  .titleStep {
    font-size: 32px;
    line-height: 120%;
    color: #171414;
    font-weight: 700;
  }
  .custom-input {
    border-radius: 10px;
    padding: 15px 20px;
    max-width: 675px;
    width: 100%;
    background: #f5f4f9;
    border: unset;
    outline: none;
    color: #949494;
    &::placeholder {
      font-weight: 400;
      font-size: 16px;
      line-height: 120%;
      color: #949494;
    }
  }
  .select {
    cursor: pointer;
    position: relative;
    .options {
      position: absolute;
      bottom: -65px;
      left: 0;
      background-color: #f5f4f9;
      border-radius: 10px;
      padding: 15px 20px;
      width: 100%;
      opacity: 0;
      visibility: hidden;
      .option:hover {
        color: #000;
      }
      &.open {
        opacity: 1;
        visibility: visible;
      }
    }
  }
}
</style>
