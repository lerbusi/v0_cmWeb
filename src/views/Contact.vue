<script setup>
import { reactive, ref } from "vue";
import { RouterLink } from "vue-router";

const form = reactive({
  name: "",
  media: "",
  email: "",
  type: "",
  budget: "",
  description: "",
  reference: "",
  terms: false,
});

const isSubmitting = ref(false);
const isSubmitted = ref(false);
const errors = reactive({});

const commissionTypes = [
  { value: "Q版", label: "Q版" },
  { value: "半身插畫", label: "半身插畫" },
  { value: "全身插畫", label: "全身插畫" },
  { value: "PNGtuber", label: "PNGtuber" },
  { value: "其他", label: "其他" },
];

const validateForm = () => {
  const newErrors = {};

  if (!form.name.trim()) newErrors.name = "請輸入姓名";
  if (!form.media.trim()) newErrors.media = "請輸入社群媒體帳號";
  if (!form.email.trim()) newErrors.email = "請輸入電子郵件";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    newErrors.email = "請輸入有效的電子郵件";
  if (!form.type) newErrors.type = "請選擇委託類型";
  if (!form.description.trim()) newErrors.description = "請描述您的委託內容";
  if (!form.terms) newErrors.terms = "請同意委託條款";

  Object.assign(errors, newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async () => {
  // Clear previous errors
  Object.keys(errors).forEach((key) => delete errors[key]);

  if (!validateForm()) return;

  isSubmitting.value = true;

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  isSubmitting.value = false;
  isSubmitted.value = true;
};

const resetForm = () => {
  Object.assign(form, {
    name: "",
    media: "",
    email: "",
    type: "",
    description: "",
    reference: "",
    terms: false,
  });
  isSubmitted.value = false;
};
</script>

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
      <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Success State -->
        <div v-if="isSubmitted" class="text-center py-16">
          <div class="font-pixel text-4xl text-foreground mb-4">OK</div>
          <h2 class="text-2xl font-bold text-foreground mb-4">表單已送出！</h2>
          <p class="text-muted-foreground mb-8">
            感謝您的委託申請，會在數個工作天內透過電子郵件回覆您。
          </p>
        </div>

        <!-- Form -->
        <form
          action="https://docs.google.com/forms/u/0/d/e/1FAIpQLSfZMj8IzdS8L9eYNNcHHveXJObJNpWYb6IBqvSJ58OkgOySsA/formResponse"
          method="POST"
          target="hidden_iframe"
          v-else
          @submit.prevent="handleSubmit"
          class="space-y-6"
        >
          <!-- Name -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              姓名 / 暱稱 <span class="text-muted-foreground">*</span>
            </label>
            <input
              v-model="form.name"
              type="text"
              class="pixel-input"
              :class="errors.name ? 'border-red-500' : ''"
              placeholder="請輸入您的稱呼"
            />
            <p v-if="errors.name" class="mt-1 text-xs text-red-500">
              {{ errors.name }}
            </p>
          </div>

          <!-- Media -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              社群媒體帳號 <span class="text-muted-foreground">*</span>
            </label>
            <input
              v-model="form.media"
              type="text"
              class="pixel-input"
              :class="errors.media ? 'border-red-500' : ''"
              placeholder="請輸入您的社群媒體帳號"
            />
            <p v-if="errors.media" class="mt-1 text-xs text-red-500">
              {{ errors.media }}
            </p>
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              電子郵件 <span class="text-muted-foreground">*</span>
            </label>
            <input
              v-model="form.email"
              type="email"
              class="pixel-input"
              :class="errors.email ? 'border-red-500' : ''"
              placeholder="example@email.com"
            />
            <p v-if="errors.email" class="mt-1 text-xs text-red-500">
              {{ errors.email }}
            </p>
          </div>

          <!-- Commission Type -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              委託類型 <span class="text-muted-foreground">*</span>
            </label>
            <select
              v-model="form.type"
              class="pixel-input appearance-none cursor-pointer"
              :class="errors.type ? 'border-red-500' : ''"
            >
              <option value="" disabled>請選擇委託類型</option>
              <option
                v-for="type in commissionTypes"
                :key="type.value"
                :value="type.value"
              >
                {{ type.label }}
              </option>
            </select>
            <p v-if="errors.type" class="mt-1 text-xs text-red-500">
              {{ errors.type }}
            </p>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              委託內容描述 <span class="text-muted-foreground">*</span>
            </label>
            <textarea
              v-model="form.description"
              rows="5"
              class="pixel-input resize-none"
              :class="errors.description ? 'border-red-500' : ''"
              placeholder="請詳細描述您想要的OC或二創角色、姿勢、表情、服裝、互動等..."
            />
            <p v-if="errors.description" class="mt-1 text-xs text-red-500">
              {{ errors.description }}
            </p>
          </div>

          <!-- Reference -->
          <div>
            <label class="block text-sm font-medium text-foreground mb-2">
              參考圖片連結
            </label>
            <input
              v-model="form.reference"
              type="text"
              class="pixel-input"
              placeholder="請提供參考圖片的外部連結（可選）"
            />
            <p class="mt-1 text-xs text-muted-foreground">
              可使用 Imgur、Google Drive 資料夾等服務（請記得打開閱覽權限）
            </p>
          </div>

          <!-- Terms Agreement -->
          <div class="border-2 border-border p-4">
            <label class="flex items-start gap-3 cursor-pointer">
              <input
                v-model="form.terms"
                type="checkbox"
                class="mt-1 w-4 h-4 accent-foreground"
              />
              <span class="text-sm text-muted-foreground">
                我已閱讀並同意
                <RouterLink
                  to="/terms"
                  class="text-foreground underline hover:no-underline"
                >
                  委託條款
                </RouterLink>
                <span class="text-muted-foreground">*</span>
              </span>
            </label>
            <p v-if="errors.terms" class="mt-2 text-xs text-red-500">
              {{ errors.terms }}
            </p>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="pixel-btn w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span
              v-if="isSubmitting"
              class="flex items-center justify-center gap-2"
            >
              <span class="animate-pixel-blink">...</span>
              處理中
            </span>
            <span v-else>提交委託</span>
          </button>
        </form>

        <iframe
          name="hidden_iframe"
          id="hidden_iframe"
          style="display: none"
        ></iframe>

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
                class="text-foreground hover:underline"
                >@aler_ame02</a
              >
            </p>
            <p>
              <span class="text-muted-foreground">Threads: </span>
              <a
                href="https://www.threads.com/@violent_sugar_"
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
