<template>
  <div class="flex-1 flex flex-col gap-14 py-10 items-center">

    <!-- Titulo -->
    <div class="flex flex-col items-center gap-4">
      <h2 class="text-white text-2xl" v-motion-fade>
        Boilerplate
      </h2>
      <h2 v-motion="motionShake" class="text-5xl text-white">
        FrontEnd
      </h2>
    </div>

    <div class="w-full max-w-7xl border border-gray-800"></div>
  
    <!-- Modal -->
    <div>
      <button @click="toogleModal('open')" class="text-white bg-blue-500 py-2 px-4 rounded-md ">Exemplo Modal</button>
      <ModalExample :isActive="state.isActive" @closeModalClick="toogleModal('close')" />
    </div>

    <div class="w-full max-w-7xl border border-gray-800"></div>
  
    <!-- Slider -->
    <div class="w-full max-w-3xl">
      <SliderExample />
    </div>
  </div>
</template>

<script>
import { motionShake } from '../../motions';
import ModalExample from './components/ModalExemple.vue'
import SliderExample from './components/SliderExample.vue'

import { reactive } from 'vue';

export default {
  components: {
    ModalExample,
    SliderExample
  },
  setup() {
    const state = reactive({
      isActive: false
    })

    function toogleModal(status) {
      if( status === 'open') state.isActive = true
      if( status === 'close') state.isActive = false
    }

    return {
      state,
      toogleModal,
      motionShake,
    };
  },
};
</script>
