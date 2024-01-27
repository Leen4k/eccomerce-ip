//ousa
<script setup>
    import Button from "./Button.vue";
    defineProps({
        id: Number,
        title: String,
        image: String,
        price: Number,
        category: String
    })
</script>
<template>

    <article class="flex flex-col gap-4 bg-secondary overflow-hidden rounded-xl h-[450px] p-4">
        <div class="flex w-full overflow-hidden">
            <img 
                :src="image" 
                alt="product image"
                class="object-center object-cover hover:scale-125 transition-all flex-1 h-[300px]"
            >
        </div>
        <div class="flex flex-col justify-center h-[100px]">
            <a :href="`product/${id}`" class="font-bold hover:underline hover:font-bold">{{ title.slice(0,30) }} <span v-if="title.length>30">...</span></a>
            <p class="text-primary">{{ category }}</p>
            <span class="flex justify-between">
                <p><span>$ </span>{{ price }}</p>
                <Button text="Add" :isPrimary="true" icon="hello"  />
            </span>
        </div>
    </article>
</template>


