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
    />
    <!-- 
    <div class="select custom-input">
      <span @click="openSelect">Лечащий врач</span>
      <div class="options">
        <div class="item">Иванов</div>
        <div class="item">Захаров</div>
        <div class="item">Чернышева</div>
      </div>
    </div> -->

    <div class="checkbox">
      <input type="checkbox" class="custom-input" />
      <span class="text-checkbox">Не отправлять СМС</span>
    </div>
  </div>
</template>

<script>
import appInput from "./app-input.vue";
import appSelect from "./app-select.vue";
import { required, maxLength } from "@vuelidate/validators";

export default {
  components: { appInput, appSelect },
  data() {
    return {
      isOpen: false,
      fieldsList: [
        {
          component: "appInput",
          placeholder: "Фамилия*",
          rules: { required, maxLength: maxLength(10) },
        },
        {
          component: "appInput",
          placeholder: "Имя*",
          rules: { required, maxLength: maxLength(10) },
        },
        {
          component: "appInput",
          placeholder: "Отчество",
          rules: { required, maxLength: maxLength(10) },
        },
        {
          component: "appInput",
          placeholder: "Дата рождения*",
          rules: { required, maxLength: maxLength(10) },
        },
        {
          component: "appInput",
          placeholder: "Номер телефона*",
          rules: { required, maxLength: maxLength(10) },
        },
        {
          component: "appSelect",
          placeholder: "Пол",
          rules: { required, maxLength: maxLength(10) },
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
          component: "appSelect",
          placeholder: "Группа клиентов*",
          rules: { required, maxLength: maxLength(10) },
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
          rules: { required, maxLength: maxLength(10) },
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
      ],
    };
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
