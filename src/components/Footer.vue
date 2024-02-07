<script setup>
    const customerService = [
        {
            title:"Customer Service",
            forgetPassword:"forgetPassword",
            shippingRate:"shippingRate",
            returnPolicy:"returnPolicy",
            AboutProposition:"aboutProposition",
            FAQ:"FAQ",
            ContactInfo:"contactInfo",
        }
    ]
</script>
<template>
    <footer class="bg-primary text-white grid xl:grid-cols-4 py-8 mt-8">
        <div class="text-center px-8" :key="index" v-for="(item,index) in customerService">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2">{{ item.shippingRate }}</p>
           <p class="text-sm my-2">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2">{{ item.FAQ }}</p>
           <p class="text-sm my-2">{{ item.ContactInfo }}</p>
        </div>
        <div class="text-center px-8" :key="index" v-for="(item,index) in customerService">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2">{{ item.shippingRate }}</p>
           <p class="text-sm my-2">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2">{{ item.FAQ }}</p>
           <p class="text-sm my-2">{{ item.ContactInfo }}</p>
        </div>
        <div class="text-center px-8" :key="index" v-for="(item,index) in customerService">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2">{{ item.shippingRate }}</p>
           <p class="text-sm my-2">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2">{{ item.FAQ }}</p>
           <p class="text-sm my-2">{{ item.ContactInfo }}</p>
        </div>
        <div class="text-center px-8" :key="index" v-for="(item,index) in customerService">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2">{{ item.shippingRate }}</p>
           <p class="text-sm my-2">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2">{{ item.FAQ }}</p>
           <p class="text-sm my-2">{{ item.ContactInfo }}</p>
        </div> 
    </footer>
    <div class="bg-primary text-white grid grid-cols-2 place-items-center">
        <span>Find us on</span>
        <div class="grid grid-cols-3 text-center gap-4 divide-x">
            <span>Term Of Us</span>
            <span>Privacy Policy</span>
            <span class="text-right">Interest Based Ads</span>
        </div>
    </div>
    <div class="bg-primary py-8 text-white">
        <div class="m-auto text-center">2024 @Lutus.com</div>
    </div>

</template>