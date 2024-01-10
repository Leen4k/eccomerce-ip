<script setup>
    // import Button from './components/Button.vue';
    import { useRoute } from 'vue-router';
    import ProductCard from './components/ProductCard.vue';
    import ListProduct from './Model/ListProduct.vue';

    const route = useRoute();
    console.log(route.path);

    
</script>

<template>
    <!-- <ListProduct
    name="Ang ousa"
    title="ousa"
    image='./src/assets/Untitled design (4) 1.png'
    newArrival="hello"
    ArrivalDetail="Detail clearer"
    >
    </ListProduct> -->
    <!-- <ListProduct>Hi</ListProduct> -->
    <ListProduct
      title="Choose your style!"
      name="The Althletic shoes"
      bigimage='./src/assets/shoes.png'
      newArrival="New Arrival"
      ArrivalDetail="Just Arrived in This Week"
      title2="All Products"
    ></ListProduct>


    <!-- <ProductCard 
    image='./src/assets/facebook.png' 
    title="Hello" 
    subTitle="Your step with powerful" 
    price="$1610" 
    addButton="Add"
    >
    </ProductCard>
    <ProductCard 
    image='./src/assets/shoes.png' 
    title="Hello" 
    subTitle="Your step with powerful" 
    price="$1610" 
    addButton="Add"
    >
    </ProductCard> -->
  
    
    <section>
        <nav v-if="route.path !== '/login'" class="flex justify-between">
            <span>Logo</span>
            <div class="flex gap-2">
                <Button text="Hello" :isPrimary="true" icon="hello"  />
                <Button text="Secondary..." :isPrimary="false" icon="hello"  />
            </div>
        </nav>
        <router-view />
    </section>
</template>

<script>
</script>