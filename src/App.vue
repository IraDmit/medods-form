<template>
  <div id="app" class="container">
    <div class="steps">
      <first-step @updateFirstStep="updateFirstStep" />
      <second-step @updateSecondStep="updateSecondStep" />
      <third-step @updateThirdStep="updateThirdStep" />
    </div>
    <aside-form @tryRegister="tryRegister" />
    <modal-success v-if="isOpen" @closeModal="closeModal" />
  </div>
</template>

<script>
import firstStep from "./components/firstStep.vue";
import modalSuccess from "./components/modals/modalSuccess.vue";
import AsideForm from "./components/navigation/asideForm.vue";
import SecondStep from "./components/secondStep.vue";
import ThirdStep from "./components/thirdStep.vue";

export default {
  components: { firstStep, SecondStep, ThirdStep, AsideForm, modalSuccess },
  data() {
    return {
      firstStep: null,
      firstStepValid: false,
      secondStep: null,
      secondStepValid: false,
      thirdStep: null,
      thirdStepValid: false,
      isOpen: false,
    };
  },
  computed: {
    isAllStepsValid() {
      return this.firstStepValid && this.secondStepValid && this.thirdStepValid;
    },
  },
  methods: {
    updateFirstStep(data, isValid) {
      this.firstStep = data;
      this.firstStepValid = isValid;
    },
    updateSecondStep(data, isValid) {
      this.secondStep = data;
      this.secondStepValid = isValid;
    },
    updateThirdStep(data, isValid) {
      this.thirdStep = data;
      this.thirdStepValid = isValid;
    },
    closeModal() {
      this.isOpen = false;
    },
    async complete() {
      const allInfo = {
        ...this.firstStep,
        ...this.secondStep,
        ...this.thirdStep,
      };
      try {
        await fetch("/api", { method: "POST", body: allInfo });
        this.isOpen = true;
      } catch (error) {
        console.log(error);
      }
    },
    tryRegister() {
      console.log("123");
      if (this.isAllStepsValid) {
        this.complete();
      }
    },
  },
};
</script>

<style scoped>
#app {
  display: grid;
  grid-template-columns: 1fr 0.2fr;
}
</style>
