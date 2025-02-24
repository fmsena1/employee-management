<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg q-mt-md" style="width: 400px; border: 1px solid #ccc; border-radius: 8px;">
      <q-card-section>
        <div class="text-h4">{{ isLogin ? $t('login') : $t('register') }}</div>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
          <q-input v-model="email" :label="$t('email')" type="email" outlined />
          <q-input v-model="password" :label="$t('password')" :type="isPwd ? 'password' : 'text'" outlined>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <div v-if="errorMessage" class="error-message q-mt-md">
            {{ errorMessage }}
          </div>
          <div class="q-mt-md flex flex-center q-gutter-sm">
            <q-btn type="submit" :label="isLogin ? $t('login') : $t('register')" color="primary"/>
            <q-btn @click="toggleMode" :label="!isLogin ? $t('login') : $t('register')" color="secondary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';

const email = ref('');
const password = ref('');
const isPwd = ref(true);
const isLogin = ref(true);
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();
const { t: $t } = useI18n();

const handleSubmit = async () => {
  try {
    errorMessage.value = '';
    if (isLogin.value) {
      await authStore.login(email.value, password.value, router);
      $q.notify({
        type: 'positive',
        message: isLogin.value ? $t('notifications.loginSuccess') : $t('notifications.registerSuccess'),
        position: 'top-right'
      });
    } else {
      await authStore.register(email.value, password.value, router);
      $q.notify({
        type: 'positive',
        message: $t('notifications.registerSuccess'),
        position: 'top-right'
      });
      toggleMode();
    }
  } catch (error) {
    console.log(error.message);
    if (error.message === 'invalidEmailOrPassword') {
      errorMessage.value = $t('invalidEmailOrPassword');
    } else {
      $q.notify({
        type: 'negative',
        message: isLogin.value ? $t('notifications.loginError') : $t('notifications.registerError'),
        position: 'top-right'
      });
    }
    console.error(`${isLogin.value ? 'Login' : 'Registration'} failed:`, error);
  }
};

const toggleMode = () => {
  isLogin.value = !isLogin.value;
};
</script>

<style scoped>
.q-gutter-md {
  gap: 16px;
}

.q-gutter-sm {
  gap: 8px;
}

.error-message {
  color: #B71C1C;
}
</style>
