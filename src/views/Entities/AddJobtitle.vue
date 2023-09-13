<script setup>
</script>
<template>
    <MultiSelect v-model="selectedCities" display="chip" :options="cities" optionLabel="name" placeholder="Select Cities"
    :maxSelectedLabels="3" class="w-full md:w-20rem" />

</template>