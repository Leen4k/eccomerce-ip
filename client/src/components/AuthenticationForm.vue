<script>
    import Button from '../components/Button.vue'
    import img from "../assets/user-286 1.png"
    export default {
        components: {
            Button
        },
        data(){
            return{img}
        }
    }
</script>
<template>
    <form action="" class="bg-secondary rounded-xl p-8 flex flex-col gap-4">
        <img :src="img" class="m-auto w-24 h-24" alt="">
        <h1 class="text-3xl text-center">Login</h1>
        <div class="flex flex-col gap-1">
            <label for="" class="px-2">Email:</label>
            <input type="text" class="p-2 rounded-xl shadow-2xl" placeholder="Email">
        </div>
        <div class="flex flex-col gap-1">
            <label for="" class="px-2">Password:</label>
            <input type="text" class="p-2 rounded-xl shadow-2xl" placeholder="Password">
        </div>
        <Button class="w-32 m-auto" text="Sign In" :isPrimary="true" icon="hello" />
    </form>
</template>

