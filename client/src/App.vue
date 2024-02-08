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
    import search from "./assets/search-155 1.png";
    import ProgressBar from 'primevue/progressbar';
    import { useProductStore } from './stores/productStore';
    import logoMobile from "./assets/logo_mobile.png"


    const router = useRouter();
    const store = useUserStore();
    const cartStore = useCartStore();
    const notificationStore = useNotificationStore();
    const productStore = useProductStore();
    const queryClient = useQueryClient();
    const primaryBrand = ref(false);
    const { isFetching: productIsLoading} = useQuery(['product']);
    import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'


const people = [
  { name: 'Wade Cooper' },
  { name: 'Arlene Mccoy' },
  { name: 'Devon Webb' },
  { name: 'Tom Cook' },
  { name: 'Tanya Fox' },
  { name: 'Hellen Schmidt' },
]
const selectedPerson = ref(people[0])

        // Function to limit the maximum duration of productIsLoading to 3 seconds
    const stopProductLoading = () => {
        setTimeout(() => {
            // Set productIsLoading to false after 3 seconds
            productIsLoading.value = false;
        }, 500); // 3000 milliseconds = 3 seconds
    };
    stopProductLoading();


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
        }, 3000);    
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

    const handleCategoryChange = (categoryId, categoryName) => {
        store.showSuccess("filtering product for category " + categoryName)
        router.push({ query: { categoryId: categoryId } });
    }


    const getCategories = async () => {
        try{
            const {data} = await axios.get("/api/categories")
            console.log(data);
            let modifiedData = data.map(item => {
                return { label: item.categoryName, categoryId: item.categoryId, command: () => handleCategoryChange(item.categoryId, item.categoryName) };
            });
            modifiedData = [{label: "All", categoryId: "All", command: () => {router.push("/product?page=1");queryClient.invalidateQueries('product')}},...modifiedData]
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
            icon: 'pi pi-sign-out text-primary',
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


    const setPrimary = () => {
        primaryBrand.value = true;
    }



</script>

<template>

    <ProgressBar v-if="store.loading" mode="indeterminate" class="top-0 z-[1000] bg-secondary text-secondary sticky" style="height: 6px; background: #470CED!important; border-radius: 0;"></ProgressBar>

    <section :class="route.path != '/login' && route.path != '/register' && route.path != '/forget-password' && route.path != '/forget-password/confirm' && route.path != '/reset-password' ? 'px-8' : ''">

        <Toast position="bottom-right" group="br" />
        <!-- <Loading v-if="store.loading" /> -->
        <nav v-if="route.path !== '/login' && route.path !== '/register' && route.path !== '/forget-password' && route.path != '/forget-password/confirm'" class="fixed top-0 right-0 left-0 px-8 py-2 z-[100] bg-white flex justify-between shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
            <a href="/">
                <img :src="logo" class="w-32 hidden md:block" alt="lotus logo">
                <img :src="logoMobile" class="w-12 md:hidden" alt="lotus logo">
            </a>
            <div class="flex gap-2 items-center px-2">
                <div class="flex gap-6 mx-2">
                    <a href="/" class="md:hidden flex items-center justify-center"><i :class="route.path === '/'?'pi pi-home scale-[1.7] rounded-full p-1 text-white bg-primary':'pi pi-home scale-[2] text-primary'" ></i></a>
                    <a href="/product?page=1" class="md:hidden flex items-center justify-center"><i :class="route.path === '/product' || route.path.includes('/product-detail')?'pi pi-shopping-bag scale-[1.7] rounded-full p-1 text-white bg-primary':'pi pi-shopping-bag scale-[1.7] text-primary'" ></i></a>
                    <span class="md:hidden flex items-center justify-center" type="button" label="Toggle" @click="toggleBrand" aria-haspopup="true" aria-controls="brand_tmenu">
                        <p @click="setPrimary" class="md:hidden flex items-center justify-center"><i :class="primaryBrand?'pi pi-verified scale-[1.7] rounded-full p-1 text-white bg-primary':'pi pi-verified scale-[1.7] text-primary'" ></i></p>
                        <TieredMenu class="text-sm md:hidden hover:transform-none text-primary" ref="brandMenu" id="brand_tmenu" :model="categories" popup />
                </span>
                </div>
                <a class="hidden md:block" href="/"><Button text="Home" :isPrimary="route.path === '/'" icon="hello"  /></a>
                <a class="hidden md:block" href="/product?page=1"> <Button text="Product" :isPrimary="route.path === `/product` || route.path.includes('/product-detail')" icon="hello"  /></a>         
                <span class="flex relative">
                    <input type="text" class="before:ease hover:bg-opacity-70 relative px-8 py-2 rounded-full overflow-hidden border border-primary text-primary shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-primary before:opacity-10 before:duration-700 hover:shadow-secondary hover:before:-translate-x-40" placeholder="search" v-model="searchTerm" @keyup.enter="handleSearch">
                    <img :src="search" class="absolute right-3 top-[8px] w-6" alt="search icon">
                </span>
                <!-- brand -->
                <span class="hidden md:block" type="button" label="Toggle" @click="toggleBrand" aria-haspopup="true" aria-controls="brand_tmenu">
                    <Button text="Brand" @click="setPrimary" :isPrimary="primaryBrand" icon="hello"  />
                    <TieredMenu class="text-sm hover:transform-none text-primary" ref="brandMenu" id="brand_tmenu" :model="categories" popup />
                </span>
                <!-- brand test -->

                <!-- <Button text="Secondary..." :isPrimary="false" icon="hello"  /> -->
                <span @click="cartStore.toggleOpen" class="w-8 aspect-square cursor-pointer transition-all hover:scale-90 relative"><img :src="cartLogo" alt=""><p class="bg-red-500 text-center aspect-square -right-2 -top-3 absolute px-2 rounded-full text-white">{{ cartStore.cartAmount }}</p></span>
                
                <span v-if="Object.keys(localUserInfo || {}).length !== 0">
                    <div class="w-8 h-8 cursor-pointer" type="button" label="Toggle" @click="toggleUserMenu" aria-haspopup="true" aria-controls="user_tmenu">
                        <img v-if="localUserInfo?.photoURL" :src="localUserInfo.photoURL" class="rounded-full" alt="">
                        <span class="text-center flex items-center justify-center m-auto rounded-full bg-primary h-full text-white" v-else>{{ localUserInfo?.email?.charAt(0).toUpperCase()}}</span>
                    </div>
                    <TieredMenu class="text-sm hover:transform-none text-primary" ref="userMenu" id="user_tmenu" :model="items" popup />
                </span>
                <a v-else href="login" class="flex items-center justify-center bg-primary p-2 rounded-full"><i class="pi pi-sign-in scale-125 text-white" ></i></a>
            </div>
        </nav>
        <router-view />
        <Cart v-if="route.path != '/login' && route.path != '/register' && route.path != '/forget-password' && route.path != '/forget-password/confirm' " :isOpen="isOpen" />
    </section>
    <Footer v-if="route.path != '/login' && route.path != '/register' && route.path != '/forget-password' && route.path != '/forget-password/confirm' && route.path != '/reset-password' " />
</template>

