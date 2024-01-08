<script setup>
    // import Button from './components/Button.vue';
    import { useRoute } from 'vue-router';
    import ProductCard from './components/ProductCard.vue'
    const route = useRoute();
    console.log(route.path);

    
</script>

<template>
    <ProductCard 
    Image='./src/assets/facebook.png' 
    title="Hello" 
    subTitle="Your step with powerful" 
    price="$160" 
    addButton="Add"
    >
    </ProductCard>
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

<script>
export default {
        name: 'App',
        ProductCard : [
            {
                image: "hi",
                title: "Hello from ousa",
                subTitle: 'ousa again',
                price: "$160",
                addButton: "add",   
            },
    ],
    }
</script>