<template>
  <div id="app" class="container">
    <div class="steps">
      <first-step
        @updateFirstStep="updateFirstStep"
        @changeStep="changeStep"
        ref="firstStep"
      />
      <second-step
        @updateSecondStep="updateSecondStep"
        @changeStep="changeStep"
        ref="secondStep"
      />
      <third-step
        @updateThirdStep="updateThirdStep"
        @changeStep="changeStep"
        ref="thirdStep"
      />
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
import accordion from "./mixins/accordion.js";

export default {
  components: { firstStep, SecondStep, ThirdStep, AsideForm, modalSuccess },
  mixins: [accordion],
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
      if (this.isAllStepsValid) {
        this.complete();
      } else {
        const steps = [
          {
            ref: this.$refs.firstStep,
            isValid: this.firstStepValid,
            isHidden:
              this.$refs.firstStep.$el.querySelector("h2").nextElementSibling
                .hidden,
          },
          {
            ref: this.$refs.secondStep,
            isValid: this.secondStepValid,
            isHidden:
              this.$refs.secondStep.$el.querySelector("h2").nextElementSibling
                .hidden,
          },
          {
            ref: this.$refs.thirdStep,
            isValid: this.secondStepValid,
            isHidden:
              this.$refs.thirdStep.$el.querySelector("h2").nextElementSibling
                .hidden,
          },
        ];

        steps.forEach((el) => {
          if (el.isHidden && !el.isValid) {
            this.slideDown(el.ref.$el.querySelector("h2"));
          }
          el.ref.showErrors = true;
        });
      }
    },
    changeStep(currentStep, nextStep) {
      const current = this.$refs[currentStep].$el.querySelector("h2");
      const next = this.$refs[nextStep].$el.querySelector("h2");
      this.slideUp(current);
      if (!next) return;
      this.slideDown(next);
    },
  },
};
</script>

<style scoped>
#app {
  display: grid;
  grid-template-columns: 0.8fr 0.2fr;
  grid-gap: 20px;
  @media (max-width: 991px) {
    grid-template-columns: 0.7fr 0.3fr;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
