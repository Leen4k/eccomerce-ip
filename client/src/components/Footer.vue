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
    const shopping = [
       {
        title:"Shopping",
        forgetPassword:"women",
        shippingRate:"men",
        returnPolicy:"Gift Card",
        AboutProposition:"sport",
       }
    ]

    const myAccount = [
    {
        title: "My Account",
        forgetPassword: "Login/Register",
        shippingRate: "My Account",
        returnPolicy: "Order Status",
        AboutProposition: "Order History",
        FAQ: "Track My Order"
    }
];

const myInformation = [
    {
        title: "My Information",
        forgetPassword: "About",
        shippingRate: "Site map",
        returnPolicy: "Coupon",
        AboutProposition: "Find us on"
    }
];
</script>
<template>
    <footer class="bg-primary text-white grid xl:grid-cols-4 py-8 mt-8">
        <div class="text-center px-8" :key="index" v-for="(item,index) in customerService">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2 hover:underline">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.shippingRate }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.FAQ }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.ContactInfo }}</p>
        </div>
        <div class="text-center px-8" :key="index" v-for="(item,index) in shopping">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2 hover:underline">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.shippingRate }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.FAQ }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.ContactInfo }}</p>
        </div>
        <div class="text-center px-8" :key="index" v-for="(item,index) in myAccount">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2 hover:underline">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.shippingRate }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.FAQ }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.ContactInfo }}</p>
        </div>
        <div class="text-center px-8" :key="index" v-for="(item,index) in myInformation">
           <h3 class="text-xl my-4">{{ item.title }}</h3>
           <p class="text-sm my-2 hover:underline">{{ item.forgetPassword }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.shippingRate }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.returnPolicy }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.AboutProposition }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.FAQ }}</p>
           <p class="text-sm my-2 hover:underline">{{ item.ContactInfo }}</p>
        </div> 
    </footer>
    <div class="bg-primary text-white grid grid-cols-1 justify-center items-center md:grid-cols-2 place-items-center">
        <span>Find us on</span>
        <div class="grid grid-cols-3 text-center gap-4 divide-x">
            <p>Term Of Us</p>
            <p>Privacy Policy</p>
            <p class="pl-8">Interest Based Ads</p>
        </div>
    </div>
    <div class="bg-primary py-8 text-white">
        <div class="m-auto text-center">2024 @Lutus.com</div>
    </div>

</template>