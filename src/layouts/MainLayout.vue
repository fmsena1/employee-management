<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Employee Management
        </q-toolbar-title>
        <q-space />
        <q-btn v-if="!isAuthenticated" flat :label="$t('login')" @click="navigateTo('/login')" no-caps />
        <q-btn v-else flat :label="$t('logout')" @click="logout" no-caps/>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { computed } from 'vue';
import { useAuthStore } from 'src/stores/auth-store';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const authStore = useAuthStore();
const { t: $t } = useI18n();

const isAuthenticated = computed(() => !!authStore.token);

const navigateTo = (path) => {
  router.push(path);
};

const logout = () => {
  authStore.logout(router);
};
</script>
