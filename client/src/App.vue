<script setup>
    import Button from './components/Button.vue';
    import { ref, watch, onMounted } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    console.log(route.path);
    import { useUserStore } from './stores/authStore';
    import 'primevue/resources/themes/lara-light-green/theme.css'
    import TieredMenu from 'primevue/tieredmenu';
    import Loading from "./components/Loading.vue"
    import Toast from 'primevue/toast';
    import { getAuth, signOut } from "firebase/auth";
    import axios from 'axios';
    import logo from "./assets/Rectangle 2.png"
    import Footer from './components/Footer.vue';
    import Cart from './components/Cart.vue';
    import cartLogo from "./assets/shopping-basket-19 1.png"
    import { useCartStore } from './stores/cartStore';
    import { useQuery, useQueryClient } from '@tanstack/vue-query';    
    import { useNotificationStore } from './stores/notificationStore';

    const router = useRouter();
    const store = useUserStore();
    const cartStore = useCartStore();
    const notificationStore = useNotificationStore();
    const queryClient = useQueryClient();


    const localUserInfo = ref(store.userState); // Create a local reactive variable
    const searchTerm = ref("");
    notificationStore.searchTerm = searchTerm.value;
    console.log(notificationStore.searchTerm);
    // Watch for changes in the search term
    watch(searchTerm, (newValue, oldValue) => {
        // Update the query string in the URL
        router.push({ query: { search: newValue } });

        // Log the updated query string
        console.log(router.currentRoute.value.query);
    });

    const handleSearch = () => {
        // Construct the search URL
        const searchURL = `api/products/search?name=${encodeURIComponent(searchTerm.value)}`;
        console.log(searchURL)
        axios.get(searchURL).then(({data})=>{
            store.showSuccess("you search for "+ searchTerm.value)
            console.log(data);
            queryClient.invalidateQueries('product');
        }).catch((err)=>{
            store.showError("error");
        })
    };


    const logout = () => {
        store.loading = true; // Set loading to true when logging out
        setTimeout(() => {
            store.setUser(null);
            store.setToken(null);
            window.location.reload();
            store.loading = false; 
        }, 5000);
        queryClient.invalidateQueries('getCart',{ refetchInactive: true });
        store.showSuccess("You have been logged out","successfully logged out");
    };

    watch(() => store.userState, (newValue) => {
        localUserInfo.value = { ...newValue }; // Update local reactive variable on userState change
    });

    onMounted(() => {
    if (!store.userState) {
      console.log("userState is null");
      // Usage example to get the "token" cookie
      const tokenCookie = store.getCookie('token');
      store.fetchUserProfile(tokenCookie);
      queryClient.invalidateQueries('getCart');
    }
  });
  


    const menu = ref();

    const showBrand = (label) => {
        console.log(label);
    }

    // const getProductByCategory = () => {
    //     axios.get(`/category/ca50b9f2-edb6-4b04-b477-6e5511db353c/products`).then(({data})=>{
    //         console.log(data);
    //     }).catch((err)=>{
    //         console.log(err);
    //     })
    // }

    const handleCategoryChange = (categoryId) => {
        store.showSuccess(categoryId)
        router.push({ query: { categoryId: categoryId } });
    }


    const getCategories = async () => {
        try{
            const {data} = await axios.get("/api/categories")
            console.log(data);
            let modifiedData = data.map(item => {
                return { label: item.categoryName, categoryId: item.categoryId, command: () => handleCategoryChange(item.categoryId) };
            });
            return modifiedData
        }catch(err){
            console.log(err);
        }
    }

    const {data:categories, isError, isLoading} = useQuery({
        queryKey: ['categoryKey'],
        queryFn: getCategories
    })

    const brands = ref([
        {
            label: 'Nike',
            icon: 'pi pi-file',
            command: showBrand("hi"), // Adding command to trigger the logout function
        },
    ]);

    const items = ref([
        {
            label: 'Logout',
            icon: 'pi pi-file',
            command: logout, // Adding command to trigger the logout function
        },
    ]);

    const brandMenu = ref();
    const userMenu = ref();

    const toggleBrand = (event) => {
        brandMenu.value.toggle(event);
    };

    const toggleUserMenu = (event) => {
        userMenu.value.toggle(event);
    };




</script>

<template>
    <section :class="route.path != '/login' && route.path != '/register' && route.path != '/forget-password' && route.path != '/forget-password/confirm' && route.path != '/reset-password' ? 'px-8' : ''">
        <Toast position="bottom-right" group="br" />
        <!-- <Loading v-if="store.loading" /> -->
        <nav v-if="route.path !== '/login' && route.path !== '/register' && route.path !== '/forget-password' && route.path != '/forget-password/confirm'" class="fixed top-0 right-0 left-0 px-8 py-2 z-[100] bg-white flex justify-between shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <a href="/">
                <img :src="logo" class="w-32" alt="lotus logo">
            </a>
            <div class="flex gap-2 items-center px-2">
                <a href="/"><Button text="Home" :isPrimary="true" icon="hello"  /></a>
                <a href="/product"> <Button text="Product" :isPrimary="true" icon="hello"  /></a>         
                <input type="text" class="shadow-md p-2" placeholder="search" v-model="searchTerm" @keyup.enter="handleSearch">
                <span type="button" label="Toggle" @click="toggleBrand" aria-haspopup="true" aria-controls="brand_tmenu">
                    <Button text="Brand" :isPrimary="true" icon="hello"  />
                    <TieredMenu class="text-sm hover:transform-none text-primary" ref="brandMenu" id="brand_tmenu" :model="categories" popup />
                </span>
                <!-- <Button text="Secondary..." :isPrimary="false" icon="hello"  /> -->
                <span @click="cartStore.toggleOpen" class="w-8 aspect-square cursor-pointer transition-all hover:scale-90 relative"><img :src="cartLogo" alt=""><p class="bg-red-500 text-center aspect-square -right-2 -top-3 absolute px-2 rounded-full text-white">{{ cartStore.cartAmount }}</p></span>
                <span v-if="Object.keys(localUserInfo || {}).length !== 0">
                    <div class="w-8 h-8 cursor-pointer" type="button" label="Toggle" @click="toggleUserMenu" aria-haspopup="true" aria-controls="user_tmenu">
                        <img v-if="localUserInfo?.photoURL" :src="localUserInfo.photoURL" class="rounded-full" alt="">
                        <span class="text-center flex items-center justify-center m-auto rounded-full bg-primary h-full text-white" v-else>{{ localUserInfo?.email?.charAt(0).toUpperCase()}}</span>
                    </div>
                    <TieredMenu class="text-sm hover:transform-none text-primary" ref="userMenu" id="user_tmenu" :model="items" popup />
                </span>
            </div>
        </nav>
        <router-view />
        <Cart v-if="route.path != '/login' && route.path != '/register' && route.path != '/forget-password' && route.path != '/forget-password/confirm' " :isOpen="isOpen" />
    </section>
    <Footer v-if="route.path != '/login' && route.path != '/register' && route.path != '/forget-password' && route.path != '/forget-password/confirm' && route.path != '/reset-password' " />
</template>

