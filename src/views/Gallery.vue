<script setup>
import { computed, ref } from "vue";

const selectedCategory = ref("all");
const selectedImage = ref(null);

import chibi01 from "../assets/images/gallery/chibi-01.png";
import chibi02 from "../assets/images/gallery/chibi-02.jpg";
import chibiFf01Say from "../assets/images/gallery/chibi-ff01-say.PNG";
import chibiTf02 from "../assets/images/gallery/chibi-tf02.png";
import chibiTf03 from "../assets/images/gallery/chibi-tf03.png";

import full01 from "../assets/images/gallery/full-01.JPEG";
import full02 from "../assets/images/gallery/full-02.JPEG";
import full04 from "../assets/images/gallery/full-04.JPEG";
import full05 from "../assets/images/gallery/full-05.png";
import fullHh01 from "../assets/images/gallery/full-hh01.png";
import fullPm01 from "../assets/images/gallery/full-pm01.jpg";
import fullPm02 from "../assets/images/gallery/full-pm02.png";

import half01 from "../assets/images/gallery/half-01.png";
import half02 from "../assets/images/gallery/half-02.JPEG";
import half03 from "../assets/images/gallery/half-03.png";
import half04 from "../assets/images/gallery/half-04.JPEG";
import halfTf01 from "../assets/images/gallery/half-tf01.png";

import pngtuber01 from "../assets/images/gallery/pngtuber-01.gif";

const categories = [
  { id: "all", name: "全部" },
  { id: "full", name: "全身" },
  { id: "bust", name: "半身" },
  { id: "chibi", name: "Q版" },
  { id: "pngtuber", name: "PNGTuber" },
];

const artworks = [
  {
    id: 1,
    title: "RANFREN 二創插畫",
    category: "full",
    year: "2024",
    image: full02,
  },
  {
    id: 2,
    title: "RANFREN 二創插畫",
    category: "full",
    year: "2024",
    image: full01,
  },
  {
    id: 3,
    title: "PKMN FRPR 二創插畫",
    category: "full",
    year: "2023",
    image: fullPm01,
  },
  {
    id: 4,
    title: "PKMN F 二創插畫",
    category: "full",
    year: "2025",
    image: full04,
  },
  {
    id: 5,
    title: "HAZBIN HOTEL VV 二創插畫",
    category: "full",
    year: "2023",
    image: full05,
  },
  {
    id: 6,
    title: "HAZBIN HOTEL VV 二創插畫",
    category: "full",
    year: "2024",
    image: fullHh01,
  },
  {
    id: 7,
    title: "PKMN F 二創插畫",
    category: "full",
    year: "2023",
    image: fullPm02,
  },
  {
    id: 8,
    title: "TF GIJINKA1 二創插畫",
    category: "full",
    year: "2026",
    image: half03,
  },
  {
    id: 9,
    title: "PKMN OMOCHIRI 二創插畫",
    category: "bust",
    year: "2025",
    image: half01,
  },
  {
    id: 10,
    title: "PKMN FRPR 二創插畫",
    category: "bust",
    year: "2025",
    image: half02,
  },
  {
    id: 11,
    title: "TF GIJINKA2 二創插畫",
    category: "bust",
    year: "2024",
    image: half04,
  },
  {
    id: 12,
    title: "TF OVERMAX 二創插畫",
    category: "bust",
    year: "2024",
    image: halfTf01,
  },
  {
    id: 13,
    title: "FF14 PNGtuber Q版動態展示",
    category: "pngtuber",
    year: "2024",
    image: pngtuber01,
  },
  {
    id: 14,
    title: "FF14 Q版",
    category: "chibi",
    year: "2024",
    image: chibiFf01Say,
  },
  {
    id: 15,
    title: "PKMN Q版",
    category: "chibi",
    year: "2025",
    image: chibi01,
  },
  {
    id: 16,
    title: "RANFREN Q版",
    category: "chibi",
    year: "2024",
    image: chibi02,
  },
  {
    id: 17,
    title: "TF OVERMAX Q版",
    category: "chibi",
    year: "2024",
    image: chibiTf02,
  },
  {
    id: 18,
    title: "TF MEGASTAR Q版",
    category: "chibi",
    year: "2024",
    image: chibiTf03,
  },
];

