<script setup>
    import Billboard from '../components/Billboard.vue';
    import Promotion from '../components/Promotion.vue';
    import { useQueryClient, useQuery, useMutation } from '@tanstack/vue-query'
    import { useProductStore } from '../stores/productStore';

    const queryClient = useQueryClient();

    const productStore = useProductStore();
    const fetchProduct = productStore.fetchProduct;

    const {data, error, isLoading, isFetching} = useQuery({
    queryKey: ['product'],
    queryFn: fetchProduct,
    keepPreviousData: true,
    })
    
</script>
<template>
    This is product page
    <section>
        <Billboard />
        <Promotion :data="data" promotionTitle="New arrival" promotionDescription="Just arrived this week" />
    </section>
</template>

