import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue"

export const useProductStore = defineStore("productStore",() => {

    const fetchProduct = async () => {
        try{
            const {data} = await axios.get("https://fakestoreapi.com/products")
            console.log(data);
            return data;
        }catch(err){
            console.log(err);
        }
    }

    return{
        fetchProduct,
    }
})