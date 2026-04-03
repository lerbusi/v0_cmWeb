<script setup>
import { computed, ref } from "vue";

const selectedCategory = ref("all");
const selectedImage = ref(null);

const apiKey = "AIzaSyDP3Emv1kQjchlRuUKOjVALMtzBR0DH8Ps";
const sheetId = "1B0FLaAt37AEleSYhlS5353stq5DQWZ_ThIx1G09w5io";

// Sheets 中要取得的資料範圍，格式如下
const range = "gallery!A2:E";
// Sheets API 的 URL
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;

const parsedRows = ref([]);
const artworks = ref([]);
const categories = ref([{ id: "all", name: "全部" }]);

// 以 import.meta.glob 建立檔名 -> 打包後 url 的對照表（eager + as: 'url'）
const imageModules = import.meta.glob("../assets/images/gallery/*", {
  eager: true,
  as: "url",
});

// 轉成 { "chibi-01.png": "/_assets/xxx.hash.png", ... }
const imageMap = Object.fromEntries(
  Object.entries(imageModules).map(([p, url]) => {
    const name = p.split("/").pop();
    return [name, url];
  })
);

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    const rows = data.values || [];

    parsedRows.value = rows.map((r, i) => ({
      id: r[0] ? (isNaN(Number(r[0])) ? r[0] : Number(r[0])) : i + 1,
      title: r[1] || "",
      category: r[2] || "",
      year: r[3] || "",
      imageRaw: (r[4] || "").trim(),
      raw: r,
    }));

    // parsedRows 轉成 artworks，image 欄解析成可用的 url
    artworks.value = parsedRows.value
      .map((item) => {
        const link = item.imageRaw;
        let imageSrc = "";

        if (!link) {
          imageSrc = ""; // 可放預設圖 url
        } else if (link.startsWith("http://") || link.startsWith("https://")) {
          imageSrc = link;
        } else {
          // 先直接用檔名比對 imageMap（大小寫敏感與否都試一次）
          imageSrc =
            imageMap[link] ||
            imageMap[link.toLowerCase()] ||
            imageMap[link.toUpperCase()] ||
            "";
          // 若 imageMap 沒找到，可嘗試以相對 public 路徑（如果你把檔案放 public）
          if (!imageSrc && link) {
            imageSrc = `/assets/images/gallery/${link}`;
          }
        }

        return {
          id: item.id,
          title: item.title,
          category: item.category,
          year: item.year,
          image: imageSrc,
          raw: item.raw,
        };
      })
      .filter((a) => a.title || a.category); // 可依需求調整過濾條件

    // 動態產生 categories（保留 all）
    const cats = new Map();
    artworks.value.forEach((a) => {
      if (a.category) cats.set(a.category, a.category);
    });
    categories.value = [
      { id: "all", name: "全部" },
      ...Array.from(cats.keys()).map((k) => ({ id: k, name: k })),
    ];
  })
  .catch((error) => console.error("Error:", error));

const filteredArtworks = computed(() => {
  if (selectedCategory.value === "all") return artworks.value;
  return artworks.value.filter(
    (art) => art.category === selectedCategory.value
  );
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
  const category = categories.value.find((c) => c.id === categoryId);
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
                前往委託表單
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
