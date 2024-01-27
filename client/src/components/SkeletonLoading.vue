<script setup>
    defineProps({
        isLoading: Boolean
    })
    import Skeleton from 'primevue/skeleton';
</script>
<template>
            <div v-if="isLoading" class="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <article v-for="(index) in 16" :key="index" class="flex flex-col gap-4 bg-secondary overflow-hidden rounded-xl h-[450px] p-4">
                <div class="skeleton-loader" >
                <div class="flex w-full overflow-hidden">
                    <!-- <div class="skeleton-image h-[300px] flex-1"></div> -->
                    <Skeleton width="100%" height="300px" class="mb-[4px]"></Skeleton>
                </div>
                <div class="flex flex-col justify-center h-[100px]">
                    <Skeleton width="65%" height="1rem" class="mb-[4px]"></Skeleton>
                    <!-- <div class="skeleton-line w-48 h-4"></div> -->
                    <Skeleton width="8rem" height="1rem" class="mb-[4px]"></Skeleton>
                    <!-- <div class="skeleton-line w-32 h-4"></div> -->
                    <span class="flex justify-between">
                    <Skeleton width="10rem" height="1rem" class="mb-[4px]"></Skeleton>
                    <!-- <div class="skeleton-line w-40 h-4"></div> -->
                    <div class="skeleton-button"></div>
                    </span>
                </div>
                </div>
            </article>
        </div>
</template>

