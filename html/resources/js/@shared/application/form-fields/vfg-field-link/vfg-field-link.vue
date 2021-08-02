<template>
    <link-button
      :route="value"
    />
</template>

<script>
const VueFormGenerator = require('vue-form-generator');
const {abstractField} = VueFormGenerator;
export default {
    mixins: [abstractField],
}
</script>
