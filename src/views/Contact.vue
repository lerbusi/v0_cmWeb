<script setup></script>

<template>
  <div class="pt-16">
    <!-- Header -->
    <section class="py-16 border-b-2 border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          class="font-pixel text-xs text-muted-foreground tracking-widest uppercase"
          >CONTACT</span
        >
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
          委託申請
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          填寫以下表單開始委託，委託前請過目條款和細節，若有任何問題也歡迎透過其他方式聯絡我！
        </p>
      </div>
    </section>

    <!-- Contact Form -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12 text-center">
          <p class="text-muted-foreground mb-6">
            ※若表單關閉，則目前不開放委託。
          </p>
          <RouterLink to="/terms" class="pixel-btn"> 確認委託條款 </RouterLink>
        </div>
        <!-- Google Form -->
        <iframe
          class="w-full"
          src="https://docs.google.com/forms/d/e/1FAIpQLSfZMj8IzdS8L9eYNNcHHveXJObJNpWYb6IBqvSJ58OkgOySsA/viewform?embedded=true"
          height="1500"
          frameborder="0"
          marginheight="0"
          marginwidth="0"
          >載入中…</iframe
        >

        <!-- Alternative Contact -->
        <div class="mt-12 pt-12 border-t border-border">
          <h3 class="font-pixel text-sm text-foreground mb-4">OTHER WAYS</h3>
          <p class="text-muted-foreground text-sm mb-4">
            您也可以透過以下方式聯絡我：
          </p>
          <div class="space-y-2 text-sm">
            <p>
              <span class="text-muted-foreground">Twitter: </span>
              <a
                href="https://x.com/aler_ame02"
                target="_blank"
                rel="noopener noreferrer"
                class="text-foreground hover:underline"
                >@aler_ame02</a
              >
            </p>
            <p>
              <span class="text-muted-foreground">Threads: </span>
              <a
                href="https://www.threads.com/@violent_sugar_"
                target="_blank"
                rel="noopener noreferrer"
                class="text-foreground hover:underline"
                >@violent_sugar_</a
              >
            </p>
            <p>
              <span class="text-muted-foreground">Email: </span>
              <a
                href="mailto:lerbusi@gmail.com"
                class="text-foreground hover:underline"
                >lerbusi@gmail.com</a
              >
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
