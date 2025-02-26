<template>
  <div class="q-gutter-md row items-center justify-between">
    <div class="row items-center q-gutter-sm">
      <q-btn :label="$t('addEmployee')" class="text-weight-bold" icon="add" @click="openAddEmployeeDialog" no-caps/>
      <q-btn :label="$t('delete')" class="text-weight-bold" icon="delete" color="primary"
        @click="deleteSelectedEmployees" :disable="selectedEmployees.length === 0" no-caps/>
    </div>
    <q-input v-model="localSearch" debounce="500" data-test-id="input-search" filled :placeholder="$t('search')" class="search-input" color="grey-8">
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

const emit = defineEmits(['update:search', 'openAddEmployeeDialog', 'deleteSelectedEmployees']);
const localSearch = ref(props.search);

watch(localSearch, (newValue) => {
  emit('update:search', newValue);
});

const openAddEmployeeDialog = () => {
  emit('openAddEmployeeDialog');
};

const deleteSelectedEmployees = () => {
  emit('deleteSelectedEmployees');
};
</script>

<style scoped>
</style>