const filteredArtworks = computed(() => {
  if (selectedCategory.value === "all") return artworks;
  return artworks.filter((art) => art.category === selectedCategory.value);
});

const openModal = (artwork) => {
  selectedImage.value = artwork;
  document.body.style.overflow = "hidden";
};

const closeModal = () => {
  selectedImage.value = null;
  document.body.style.overflow = "";
};

const getCategoryName = (categoryId) => {
  const category = categories.find((c) => c.id === categoryId);
  return category ? category.name : categoryId;
};
</script>

<template>
  <div class="pt-16">
    <!-- Header -->
    <section class="py-16 border-b-2 border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          class="font-pixel text-xs text-muted-foreground tracking-widest uppercase"
          >GALLERY
        </span>
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
          作品展示
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          既有作品風格展示，點擊可確認全圖和資訊
        </p>
      </div>
    </section>

    <!-- Filter -->
    <section class="py-8 border-b border-border bg-muted">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-wrap items-center justify-center gap-2">
          <button
            v-for="category in categories"
            :key="category.id"
            @click="selectedCategory = category.id"
            class="px-4 py-2 text-sm font-medium transition-colors border-2"
            :class="
              selectedCategory === category.id
                ? 'bg-foreground text-background border-foreground'
                : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
            "
          >
            {{ category.name }}
          </button>
        </div>
      </div>
    </section>

    <!-- Gallery Grid -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <transition-group
          name="gallery"
          tag="div"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          <button
            v-for="artwork in filteredArtworks"
            :key="artwork.id"
            @click="openModal(artwork)"
            class="group relative aspect-square bg-muted border-2 border-border overflow-hidden hover:border-foreground transition-all duration-300 text-left"
          >
            <!-- Image (1:1 ratio) -->
            <img
              :src="artwork.image"
              :alt="artwork.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <!-- Overlay -->
            <div
              class="absolute inset-0 bg-background/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4"
            >
              <span class="font-pixel text-xs text-muted-foreground">{{
                getCategoryName(artwork.category)
              }}</span>
              <h3 class="text-foreground font-medium mt-1">
                {{ artwork.title }}
              </h3>
              <span class="text-muted-foreground text-sm">{{
                artwork.year
              }}</span>
            </div>

            <!-- Corner Indicator -->
            <div
              class="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-border group-hover:border-foreground transition-colors"
            />
          </button>
        </transition-group>

        <!-- Empty State -->
        <div v-if="filteredArtworks.length === 0" class="text-center py-16">
          <div class="font-pixel text-4xl text-muted-foreground mb-4">?</div>
          <p class="text-muted-foreground">此分類暫無作品</p>
        </div>
      </div>
    </section>

    <!-- Modal -->
    <teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedImage"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
          @click="closeModal"
        >
          <!-- Backdrop -->
          <div class="absolute inset-0 bg-background/95" />

          <!-- Modal Content -->
          <div class="relative max-w-4xl w-full animate-fade-in" @click.stop>
            <!-- Close Button -->
            <button
              @click="closeModal"
              class="absolute -top-12 right-0 text-muted-foreground hover:text-foreground transition-colors font-pixel text-sm"
            >
              [CLOSE]
            </button>

            <!-- Full Image Container -->
            <div
              class="bg-muted border-2 border-border flex items-center justify-center max-h-[70vh] overflow-hidden"
            >
              <img
                :src="selectedImage.image"
                :alt="selectedImage.title"
                class="max-w-full max-h-[70vh] w-auto h-auto object-contain"
              />
            </div>

            <!-- Info -->
            <div
              class="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              <div>
                <h3 class="text-xl font-medium text-foreground">
                  {{ selectedImage.title }}
                </h3>
                <p class="text-muted-foreground text-sm">
                  {{ getCategoryName(selectedImage.category) }} /
                  {{ selectedImage.year }}
                </p>
              </div>
              <RouterLink to="/contact" class="pixel-btn text-center">
                委託相似風格
              </RouterLink>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<style scoped>
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.3s ease;
}

.gallery-enter-from,
.gallery-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.gallery-move {
  transition: transform 0.3s ease;
}
</style>
