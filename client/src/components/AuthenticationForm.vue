<script setup>
    import Button from '../components/Button.vue'
    import img from "../assets/user-286 1.png"
    import { useRoute } from "vue-router";
    import locker from "../assets/locked-14 2.png"
    import { ref, onMounted, onUnmounted, computed } from 'vue';
    import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
    import { createUserWithEmailAndPassword } from 'firebase/auth';
    import {auth} from "../firebase";
    import { useUserStore } from "../stores/authStore";
    import { useRouter } from "vue-router";
    import Loading from "../components/Loading.vue";
    import axios from 'axios';

    const router = useRoute();
    const navigate = useRouter();
    const userName = ref("");
    const email = ref("");
    const password = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");
    const store = useUserStore();
    const errorMessage = ref(null);
    const successMessage = ref(null);
    const resetCode = ref(null);
    const resetTokenUrl = ref(router.query.token);
    const showPassword = ref(true);

    const toggleShowPassword = () => {
        showPassword.value = !showPassword.value;
    }

    const registerUser = (e) => {    
        e.preventDefault();
        store.loading = true;
        // Trim input values
        const emailValue = email.value.trim();
        const passwordValue = password.value.trim();
        const confirmPasswordValue = confirmPassword.value.trim();

        // Basic validation
        if (!emailValue || !passwordValue || !confirmPasswordValue || !userName.value) {
            store.showError("Error", "All fields are required.");
            return;
        }

        // Additional validation for the email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailValue)) {
            store.showError("Error", "Invalid email address.");
            return;
        }

        // Additional validation for the password length
        if (passwordValue.length < 6) {
            store.showError("Error", "Password must be at least 6 characters long.");
            return;
        }

        // Check if password and confirm password match
        if (passwordValue !== confirmPasswordValue) {
            store.showError("Error", "Passwords do not match.");
            return;
        }

        // Your API request with Axios
        axios.post("/api/v1/auth/signup", {
            email: emailValue,
            password: passwordValue,
            username: userName.value,
            first_name: "",
            last_name: "",
            // Add other necessary data to be sent to the server
        })
        .then(() => {
            store.showSuccess("Registration successful", `Welcome ${emailValue}`);
        })
        .catch((error) => {
            console.log(error);
            errorMessage.value = error.code;
            store.showError("Error", error.code);
        });
        store.loading = false;
    }

                // createUserWithEmailAndPassword(auth, email.value, password.value)
            // .then((userCredential) => {
            //     // Signed up 
            //     const user = userCredential.user;
            //     console.log(user);
            //     store.showSuccess("register successful",`Welcome ${email.value}`)
            //     // ...
            // })

    const signin = async (e) => {
        e.preventDefault();
        store.loading = true; // Set loading to true when logging out
        // setTimeout(() => {
        //     store.loading = false; 
        // }, 5000);

        //firebase method:
             // const data = await signInWithEmailAndPassword(auth, email.value, password.value);
            // console.log(data);
            // store.setUser(data.user);
            // navigate.push("/");
            // store.showSuccess("signin successful",`Welcome ${email.value}`)
            // return data.user;

        try{
            const {data} = await axios.post("/api/v1/auth/signin",{email:email.value,password:password.value});
            console.log(data);
            store.setToken(data);
            const token = store.getCookie("token");
            store.fetchUserProfile(token);
            navigate.push("/");
            store.showSuccess("signin successful",`Welcome ${data.token}`)
        }catch(error){
            console.log(error.response.data);
            store.showError("Error",!(error?.response?.data?.error) && error);
        }finally{
            store.loading = false;
        }
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        // const auth = getAuth();
        // console.log(auth.currentUser);
        // console.log(email.value);
        // console.log(password.value);     
        // sendPasswordResetEmail(auth, email.value)
        store.loading = true;
        try {
            const response = await axios.post(`/api/v1/auth/reset-password?email=${email.value}`);
            console.log(response.data.resetToken);
            successMessage.value = `reset password link has been sent to ${email.value}`;
            navigate.push(`/forget-password/confirm`);
            store.showSuccess("Success", successMessage.value);
        } catch (error) {
            console.error(error);
            store.showError("Error", error);
        } finally {
            store.loading = false;
        }
    }

    const confirmResetPassword = (e) =>{
        e.preventDefault();
        // Validate form
        if (!resetCode.value) {
            store.showError("Error", "Reset Code is required.");
            return;
        }

        if (!newPassword.value || !confirmPassword.value) {
            store.showError("Error", "New Password and Confirm Password are required.");
            return;
        }

        if (newPassword.value !== confirmPassword.value) {
            store.showError("Error", "New Password and Confirm Password must match.");
            return;
        }
        const token = resetCode.value;
        axios.post(`/api/v1/auth/reset-password/confirm?token=${token}&newPassword=${newPassword.value}`).then((res)=>{
            console.log(res);
            navigate.push("/login")
            store.showSuccess("Success",res)
        }).catch((err)=>{
            console.log(err);
            store.showError("Error", err);
        })
    }

    const copyToClipboard = () => {
        // Select the input field
        const inputField = document.getElementById('resetTokenInput');
        
        // Select the text in the input field
        inputField.select();
        inputField.setSelectionRange(0, 99999); // For mobile devices

        // Copy the selected text to the clipboard
        document.execCommand('copy');

        // Deselect the input field
        inputField.setSelectionRange(0, 0);
        store.showSuccess("Code Copied Succesfully", "Please use this code to reset the password");
    }





