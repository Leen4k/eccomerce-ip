<template>
      <section v-if="isLoading" class="md:m-auto justify-center items-center flex flex-col gap-10 md:flex-row place-items-center h-screen">
        <div class="col-span-1 w-full h-[350px] mt-10 md:h-[500px] p-0 md:p-10 overflow-hidden">
          <Skeleton width="100%" height="100%" class="h-full flex-1"></Skeleton>
        </div>
        <div class="flex flex-col gap-2 md:gap-8 col-span-1 w-full">
            <Skeleton width="40%" class="mb-2"></Skeleton>
            <Skeleton width="100%" class="mb-2"></Skeleton>
            <Skeleton width="20%" class="mb-2"></Skeleton>
            <div class="flex flex-col gap-4">
                <Skeleton width="40%" class="mb-2"></Skeleton>
                <div class="flex gap-2">
                  <Skeleton width="60%" height="20px" class="mb-2"></Skeleton>
                </div>
            </div>
            <div>
              <Skeleton width="25%" height="40px" class="mb-2"></Skeleton>
            </div>
        </div>
    </section>
    <section  v-motion
              :initial="{ opacity: 0, y: 50 }"
              :enter="{ opacity: 1, y: 0, scale: 1 }"
              :variants="{ custom: { scale: 2 } }"
              :delay="300"  v-else class="md:m-auto justify-center items-center flex flex-col gap-10 md:flex-row h-screen">
        <div class="flex-1 w-full md:basis-1/2 h-[250px] mt-32 md:mt-0 md:h-[400px] aspect-square overflow-hidden">
            <img v-for="(image,index) in data.images" class="w-full h-full object-contain" :key="index" :src="`http://localhost:7000/api/images/${image.name}`" :alt="image.name+' img'">
        </div>
        <div class="flex flex-col gap-4 flex-1 w-full md:basis-1/2 md:pl-32">
            <p class="text-primary">{{ data.category.categoryName }}</p>
            <p class="text-2xl">{{ data.name }}</p>
            <span class="text-primary">$ {{ data.price }}</span>
            <div class="flex flex-col gap-4">
                3 colors available
                <div class="flex gap-2">
                  <Button @click="router.push(`?variant=${variant}`)" v-for="(variant, index) in variants" :key="index" :text="variant" :isPrimary="false" icon="hello"  />
                </div>
            </div>
            <div>
                Sizes
                variant...
            </div>
            <div>
              <Button text="Add To Cart" :isPrimary="true" icon="hello"  />
            </div>
        </div>
    </section>
    <Promotion :data="data" promotionTitle="You may also like" promotionDescription="" />
    <Promotion :data="data" promotionTitle="Other also bought" promotionDescription="" />
    <!-- <Promotion promotionTitle="You may also like..." promotionDescription="" />
    <Promotion promotionTitle="Other also bought" promotionDescription="" /> -->
</template>

<script setup>
    import Button from '../components/Button.vue';
    import Promotion from '../components/Promotion.vue';
    import { useQuery } from '@tanstack/vue-query';
    import { useRouter, useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import Skeleton from 'primevue/skeleton';
import axios from 'axios';
  


    const router = useRouter();
    const getRoute = useRoute();
    const {id} = getRoute.params;
    const productId = id;

    const fetchSingleProduct = async () => {
    try {
        const {data} = await axios.get(`api/products/${productId}`);
        console.log(data);
        await new Promise((resolve) => {
          setTimeout(() => resolve(true), 1000);
          });
        return data
    } catch (error) {
        console.error('Error fetching the product:', error);
    }
  };

    const {data, isLoading, isError} = useQuery({
      queryKey: ['singleProduct'],
      queryFn: fetchSingleProduct,
    })

    const variants = [
      42,36
    ]
  

</script>

<style scoped>

</style>