<template>
    <div class="h-screen w-screen flex items-center justify-center absolute z-[1000] bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">
        <ProgressSpinner class="" style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
        animationDuration=".5s" aria-label="Custom ProgressSpinner" />
    </div>
</template>
<script setup>
  import ProgressSpinner from 'primevue/progressspinner';
</script>