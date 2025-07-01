<template>
    <ModalBase 
        :isActive="isActive" 
        bgContentColor="bg-white"
        closeIconColor="text-gray-700"
        max-width="max-w-3xl"
        @closeModalClick="closeModal"
    >
        <div class="flex items-center justify-center w-full h-full min-h-[200px]">
            <h1>Modal Example</h1>
        </div>
    </ModalBase>
</template>

<script>
import { ref } from 'vue'
import ModalBase from '../../../components/ModalBase/index.vue'

export default {
    components: {
        ModalBase
    },
    props: {
        isActive: {
            type: Boolean,
            default: false
        }
    },
    emits: ['closeModalClick'],
    setup(props, { emit }) {
        const modalIsActive = ref(false)

        function closeModal() {
            emit('closeModalClick')
        }

        return {
            modalIsActive,
            closeModal
        }
    }
}
</script>

<style></style>