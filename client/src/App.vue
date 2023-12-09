<script setup>
    import Button from './components/Button.vue';
    import { useRoute } from 'vue-router';
    const route = useRoute();
    console.log(route.path);
</script>

<template>
    <section>
        <nav v-if="route.path !== '/login'" class="flex justify-between">
            <span>Logo</span>
            <div class="flex gap-2">
                <Button text="Hello" :isPrimary="true" icon="hello"  />
                <Button text="Secondary..." :isPrimary="false" icon="hello"  />
            </div>
        </nav>
        <router-view />
    </section>
</template>

