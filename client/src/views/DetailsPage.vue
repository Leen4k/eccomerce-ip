<template>
      <section v-if="isLoading" class="grid gap-8 md:grid-cols-2 md:place-items-center h-screen">
        <div class="col-span-1 h-[500px] aspect-square overflow-hidden">
          <Skeleton width="100%" height="100%" class="h-full flex-1"></Skeleton>
        </div>
        <div class="flex flex-col gap-8 col-span-1 w-full">
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
    <section v-else class="grid gap-8 md:grid-cols-2 md:place-items-center h-screen">
        <div class="col-span-1 h-[400px] aspect-square overflow-hidden">
            <img :src="data.image" :alt="data.title+' img'">
        </div>
        <div class="flex flex-col gap-4 col-span-1">
            <p class="text-primary">{{ data.category }}</p>
            <p class="text-2xl">{{ data.title }}</p>
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
            <div v-if="isLoading">Loading...</div>
            <div v-if="isError">Error fetching data</div>
        </div>
    </section>
    <Promotion promotionTitle="You may also like..." promotionDescription="" />
    <Promotion promotionTitle="Other also bought" promotionDescription="" />
</template>

<script setup>
    import Button from '../components/Button.vue';
    import Promotion from '../components/Promotion.vue';
    import { useQuery } from '@tanstack/vue-query';
    import { useRouter, useRoute } from 'vue-router';
    import { ref, onMounted } from 'vue';
    import Skeleton from 'primevue/skeleton';

      // Import Swiper Vue.js components
;
      import { Swiper, SwiperSlide } from 'swiper/vue';

  // Import Swiper styles
  import 'swiper/css';
  

  const onSwiper = (swiper) => {
    console.log(swiper);
  };

  const onSlideChange = () => {
    console.log('slide change');
  };

    const router = useRouter();
    const getRoute = useRoute();
    const {id} = getRoute.params;

    const fetchSingleProduct = async () => {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const json = await response.json();
        return json
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
.swiper-container {
  background-color: #000;
}
.swiper-slide {
  background-size: cover;
  background-position: center;
}
.gallery-top {
  height: 80%!important;
  width: 100%;
}
.gallery-thumbs {
  height: 20%!important;
  box-sizing: border-box;
  padding: 10px 0;
}
.gallery-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}
.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}
</style>