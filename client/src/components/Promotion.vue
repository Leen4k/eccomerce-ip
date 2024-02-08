<script setup>
      import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
      import ProductCard  from "../components/ProductCard.vue";
      import { useProductStore } from "../stores/productStore";
      import Loading from "./Loading.vue";
      import {ref, watch, onMounted} from "vue";
      import axios from 'axios';
      import SkeletonLoading from './SkeletonLoading.vue';
      import { useRoute, useRouter } from 'vue-router';
      import { useNotificationStore } from '../stores/notificationStore';
      import ProgressBar from 'primevue/progressbar';
      defineProps({
        promotionTitle: String,
        promotionDescription: String,
        // data: Array
      })

      const router = useRouter();
      const route = useRoute();
      const notificationStore = useNotificationStore();
      const currentPage = ref(router.currentRoute.value.query.page || 1); // Initialize with the value from the URL or default to 1
      const queryClient = useQueryClient();
      const loading = ref(false);
      const searchTerm = ref(null); 
      const categoryId = ref(''); // Define categoryId as a ref
      

    const productFetcher = async (page) => {
        console.log(router.currentRoute.value.query.search);
        searchTerm.value = router.currentRoute.value.query.search;
        console.log(router.currentRoute.value.query.categoryId);
        categoryId.value = router.currentRoute.value.query.categoryId;

        if (categoryId.value) {
          const response = await axios.get(`api/products/category/${categoryId.value}/products`);
          console.log(response.data);
          await new Promise((resolve) => {
            setTimeout(() => resolve(true), 1000);
          });
          return response.data || [];
        }
        if (searchTerm.value) {
            try{
              const response = await axios.get(`api/products/search?name=${searchTerm.value}`);
              const { data } = response;
              // queryClient.invalidateQueries('product');
              await new Promise((resolve) => {
                setTimeout(() => resolve(true), 1000);
              });
              return data || [];
            }catch(e){
              console.log(e);
            }
        } else {
          const response = await axios.get(`/api/products/pagination?page=${currentPage.value-1}&size=2`)
          const {content:data} = response.data;
          console.log(data);
          await new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000);
          });
          return data || [];
        }
    }

    // const fetchProductsByCategory = async () => {
    //   try {
    //     loading.value = true;
    //     await queryClient.invalidateQueries('product');
    //     await queryClient.fetchQuery(['product'], productFetcher(categoryId));
    //   } catch (error) {
    //     console.error('Error fetching products by category:', error);
    //     // Handle error
    //   } finally {
    //     loading.value = false;
    //   }
    // };

    onMounted(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryIdParam = params.get('categoryId');
    currentPage.value = parseInt(router.currentRoute.value.query.page) || 1;
    if (categoryIdParam) {
      categoryId.value = categoryIdParam;
      console.log(categoryId.value);
      // fetchProductsByCategory();
      queryClient.invalidateQueries(categoryId);
    }
  });


  // const categoryIdParam = router.currentRoute.value.query.categoryId;
  watch(() => router.currentRoute.value.query.categoryId, () => {
    queryClient.invalidateQueries('product');
});

watch(currentPage, (newValue, oldValue) => {
    // Update the route query parameter when currentPage changes
    router.push({ query: { ...router.currentRoute.value.query, page: newValue } });
    queryClient.invalidateQueries('product');
  });

      // const productFetcher = async (page) => {
      //   console.log(router.currentRoute.value.query.search);
      //   const searchKeyWord = router.currentRoute.value.query.search;
      //   if(searchKeyWord.length > 0){
      //     axios.get(`api/products/search?name=${searchKeyWord}`).then(({data})=>{
      //       notificationStore.showSuccess("you search for "+ searchKeyWord)
      //       console.log(data);
      //       queryClient.invalidateQueries('product');
      //     }).catch((err)=>{
      //       notificationStore.showError("error")
      //       console.log(err);
      //   })
      //   }
      //   const response = await axios.get(`/api/products/pagination?page=${currentPage.value-1}&size=1`)
      //   const {content:data} = response.data;
      //   console.log(data);
      //   await new Promise((resolve) => {
      //   setTimeout(() => resolve(true), 1000);
      //   });
      //   return data || [];
      // }

    //   watch(searchTerm, () => {
    //     // Update the route query parameter when searchTerm changes
    //     router.push({ query: { search: searchTerm.value } });
    // });
    watch(searchTerm, (newValue, oldValue) => {
    // Check if the new value of searchTerm is different from the query parameter
    if (newValue !== router.currentRoute.value.query.search) {
        // Update the route query parameter when searchTerm changes
        router.push({ query: { search: newValue } });
        queryClient.invalidateQueries('product');
    }
});

