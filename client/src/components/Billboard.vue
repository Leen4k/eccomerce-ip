<template>
    <div class="card">
      <Carousel :value="products" :numVisible="3" :numScroll="1" :responsiveOptions="responsiveOptions" :autoplayInterval="3000">
        <template #item="slotProps">
          <div class="border-1 surface-border border-round m-2 text-center py-5 px-3">
            <div class="mb-3 rounded-xl overflow-hidden">
              <img
                src="https://images.pexels.com/photos/13457492/pexels-photo-13457492.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                :alt="slotProps.data.name"
                class="shadow-2 h-[70vh] w-full object-cover"
              />
            </div>
            <div>
              <div class="">
                <h4 class="mb-1 text-4xl font-bold">{{ slotProps.data.name }}</h4>
                <h6 class="mt-0 mb-3 text-2xl font-semibold">${{ slotProps.data.price }}</h6>
              </div>
              <Tag :value="slotProps.data.inventoryStatus" :severity="getSeverity(slotProps.data.inventoryStatus)" />
              <div class="mt-5">
                <Button icon="pi pi-search" rounded class="mr-2" />
                <Button icon="pi pi-star-fill" rounded severity="success" class="mr-2" />
                <Button icon="pi pi-cog" rounded severity="help" />
              </div>
            </div>
          </div>
        </template>
      </Carousel>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import Carousel from 'primevue/carousel';
  
  const generateDummyData = () => {
    const dummyData = [];
    for (let i = 1; i <= 10; i++) {
      dummyData.push({
        name: `Product ${i}`,
        price: Math.floor(Math.random() * 100) + 1,
        inventoryStatus: i % 3 === 0 ? 'OUTOFSTOCK' : (i % 2 === 0 ? 'LOWSTOCK' : 'INSTOCK'),
        image: `product${i}.jpg`,
      });
    }
    return dummyData;
  };
  
  const products = ref(generateDummyData());
  const responsiveOptions = ref([
    {
      breakpoint: '4000px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1,
    },
  ]);
  
  const getSeverity = (status) => {
    switch (status) {
      case 'INSTOCK':
        return 'success';
  
      case 'LOWSTOCK':
        return 'warning';
  
      case 'OUTOFSTOCK':
        return 'danger';
  
      default:
        return null;
    }
  };
  </script>
  