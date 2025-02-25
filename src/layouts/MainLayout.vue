<template>
  <q-layout view="lHh Lpr lFf">
    <q-header v-if="isAuthenticated" elevated>
      <q-toolbar>
        <q-toolbar-title>
          {{ $t('productName') }}
        </q-toolbar-title>
        <q-space />
        <q-btn-dropdown flat icon="person">
          <q-list>
            <q-item clickable v-ripple @click="logout">
              <q-item-section avatar>
                <q-icon name="logout" />
              </q-item-section>
              <q-item-section>{{ $t('logout') }}</q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const authStore = useAuthStore();
const { t: $t } = useI18n();

const isAuthenticated = computed(() => !!authStore.token && authStore.token.trim() !== '');

const logout = () => {
  authStore.logout(router);
};
</script>