console.log(route);

      const {data, isLoading , isError, isFetching} = useQuery({
        queryKey: ['product', currentPage, categoryId, searchTerm],
        queryFn: () => productFetcher(currentPage.value),
        keepPreviousData: true
      })

      const nextPage = () => {
        if(data.value.length > 0){
          currentPage.value = currentPage.value
        }
      }

      const prevPage = () => {
        currentPage.value = Math.max(currentPage.value, 1)
      }

      console.log(router.currentRoute.value.query.pagination);

      
</script>
<template>
     <SkeletonLoading :isLoading="isLoading" />
        <section v-if="!isLoading">
          <div class="flex flex-col m-auto text-center my-8 mt-20">
            <h2 class="text-2xl font-bold">{{ promotionTitle }}</h2>
            <span class="text-primary">{{ promotionDescription }}</span>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductCard 
             :key="product.id" 
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :variants="{ custom: { scale: 2 } }"
              :delay="200 * index" 
             v-for="(product,index) in data" :id="product.id" :name="product.name" :images="product.images" :category="product.category.categoryName" :price="product.price" />
        </div>
        </section>
        <div v-if="data?.length === 0" class="h-[70vh] text-center flex justify-center items-center">No Product Found...</div>
        <div class="flex justify-center">
          <div v-if="route.path !== '/' && router.currentRoute.value.query.pagination != 'off'" class="example-six mt-8">
            <vue-awesome-paginate
              :total-items="100"
              v-model="currentPage"
              :items-per-page="5"
              :max-pages-shown="5"
            >
              <template #prev-button>
                <span @click="prevPage" class="text-center flex justify-center items-center">
                  <svg
                    class="m-auto w-3 h-3 mb-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                  </svg>
                </span>
              </template>
        
              <template #next-button>
                <span @click="nextPage" class="text-center flex justify-center items-center">
                  <svg 
                    class="m-auto w-3 h-3 mb-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.122 24l-4.122-4 8-8-8-8 4.122-4 11.878 12z" />
                  </svg>
                </span>
              </template>
            </vue-awesome-paginate>
          </div>
        </div>
</template>


<style>
  .example-six .pagination-container {
    column-gap: 10px;
    align-items: center;
  }
  .example-six .paginate-buttons {
    height: 35px;
    width: 35px;
    cursor: pointer;
    border-radius: 4px;
    background-color: transparent;
    border: none;
    color: #470CED;
  }
  
  .example-six .back-button,
  .example-six .next-button {
    background-color: #470CED;
    color: white;
    border-radius: 8px;
    height: 45px;
    width: 45px;
  }
  .example-six .active-page {
    background-color: #e5e5e5;
  }
  .example-six .paginate-buttons:hover {
    background-color: #f5f5f5;
  }
  .example-six .active-page:hover {
    background-color: #e5e5e5;
  }
  
  .example-six .back-button svg {
    transform: rotate(180deg) translateY(-2px);
  }
  .example-six .next-button svg {
    transform: translateY(2px);
  }
  
  .example-six .back-button:hover,
  .example-six .next-button:hover {
    background-color: #470CED;
  }
  
  .example-six .back-button:active,
  .example-six .next-button:active {
    background-color: rgb(85, 85, 85);
  }
  </style>