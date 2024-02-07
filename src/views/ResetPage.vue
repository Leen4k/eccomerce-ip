<template>
     <section class="h-screen css-selector">
    <div class="h-screen fixed inset-0 overflow-y-hidden grid grid-cols-1 grid-flow-col place-items-center bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">    
        <article class="bg-secondary h-[500px] w-[400px] rounded-lg">
            
        </article>
    </div>
     </section>
</template>

<script setup>
    import img1 from "../assets/Untitled design (4) 1.png";
    import logo from "../assets/Rectangle 2.png"
    import google from "../assets/google.png";
    import facebook from "../assets/facebook.png"
    import x from "../assets/x.png"
    import AuthenticationFormVue from "../components/AuthenticationForm.vue";
    import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
    import {auth} from "../firebase";
    import { useUserStore } from "../stores/authStore";
    import { useRouter } from "vue-router";
    import Loading from "../components/Loading.vue";
    import Toast from 'primevue/toast';
    import { useToast } from 'primevue/usetoast';
</script>

<style scoped>
    .css-selector {
    background: linear-gradient(270deg, #e2d7ff, #470ced);
    background-size: 400% 400%;

    -webkit-animation: AnimationName 0s ease infinite;
    -moz-animation: AnimationName 0s ease infinite;
    animation: AnimationName 0s ease infinite;
}

@-webkit-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@-moz-keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
@keyframes AnimationName {
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
}
</style>