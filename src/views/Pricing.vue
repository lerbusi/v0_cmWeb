<script setup>
import { RouterLink } from "vue-router";

const pricingPlans = [
  {
    name: "Q版",
    nameEn: "CHIBI",
    price: "NT$ 500",
    description: "Q版小人簡單全身圖",
    features: ["複雜服設將簡化", "透明背景，可選有色邊框", "提供高解析度 PNG"],
    popular: false,
  },
  {
    name: "半身插圖",
    nameEn: "BUST",
    price: "NT$ 1,000",
    description: "半身角色委託",
    features: [
      "定價為單一角色",
      "增加一人 +50%",
      "簡單背景",
      "明信片尺寸",
      "提供高解析度 PNG",
    ],
    popular: false,
  },
  {
    name: "全身插圖",
    nameEn: "FULL",
    price: "NT$ 1,500",
    description: "全身人物委託",
    features: [
      "定價為單一角色",
      "增加一人 +50%",
      "風格化背景",
      "明信片尺寸",
      "提供高解析度 PNG",
    ],
    popular: true,
  },
  {
    name: "PNGtuber",
    nameEn: "pngtuber",
    price: "NT$ 900",
    description: "Q版動態，桌寵及遊戲直播",
    features: [
      "單一角色",
      "透明背景，可選有色邊框",
      "簡單漂浮動態",
      "語音觸發張口動態",
      "提供打包檔",
    ],
    popular: false,
  },
];

const addOns = [
  { name: "額外角色", price: "+50%" },
  { name: "複雜要求", price: "+30%" },
  { name: "加急服務", price: "+50%" },
  { name: "商業使用", price: "+100%" },
];
</script>

<template>
  <div class="pt-16">
    <!-- Header -->
    <section class="py-16 border-b-2 border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          class="font-pixel text-xs text-muted-foreground tracking-widest uppercase"
          >PRICING</span
        >
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
          方案定價
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          既有的方案一覽，價格為基礎價格，可根據需求調整
        </p>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-16">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Wrapper for badge positioning -->
          <div
            v-for="plan in pricingPlans"
            :key="plan.name"
            class="relative pt-3"
          >
            <!-- Popular Badge - Outside clip-path container -->
            <div
              v-if="plan.popular"
              class="absolute top-0 left-1/2 -translate-x-1/2 bg-foreground text-background font-pixel text-xs px-3 py-1 z-10"
            >
              HOT
            </div>

            <!-- Pixel Card with clip-path -->
            <div
              class="pixel-card flex flex-col group hover:border-foreground transition-colors h-full"
              :class="plan.popular ? 'border-foreground' : ''"
            >
              <!-- Card Content -->
              <div class="p-6 flex flex-col flex-1">
                <!-- Plan Header -->
                <div class="text-center mb-6">
                  <span class="font-pixel text-xs text-muted-foreground">{{
                    plan.nameEn
                  }}</span>
                  <h3 class="text-xl font-bold text-foreground mt-1">
                    {{ plan.name }}
                  </h3>
                  <p class="text-muted-foreground text-sm mt-2">
                    {{ plan.description }}
                  </p>
                </div>

                <!-- Price -->
                <div class="text-center py-4 border-y border-border mb-6">
                  <span class="font-pixel text-lg sm:text-xl text-foreground">{{
                    plan.price
                  }}</span>
                  <span class="text-muted-foreground text-sm ml-1">起</span>
                </div>

                <!-- Features -->
                <ul class="space-y-3 flex-1">
                  <li
                    v-for="feature in plan.features"
                    :key="feature"
                    class="flex items-center gap-3 text-sm"
                  >
                    <span class="text-foreground font-pixel text-xs">+</span>
                    <span class="text-muted-foreground">{{ feature }}</span>
                  </li>
                </ul>

                <!-- CTA -->
                <RouterLink
                  to="/contact"
                  class="mt-6 text-center py-3 border-2 transition-colors font-medium text-sm"
                  :class="
                    plan.popular
                      ? 'bg-foreground text-background border-foreground hover:bg-transparent hover:text-foreground'
                      : 'border-border text-foreground hover:border-foreground'
                  "
                >
                  選擇方案
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Add-ons -->
    <section class="py-16 bg-muted">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <span
            class="font-pixel text-xs text-muted-foreground tracking-widest uppercase"
            >ADD-ONS</span
          >
          <h2 class="text-2xl font-bold text-foreground mt-4">附加服務</h2>
          <p class="text-muted-foreground text-sm leading-relaxed">
            此項僅供參考，詳細價格會在正式連絡過程做上下估算。
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            v-for="addon in addOns"
            :key="addon.name"
            class="border-2 border-border p-4 text-center hover:border-foreground transition-colors"
          >
            <p class="text-foreground font-medium">{{ addon.name }}</p>
            <p class="font-pixel text-sm text-muted-foreground mt-2">
              {{ addon.price }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="font-pixel text-lg text-foreground mb-4">COMMISSION ME!</h2>
        <p class="text-muted-foreground mb-8">
          確認委託展示、委託條款後，按照方案填寫聯絡表單後討論需求
        </p>

        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <RouterLink
            to="/gallery"
            class="pixel-btn bg-transparent text-foreground border-2 border-foreground hover:bg-foreground hover:text-background"
          >
            瀏覽委託展示
          </RouterLink>

          <RouterLink to="/contact" class="pixel-btn">
            前往聯絡表單
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
