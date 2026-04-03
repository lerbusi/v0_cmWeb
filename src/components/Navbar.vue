<script setup>
import { ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);

const navLinks = [
  { name: "首頁", path: "/" },
  { name: "方案定價", path: "/pricing" },
  { name: "作品展示", path: "/gallery" },
  { name: "委託條款", path: "/terms" },
  { name: "聯絡表單", path: "/contact" },
];

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-border"
  >
    <nav class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <RouterLink
          to="/"
          class="font-pixel text-sm sm:text-base text-foreground hover:text-muted-foreground transition-colors"
        >
          ALER <span class="text-muted-foreground">COMMISSION</span>
        </RouterLink>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <RouterLink
            v-for="link in navLinks"
            :key="link.path"
            :to="link.path"
            class="relative text-sm font-medium tracking-wide uppercase transition-colors hover:text-muted-foreground"
            :class="
              route.path === link.path
                ? 'text-foreground'
                : 'text-muted-foreground'
            "
          >
            {{ link.name }}
            <span
              v-if="route.path === link.path"
              class="absolute -bottom-1 left-0 w-full h-0.5 bg-foreground"
            />
          </RouterLink>
        </div>

        <!-- Mobile Menu Button -->
        <button
          @click="toggleMenu"
          class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-foreground"
          aria-label="Toggle menu"
        >
          <span
            class="w-6 h-0.5 bg-current transition-transform duration-300"
            :class="isMenuOpen ? 'rotate-45 translate-y-2' : ''"
          />
          <span
            class="w-6 h-0.5 bg-current transition-opacity duration-300"
            :class="isMenuOpen ? 'opacity-0' : ''"
          />
          <span
            class="w-6 h-0.5 bg-current transition-transform duration-300"
            :class="isMenuOpen ? '-rotate-45 -translate-y-2' : ''"
          />
        </button>
      </div>

      <!-- Mobile Navigation -->
      <transition
        enter-active-class="transition-all duration-300 ease-out"
        leave-active-class="transition-all duration-200 ease-in"
        enter-from-class="opacity-0 -translate-y-4"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <div v-if="isMenuOpen" class="md:hidden py-4 border-t border-border">
          <div class="flex flex-col gap-4">
            <RouterLink
              v-for="link in navLinks"
              :key="link.path"
              :to="link.path"
              @click="isMenuOpen = false"
              class="text-sm font-medium tracking-wide uppercase py-2 transition-colors"
              :class="
                route.path === link.path
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              "
            >
              <span class="mr-2">{{ ">" }}</span
              >{{ link.name }}
            </RouterLink>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>
