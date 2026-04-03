<script setup>
import { onMounted, ref } from "vue";
import { RouterLink } from "vue-router";

const apiKey = "AIzaSyDP3Emv1kQjchlRuUKOjVALMtzBR0DH8Ps";
const sheetId = "1B0FLaAt37AEleSYhlS5353stq5DQWZ_ThIx1G09w5io";

// Sheets 中要取得的資料範圍，格式如下
const range = "home!A2:B";
// Sheets API 的 URL
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

const aboutText = ref("");
const aboutAvatar = ref("");

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const rows = data.values || [];

    aboutText.value = rows?.[0]?.[0] ?? "";
    aboutAvatar.value = rows?.[0]?.[1] ?? "";
  })
  .catch((error) => console.error("Error:", error));

const isVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true;
  }, 100);
});

const features = [
  {
    icon: "☄",
    title: "插畫：原創OC & 角色二創",
    description: "提供人設圖跟需求，依照擅長風格繪製",
  },
  {
    icon: "☄",
    title: "Q版委託",
    description: "指定角色的簡單全彩Q版及互動",
  },
  {
    icon: "☄",
    title: "PNGtuber 動態小人",
    description: "簡易Q版圖動態，搭配遊戲直播使用",
  },
];
</script>

<template>
  <div class="pt-16">
    <!-- Hero Section -->
    <section
      class="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute inset-0"
          style="
            background-image: repeating-linear-gradient(
                0deg,
                transparent,
                transparent 2px,
                #fff 2px,
                #fff 4px
              ),
              repeating-linear-gradient(
                90deg,
                transparent,
                transparent 2px,
                #fff 2px,
                #fff 4px
              );
            background-size: 8px 8px;
          "
        />
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <transition
          enter-active-class="transition-all duration-700 ease-out"
          enter-from-class="opacity-0 translate-y-8"
        >
          <div v-if="isVisible" class="space-y-8">
            <!-- Pixel Art Badge -->
            <div class="inline-block">
              <span
                class="font-pixel text-xs text-muted-foreground tracking-widest uppercase px-4 py-2 border-2 border-border"
              >
                Commission Open
              </span>
            </div>

            <!-- Main Title -->
            <h1
              class="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight"
            >
              ALER<span class="text-muted-foreground">_</span>CM
            </h1>

            <!-- Subtitle -->
            <p
              class="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance"
            >
              <span class="hidden sm:inline">｜</span>
              非商業委託試營運中<br class="sm:hidden" />
              <span class="hidden sm:inline">｜</span>
            </p>

            <!-- Animated Cursor -->
            <div
              class="flex items-center justify-center gap-2 text-muted-foreground font-pixel text-sm"
            >
              <span>COMMISSION INFO</span>
              <span class="animate-pixel-blink">_</span>
            </div>

            <!-- CTA Buttons -->
            <div
              class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <RouterLink to="/pricing" class="pixel-btn">
                查看方案定價
              </RouterLink>
              <RouterLink
                to="/gallery"
                class="pixel-btn bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background"
              >
                瀏覽作品展示
              </RouterLink>
            </div>
          </div>
        </transition>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div class="flex flex-col items-center gap-2 text-muted-foreground">
          <span class="font-pixel text-xs">SCROLL</span>
          <div
            class="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-24 bg-muted">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="font-pixel text-lg sm:text-xl text-foreground mb-4">
            SERVICE
          </h2>
          <p class="text-muted-foreground">提供多種委託類型</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(feature, index) in features"
            :key="index"
            class="pixel-card p-8 group hover:border-foreground transition-colors"
          >
            <div
              class="font-pixel text-2xl text-foreground mb-4 group-hover:animate-pulse"
            >
              {{ feature.icon }}
            </div>
            <h3 class="font-medium text-foreground text-lg mb-2">
              {{ feature.title }}
            </h3>
            <p class="text-muted-foreground text-sm leading-relaxed">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="py-24">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-24 items-center">
          <!-- Image Placeholder -->
          <div
            class="lg:col-span-1 aspect-square bg-muted border-2 border-border flex items-center justify-center order-2 lg:order-1"
          >
            <img
              alt="avatar"
              class="avatar"
              :src="aboutAvatar"
              width="100%"
              height="1"
            />
          </div>

          <!-- Content -->
          <div class="lg:col-span-2 order-1 lg:order-2">
            <span
              class="font-pixel text-xs text-muted-foreground tracking-widest uppercase"
              >ABOUT</span
            >
            <h2 class="text-3xl font-bold text-foreground mt-4 mb-6">關於我</h2>
            <div class="space-y-4 text-muted-foreground leading-relaxed">
              <div v-html="aboutText"></div>
            </div>
            <RouterLink to="/gallery" class="pixel-btn inline-block mt-8">
              作品風格展示
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 bg-muted border-y-2 border-border">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-pixel text-lg sm:text-xl text-foreground mb-4">
          COMMISSION ME!
        </h2>
        <p class="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
          確認委託展示、委託條款後，按照方案填寫聯絡表單後討論需求
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <RouterLink to="/pricing" class="pixel-btn">
            確認方案定價
          </RouterLink>
          <RouterLink
            to="/contact"
            class="pixel-btn bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background"
          >
            前往聯絡表單
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
