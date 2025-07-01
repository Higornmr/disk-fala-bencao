<template>
    <div class="flex justify-center w-full px-3 h-[60px] fixed top-0 z-50 bg-blue-900">
        <nav class="relative flex items-center justify-center w-full max-w-7xl">
            
            <!-- LOGO -->
            <div class="absolute left-0 text-white">
                <h2 class="text-xl mb-0 font-title">LOGO</h2>
            </div>

            <!-- MENU DESKTOP -->
            <ul class="items-center gap-11 hidden lg:flex">
                <li class="relative" v-for="item in state.menuItems" :key="item.value">
                    <a :href="item.link" class="menu__link text-white">{{
                        item.label
                    }}</a>
                </li>
            </ul>

            <!-- MENU MOBILE -->
            <div class="absolute right-0 lg:hidden">
                <!-- HAMBURGER -->
                <div class="menu__hamburger space-y-2 cursor-pointer"
                    :class="state.menuMobileIsOpen ? 'hamburgerIsActive' : ''" @click.stop="toogleMenu">
                    <div class="w-8 h-0.5 bg-white"></div>
                    <div class="w-8 h-0.5 bg-white"></div>
                    <div class="w-8 h-0.5 bg-white"></div>
                </div>

                <!-- LINKS MOBILE -->
                <div id="header-links-mobile"
                    class="absolute z-50 bg-blue-500 w-60 right-0 top-10 p-5 text-right h-screen transition-all duration-200 ease-in-out"
                    :class="state.menuMobileIsOpen ? 'linksMobileVisible' : 'linksMobileHidden'">
                    <ul class="flex-col items-center gap-11">
                        <li class="relative" v-for="item in state.menuItems" :key="item.value">
                            <a :href="item.link" class="menu__link text-white">{{
                                item.label
                            }}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- TERCEIRO ELEMENTO -->
            <div class="absolute right-1/2 lg:right-0 transform translate-x-1/2 lg:translate-x-0 w-24 h-7 border border-white "></div>
        </nav>
    </div>
</template>
  
<script>
import { onBeforeUnmount, onMounted, reactive } from 'vue';
export default {
    name: 'Header',
    setup() {
        const state = reactive({
            menuItems: [
                {
                    label: "Home",
                    value: "home",
                    link: "#",
                },
                {
                    label: "Sobre",
                    value: "sobre",
                    link: "#",
                },
                {
                    label: "Contato",
                    value: "contato",
                    link: "#",
                },
            ],
            menuMobileIsOpen: false,
        })

        onMounted(() => {
            window.addEventListener("click", clickOutside);
        })

        onBeforeUnmount(() => {
            window.removeEventListener("click", clickOutside);
        })

        function clickOutside(event) {
            if (event.target.id !== 'header-links-mobile') {
                closeMenuMobile()
            }
        }

        function toogleMenu() {
            state.menuMobileIsOpen = !state.menuMobileIsOpen;
        }

        function openMenuMobile() {
            state.menuMobileIsOpen = true;
        }

        function closeMenuMobile() {
            state.menuMobileIsOpen = false;
        }

        return {
            state,
            toogleMenu,
            openMenuMobile
        }
    }
};
</script>
  
<style scoped>

/*HOVER LINKS*/
.menu__link {
    display: block;
    padding: 8px 0px;
    position: relative;
}

.menu__link:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid transparent;
    height: 0;
    width: 0;
}

.menu__link:hover:after {
    content: "";
    border-bottom: 1px solid white;
    border-left: none;
    border-top: none;
    height: 100%;
    width: 100%;
    transition: width 200ms ease-in-out;
}

/*MENU HAMBURGER*/
.menu__hamburger>div {
    transition: 200ms ease-in-out;
}

.menu__hamburger.hamburgerIsActive :first-child {
    transform: rotate(-225deg);
    position: relative;
    top: 10px;
}

.menu__hamburger.hamburgerIsActive :nth-child(2) {
    opacity: 0;
}

.menu__hamburger.hamburgerIsActive :last-child {
    transform: rotate(45deg);
    position: relative;
    top: -10px;
}

.linksMobileHidden {
    transform: translateX(200px);
    opacity: 0;
}

.linksMobileVisible {
    transform: translateX(16px);
    opacity: 1;
}
</style>