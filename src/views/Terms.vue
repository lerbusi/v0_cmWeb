<script setup>
import { RouterLink } from "vue-router";

const sections = [
  {
    title: "委託流程",
    icon: "01",
    items: [
      "填寫委託表單，詳細描述您的需求",
      "確認委託內容與價格後，進行排單順序",
      "輪到您時將通知付款，視排單狀況及委託內容，告知詳細交期",
      "請於五日內完成付清，雙方確認後開始繪製",
      "交稿後，若有細節繪製錯誤需要修改，可進行微調",
      "委託完成，交付檔案",
    ],
  },
  {
    title: "付款方式",
    icon: "02",
    items: [
      "接受銀行轉帳、綠界金流（台灣）",
      "接受 PayPal（國際）",
      "提供委託申請，確認後會排單順序，通知輪到您再進行付款",
      "確認委託後需全額支付，收到款項後開始繪製",
      "如當下有匯款困難請告知，繪製順序可能會有變動",
    ],
  },
  {
    title: "注意事項",
    icon: "03",
    items: [
      "有個人選色的調整方式，有色票要求恕無法完美對上",
      "皆為驚喜包模式，無法提供過程圖確認，並包含了已展示作品程度的細節瑕疵",
      "除設定錯誤（例如配件的紅色選成綠的）外，畫風不符等個人主觀喜好問題的修改，恕無法調整",
      "交稿後有任何疑慮，請在 7 天內回覆，若沒有回應視為委託完成",
      "請勿委託官方禁止創作及委託的作品，並請避免真人肖像、寫實人物；禁止 AI 訓練使用",
      "本人涉略作品不廣，若可能為爭議性作品題材，請事先告知",
      "成品預設會上浮水印公開，不希望公開或特定日期後公開，請事先告知",
      "其他特殊需求，也請事先詢問，非常感謝！<3",
    ],
  },
  {
    title: "退款政策",
    icon: "04",
    items: [
      "僅發出委託申請或已排單，但尚未付款，可直接幫您取消委託",
      "若已付款全額，因委託人因素必須取消，視進度酌退部分費用",
      "因繪師原因無法完成，全額退款",
    ],
  },
  {
    title: "版權說明",
    icon: "06",
    items: [
      "完成品著作權歸繪師所有，商業使用權需另外計費",
      "委託人獲得個人使用權，可作為社群頭像、個人收藏使用，社群使用時請協助註明作者資訊",
      "禁止未經授權的商業行為，不可聲稱為自己繪製或轉售",
      "如有個人印製行為但無商業利益，請詢問或告知繪師，避免爭議",
    ],
  },
];
</script>

<template>
  <div class="pt-16">
    <!-- Header -->
    <section class="py-16 border-b-2 border-border">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span
          class="font-pixel text-xs text-muted-foreground tracking-widest uppercase"
          >TERMS</span
        >
        <h1 class="text-3xl sm:text-4xl font-bold text-foreground mt-4 mb-4">
          委託條款
        </h1>
        <p class="text-muted-foreground max-w-2xl mx-auto">
          委託前請務必詳閱以下條款，提交委託即表示同意所有規定
        </p>
      </div>
    </section>

    <!-- Terms Content -->
    <section class="py-16">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="space-y-8">
          <div
            v-for="section in sections"
            :key="section.title"
            class="border-2 border-border hover:border-foreground transition-colors"
          >
            <!-- Section Header -->
            <div
              class="flex items-center gap-4 p-6 border-b border-border bg-muted"
            >
              <span class="font-pixel text-sm text-muted-foreground">{{
                section.icon
              }}</span>
              <h2 class="text-lg font-medium text-foreground">
                {{ section.title }}
              </h2>
            </div>

            <!-- Section Content -->
            <div class="p-6">
              <ul class="space-y-3">
                <li
                  v-for="(item, index) in section.items"
                  :key="index"
                  class="flex items-start gap-3 text-sm"
                >
                  <span class="text-muted-foreground font-pixel text-xs mt-0.5"
                    >></span
                  >
                  <span class="text-muted-foreground leading-relaxed">{{
                    item
                  }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Agreement Notice -->
        <div class="mt-12 p-6 bg-muted border-2 border-border">
          <div class="flex items-start gap-4">
            <span class="font-pixel text-lg text-foreground">!</span>
            <div>
              <h3 class="font-medium text-foreground mb-2">重要提醒</h3>
              <p class="text-muted-foreground text-sm leading-relaxed">
                提交委託表單即表示您已詳閱並同意以上所有條款。如有任何疑問，請在委託前透過聯絡表單詢問。
                <br />
                條款內容可能不定期更新，請以委託當時的版本為準。
              </p>
            </div>
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-12 text-center">
          <p class="text-muted-foreground mb-6">已閱讀並同意條款？</p>
          <RouterLink to="/contact" class="pixel-btn"> 開始委託 </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
