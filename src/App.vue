<template>
  <div id="app">
    <first-step @updateFirstStep="updateFirstStep" />
  </div>
</template>

<script>
import firstStep from "./components/firstStep.vue";
export default {
  components: { firstStep },
  data() {
    return {
      firstStep: null,
      firstStepValid: false,
    };
  },
  methods: {
    updateFirstStep(data, isValid) {
      this.firstStep = data;
      this.firstStepValid = isValid;
    },
  },
};
</script>

<style scoped></style>
