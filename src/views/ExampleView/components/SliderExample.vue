<template>
    <swiper-container 
        slides-per-view="1" 
        speed="500" 
        loop="true" 
        navigation="true" 
        pagination="true"
    >
        <swiper-slide v-for="(slide, index) in slides" :key="index">
            <div class="flex justify-center items-center h-96 w-full bg-blue-900">
                <h3 class="text-2xl text-white">{{ slide }}</h3>
            </div>
        </swiper-slide>
    </swiper-container>
</template>

<script>
import { ref } from 'vue'

export default {
    setup() {
        const slides = ref([
            'Vue 3',
            'Vite',
            'Tailwind',
            'Pinia',
            
        ])

        return {
            slides
        }
    }
}
</script>

<style></style>