<script setup>
const currentYear = new Date().getFullYear();

const socialLinks = [
  { name: "Twitter", url: "https://x.com/aler_ame02", icon: "X" },
  { name: "Threads", url: "#", icon: "@" },
];
</script>

<template>
  <footer class="border-t-2 border-border bg-muted">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Brand -->
        <div>
          <h3 class="font-pixel text-sm text-foreground mb-4">ALER</h3>
          <p class="text-muted-foreground text-sm leading-relaxed">
            畫二創的業餘閒人<br />
            因為興趣建了本頁面整理委託資訊
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h4
            class="font-medium text-foreground uppercase tracking-wider text-sm mb-4"
          >
            簡介
          </h4>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/pricing"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                方案定價
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/gallery"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                作品展示
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/terms"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                委託條款
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/contact"
                class="text-muted-foreground hover:text-foreground text-sm transition-colors"
              >
                聯絡表單
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Social -->
        <div>
          <h4
            class="font-medium text-foreground uppercase tracking-wider text-sm mb-4"
          >
            社群媒體
          </h4>
          <div class="flex gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.name"
              :href="social.url"
              class="w-10 h-10 border-2 border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors font-pixel text-xs"
              :aria-label="social.name"
            >
              {{ social.icon }}
            </a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="mt-12 pt-8 border-t border-border text-center">
        <p class="text-muted-foreground text-xs font-pixel">
          &copy; {{ currentYear }} ALER. VIOLENT_SUGAR. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  </footer>
</template>
