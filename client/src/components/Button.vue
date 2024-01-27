<!-- <script>
    import { useUserStore } from '../stores/authStore';
    export default{
        props: {
            text: String,
            icon: String,
            isDisabled: Boolean,
            // if u want a primary button then pass true, for secondary button pass false
            isPrimary: Boolean,
            type: String
        },
    }
</script> -->

<template>
    <button type="submit" :disabled="isDisabled" :class="isPrimary?' bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed before:ease hover:scale-95 hover:bg-opacity-70 relative px-8 py-2 rounded-full overflow-hidden border border-secondary shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-secondary before:opacity-10 before:duration-700 hover:shadow-secondary hover:before:-translate-x-40':''+' before:ease hover:scale-95 hover:bg-opacity-70 relative px-8 py-2 rounded-full overflow-hidden border border-primary text-primary shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-primary before:opacity-10 before:duration-700 hover:shadow-secondary hover:before:-translate-x-40'">
        {{ text }}
    </button>
</template>

<script>

export default {
  props: {
    text: String,
    icon: String,
    isDisabled: String,
    isPrimary: Boolean,
    type: String
  },
}
</script>