</script>
<template>
    <form action="" class="bg-secondary rounded-xl w-[350px] mx-auto p-8 flex flex-col gap-4">
        <img :src="img" v-if="router.path === '/login'" class="m-auto w-24 h-24" alt="">
        <img :src="locker" v-if="router.path === '/register' || router.path.includes(`forget-password`)" class="m-auto w-24 h-24" alt="">
        <h1 v-if="router.path === '/login'" class="text-2xl text-center">Login</h1>
        <h1 v-if="router.path === '/register'" class="text-2xl text-center">Register</h1>
        <h1 v-if="router.path.includes(`/forget-password`)" class="text-2xl text-center">Change Password</h1>
        <div v-if="router.path === '/register'" class="flex flex-col gap-1">
            <label for="" class="px-2">Username:</label>
            <input v-model="userName" type="text" class="p-2 rounded-xl shadow-2xl text-sm" placeholder="Username">
        </div>
        <div class="flex flex-col gap-1" v-if="router.path !== 'forget-password/confirm'">
            <label for="" class="px-2 text-slate-500">Email:</label>
            <input v-model="email" type="text" class="p-2 rounded-xl shadow-2xl text-sm" placeholder="Email">
        </div>
        <div class="flex flex-col gap-1" v-if="router.path !== '/forget-password' && router.path !== '/forget-password/confirm'">
            <label for="" class="px-2 text-slate-500">Password:</label>
            <span class="flex flex-col relative">
                <img @click="toggleShowPassword" src="https://static.thenounproject.com/png/3565505-200.png" class="w-6 cursor-pointer hover:scale-110 absolute right-1 bottom-[.38rem]" alt="">
                <input v-model="password" :type="showPassword?'password':'text'" class="p-2 rounded-xl shadow-2xl text-sm" placeholder="Password">
            </span>
        </div>
        <div class="flex flex-col gap-1" v-if="router.path === '/forget-password/confirm'">
            <label for="" class="px-2 text-slate-500">Reset Code</label>
            <input v-model="resetCode" type="text" class="p-2 rounded-xl shadow-2xl text-sm" placeholder="Reset Code">
        </div>
        <div class="flex flex-col gap-1" v-if="router.path === '/register'">
            <label for="" class="px-2 text-slate-500">Confirm Password:</label>
            <span class="flex flex-col relative">
                <img @click="toggleShowPassword" src="https://static.thenounproject.com/png/3565505-200.png" class="w-6 cursor-pointer hover:scale-110 absolute right-1 bottom-[.38rem]" alt="">
                <input v-model="confirmPassword" :type="showPassword?'password':'text'" class="p-2 rounded-xl shadow-2xl text-sm" placeholder="Confirm Password">
            </span>
        </div>
        <div class="flex flex-col gap-1" v-if="router.path === '/forget-password/confirm'">
            <label for="" class="px-2 text-slate-500">New Password:</label>
            <span class="flex flex-col relative">
                <img @click="toggleShowPassword" src="https://static.thenounproject.com/png/3565505-200.png" class="w-6 cursor-pointer hover:scale-110 absolute right-1 bottom-[.38rem]" alt="">
                <input v-model="newPassword" :type="showPassword?'password':'text'" class="p-2 rounded-xl shadow-2xl text-sm" placeholder="New Password">
            </span>
        </div>
        <div class="flex flex-col gap-1" v-if="router.path === '/forget-password/confirm'">
            <label for="" class="px-2 text-slate-500">Confirm Password:</label>
            <input v-model="confirmPassword" type="password" class="p-2 rounded-xl shadow-2xl text-sm" placeholder="New Password">
        </div>
        <a v-if="router.path !== '/forget-password' && router.path !== '/register' && router.path !== '/forget-password/confirm'" href="/forget-password" class="text-xs self-end pr-2 hover:underline hover:text-primary transition-all">Forget Password?</a>
        <Button @click="signin" v-if="router.path === `/login`" class="w-32 m-auto" text="Sign In" :isPrimary="true" icon="hello" :isDisabled="store.loading" />
        <Button @click="registerUser" v-if="router.path === `/register`" class="w-32 m-auto" text="Register" :isPrimary="true" icon="hello" :isDisabled="store.loading" />
        <Button @click="resetPassword" v-if="(router.path === '/forget-password')" class="w-32 m-auto" text="Reset" :isPrimary="true" icon="hello" :isDisabled="store.loading" />
        <Button @click="confirmResetPassword" v-if="(router.path.includes(`/forget-password/confirm`))" class="w-32 m-auto" text="Confirm" :isPrimary="true" icon="hello" :isDisabled="store.loading" />
        <!-- <span class="text-center text-red-500 hover:underline">{{ errorMessage && errorMessage }}</span>
        <span class="text-center text-primary hover:underline">{{ successMessage && successMessage }}</span> -->
    </form>
    <section v-if="router.path === '/reset-password'" class="h-screen css-selector">
    <div class="h-screen z-[10000] fixed inset-0 overflow-y-hidden grid grid-cols-1 grid-flow-col place-items-center bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20">    
        <article class="flex flex-col justify-center bg-secondary h-[500px] w-[400px] rounded-lg p-8">
            <div class="flex flex-col gap-4">
                <img src="https://1000logos.net/wp-content/uploads/2021/05/Gmail-logo.png" alt="">
                <h1 class="text-3xl font-bold text-center">Magic reset password</h1>
                <p class="text-center text-slate-600">copy this code to reset your password</p>
                <input class="p-2 w-full rounded-md" readonly id="resetTokenInput" v-model="resetTokenUrl" name="" cols="30" rows="10" />
                <Button class="w-32 mx-auto" @click="copyToClipboard" text="Copy" :isPrimary="true" icon="hello" :isDisabled="store.loading" />
            </div>
        </article>
    </div>
     </section>
</template>

