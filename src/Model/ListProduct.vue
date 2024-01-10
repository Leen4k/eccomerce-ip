<template>
    <div>
        <div class="title" style="background-color: #470CED; color: white; font-size: 32px; height: 48px; display: flex; align-items: center; justify-content: center;">
            {{ title }}
        </div>
        <div class="name" style="margin-top: 19px; height: 53px; font-size: 40px; display: flex; justify-content: center; align-items: center; color: black;">
            {{ name }}
        </div>
        <div style="width: auto; margin-top: 19px; display: flex; justify-content: center; align-items: center; ">
            <div style="width: 1259px; height: 493px;">
                <img :src="bigimage" alt="title">
            </div>
        </div>
        <div class="newArrival" style="margin-top: 19px; width: auto; color: black; font-size: 36px; display: flex; justify-content: center; align-items: center; height: 48px;">{{ newArrival }}</div>
        <div class="ArrivalDetail" style="color: #2C13AD; font-size: 20px; height: 40px; display: flex; justify-content: center; align-items: center;">{{ ArrivalDetail }}</div>
        <div class="products" style=" align-items: center; justify-content: center;">
            <ProductCard 
            image='../src/assets/shoes.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$1610">
            </ProductCard>
            <ProductCard
            image='../src/assets/shoes.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$1610">
            </ProductCard>
            <ProductCard 
            image='../src/assets/shoes.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$1610">
            </ProductCard>
            <ProductCard
            image='../src/assets/shoes.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$1610">
            </ProductCard>
            
        </div>
        <div class="title" style="background-color: #470CED; color: white; font-size: 32px; height: 48px; display: flex; align-items: center; justify-content: center; margin-top: 40px;">
            {{ title2 }}
        </div>
        <div class="products" style=" align-items: center; justify-content: center; margin-top: 40px;">
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$110">
            </ProductCard>
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$1610">
            </ProductCard>
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$110">
            </ProductCard>
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$110">
            </ProductCard>
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$110">
            </ProductCard> 
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$110">
            </ProductCard>
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$110">
            </ProductCard>
            <ProductCard
            image='../src/assets/Untitled design (4) 1.png' 
            title="Hello" 
            subTitle="Your step with powerful" 
            price="$110">
            </ProductCard>
        </div>
        <div style="display: flex; justify-content: center; align-items: center; margin-top: 60px; ">
            <button class="nextPage1">1</button>
            <button class="nextPage">2</button>
            <button class="nextPage">3</button>
            <button class="nextPage">4</button>
        </div>
        
    </div>
    
</template>

<script>
import ProductCard from '../components/ProductCard.vue';

export default {
    name: "ListProduct",
    props: {
        title: String,
        name: String,
        bigimage: String,
        newArrival: String,
        ArrivalDetail: String,
        title2: String,
    },
    components: { ProductCard }
};
</script>
<style scoped>
.products {
    display: grid;
    grid-template-columns: auto auto auto auto;
    grid-gap: 10px;
    padding: 10px;
}
.nextPage {
    width: 45px;
    height: 45px;
    margin: 5px;
    font-size: medium; 
    color: #470CED; 
    border-style: solid;
    border-color: blue;
}
.nextPage1 {
    width: 45px;
    height: 45px;
    margin: 5px;
    font-size: medium; 
    color: #470CED; 
    border-style: solid;
    border-bottom-color: red;
}
</style>
