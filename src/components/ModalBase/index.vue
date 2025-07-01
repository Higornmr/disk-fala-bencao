<template>
    <teleport to="body">
        <!-- overlay -->
        <div 
            class="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-75"
            v-if="isActive"
            @click.self="closeModal"
        >

            <!-- content container -->
            <div 
                class="relative flex flex-col py-4 pl-4 pr-10 w-[90%] overflow-x-hidden h-fit max-h-[90%]" 
                :class="`${ maxWidth } ${ bgContentColor }`"
                v-motion-slide-bottom
            >
                <!-- close icon -->
                <button
                    class="absolute z-50 top-0 right-2 text-3xl" 
                    :class="closeIconColor"
                    @click="closeModal"
                >
                        &times;
                </button>

                <div class="overflow-y-auto">
                    <slot />
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {
    props: {
        isActive: {
            type: Boolean,
            default: false
        },
        maxWidth: {
            type: String,
            default: 'max-w-7xl'
        },
        bgContentColor: {
            type: String,
            default: 'bg-white'
        },
        closeIconColor: {
            type: String,
            default: 'text-gray-700'
        },
    },
    emits: ['closeModalClick'],
    setup(props, { emit }) {

        function closeModal() {
            emit('closeModalClick')
        }

        return {
            closeModal
        }
    },
}
</script>