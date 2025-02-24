<template>
  <q-page class="flex flex-center login-page">
    <q-card class="q-pa-lg q-mt-md login-card">
      <q-card-section class="text-center">
        <img src="../assets/favicon-32x32.png" alt="Product Icon" width="140" height="140" />
        <div class="text-h4">{{ $t('productName') }}</div>
        <div class="text-subtitle1">{{ $t('login') }}</div>
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
            <q-btn type="submit" :label="$t('login')" color="primary" class="full-width"/>
          </div>
          <div class="q-mt-md flex flex-center">
            <span>{{ $t('noAccount') }} <a @click="navigateToRegister" class="link">{{ $t('register') }}</a></span>
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
const errorMessage = ref('');
const authStore = useAuthStore();
const router = useRouter();
const $q = useQuasar();
const { t: $t } = useI18n();

const handleSubmit = async () => {
  try {
    errorMessage.value = '';
    await authStore.login(email.value, password.value, router);
    $q.notify({
      type: 'positive',
      message: $t('notifications.loginSuccess'),
      position: 'top-right'
    });
  } catch (error) {
    if (error.message === 'invalidEmailOrPassword') {
      errorMessage.value = $t('invalidEmailOrPassword');
    } else {
      $q.notify({
        type: 'negative',
        message: $t('notifications.loginError'),
        position: 'top-right'
      });
    }
    console.error(`Login failed:`, error);
  }
};

const navigateToRegister = () => {
  router.push('/register');
};
</script>

<style scoped lang="scss">
@import 'src/css/LoginPage.scss';
</style>
