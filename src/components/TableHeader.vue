<template>
  <div class="q-gutter-md row items-center justify-between">
    <div class="row items-center q-gutter-sm">
      <q-btn :label="$t('addEmployee')" class="text-weight-bold" icon="add" @click="openAddEmployeeDialog" no-caps/>
      <q-btn :label="$t('sendEmail')" class="text-weight-bold" icon="email"
        @click="sendEmail" :disable="selectedEmployees.length === 0" no-caps/>
      <q-btn :label="$t('delete')" class="text-weight-bold" icon="delete" color="negative"
        @click="deleteSelectedEmployees" :disable="selectedEmployees.length === 0" no-caps/>
    </div>
    <q-input v-model="localSearch" debounce="500" filled :placeholder="$t('search')" class="search-input">
      <template v-slot:append>
        <q-icon name="search" />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();

const props = defineProps({
  search: String,
  selectedEmployees: Array,
});

const emit = defineEmits(['update:search', 'openAddEmployeeDialog', 'sendEmail', 'deleteSelectedEmployees']);
const localSearch = ref(props.search);

watch(localSearch, (newValue) => {
  emit('update:search', newValue);
});

const openAddEmployeeDialog = () => {
  emit('openAddEmployeeDialog');
};

const sendEmail = () => {
  emit('sendEmail');
};

const deleteSelectedEmployees = () => {
  emit('deleteSelectedEmployees');
};
</script>

<style scoped>
</style>
