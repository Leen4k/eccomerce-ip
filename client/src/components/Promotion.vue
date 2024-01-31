<script setup>
      import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
     import ProductCard  from "../components/ProductCard.vue";
      import { useProductStore } from "../stores/productStore";
      import Loading from "./Loading.vue";
      defineProps({
        promotionTitle: String,
        promotionDescription: String,
        data: Array
      })

    //   const queryClient = useQueryClient();

    //   const productStore = useProductStore();
    //   const fetchProduct = productStore.fetchProduct;

    //   const {data, error, isLoading, isFetching} = useQuery({
    //     queryKey: ['product'],
    //     queryFn: fetchProduct,
    //     keepPreviousData: true,
    //   })

    //   console.log('Data:', data);
      
</script>
<template>
        <section>
          <div class="flex flex-col m-auto text-center my-8">
            <h2 class="text-2xl font-bold">{{ promotionTitle }}</h2>
            <span class="text-primary">{{ promotionDescription }}</span>
        </div>
        <div  class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <ProductCard :key="product.id" v-for="(product) in data" :id="product.id" :name="product.name" :image="product.image" :category="product.category.categoryName" :price="product.price" />
        </div>
        </section>
</template>