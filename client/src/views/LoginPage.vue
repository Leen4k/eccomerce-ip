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
    const toast = useToast();

    const store = useUserStore();
    // const {loading} = store;
    const router = useRouter();
    console.log(store.userState);

    if (Object.keys(store.userState || {}).length === 0) {

    } else {
        router.push("/");
    }

    // const showSuccess = () => {
    // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Message Content', life: 5000 });
    // };

    const googleSignIn = async (e) => {
        e.preventDefault();
        store.loading = true;
        try{
            const provider = new GoogleAuthProvider(); 
            console.log(provider);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const {user} = result;
            store.setUser(user);
            router.push("/");
            store.showSuccess("login successful","sucessfully authenticated with Google");
            return user;
        }catch (e) {
            console.log(e);
            store.showError("Error",e.code)
        }finally{
            store.loading = false;
        }
    }

    const facebookSignIn = async (e) => {
        e.preventDefault();
        store.loading = true;
        try{
            const provider = new FacebookAuthProvider(); 
            console.log(provider);
            const result = await signInWithPopup(auth, provider);
            console.log(result);
            const {user} = result;
            store.setUser(user)
            router.push("/");
            return user;
        }catch (e) {
            console.log(e);
        }finally{
            store.loading = false;
        }
    }
    store.loading = false;

</script>
<template>
    <section class="max-h-screen overflow-y-hidden grid grid-cols-2 grid-flow-col">
        <!-- <Loading v-if="store.loading" /> -->
        <div class="col-span-1 absolute inset-0 md:relative h-screen">
            <img :src="img1" class="object-cover absolute top-48 md:top-38 lg:top-0" alt="">
            <img :src="logo" class="w-32 md:w-auto z-[2000] top-12 md:top-1/2 -translate-y-1/2 absolute" alt="">
        </div>
        <div class="col-span-2 md:col-span-1 z-[1000] h-screen md:h-full justify-center items-center flex flex-col gap-0">
            <div>
                <AuthenticationFormVue />
            </div>
            <div class="flex flex-col gap-2 p-4 justify-center items-center">
                signup with:
                <div class="flex gap-2">
                    <a @click="googleSignIn" class="w-10 aspect-square" href=""><img :src="google" alt=""></a>
                    <a @click="facebookSignIn" class="w-10 aspect-square" href=""><img :src="facebook" alt=""></a>
                    <a class="w-10 aspect-square" href=""><img :src="x" alt=""></a>
                </div>
            </div>
        </div>
    </section>
</template>

