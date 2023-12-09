<template>
    <section>
        <h1>Home page..</h1>
        <Rating v-model="n" :cancel="false" />
        <!-- everyone can code here: -->
        
    </section>  
</template>
<script setup>
    //importing the store 
    import {useDemoListStore} from "../stores/demoStore"
    import { storeToRefs } from "pinia";
    import Rating from 'primevue/rating';
    import { ref } from "vue";
    const n = ref(2);
    // calling the store
    const store = useDemoListStore();
    console.log(store);
    //we can destructure the variables in the store like so....
    const {demoList} = storeToRefs(store);
    console.log(demoList.value);
    //to call the function from the store we can..
    const {addTodo} = store;
    //basically if u wanna use it simply ...


    


</script>