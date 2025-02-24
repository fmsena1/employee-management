<template>
  <div class="table-container">
    <q-table :rows="rows" :columns="columns" row-key="id" selection="multiple" v-model:selected="localSelected">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn flat round icon="edit" @click="editRow(props.row)">
            <q-tooltip class="bg-grey-10 shadow-4">{{ $t('edit') }}</q-tooltip>
          </q-btn>
          <q-btn flat round icon="email" @click="sendEmail([props.row.id])">
            <q-tooltip class="bg-grey-10 shadow-4">{{ $t('sendEmail') }}</q-tooltip>
          </q-btn>
          <q-btn flat round icon="delete" @click="deleteRow([props.row.id])">
            <q-tooltip class="bg-grey-10 shadow-4">{{ $t('delete') }}</q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:no-data>
        <div class="no-data-container">
          <q-icon name="warning" size="4em" />
          <span class="no-data-text">{{ $t('noDataAvailable') }}</span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
const { t: $t } = useI18n();

const props = defineProps({
  rows: Array,
  columns: Array,
  selected: Array,
});

const emit = defineEmits(['editRow', 'sendEmail', 'deleteRow', 'update:selected']);

const localSelected = ref([...props.selected]);

watch(() => props.selected, (newVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(localSelected.value)) {
    localSelected.value = [...newVal];
  }
});

watch(localSelected, (newVal) => {
  if (JSON.stringify(newVal) !== JSON.stringify(props.selected)) {
    emit('update:selected', newVal);
  }
});

const editRow = (row) => {
  emit('editRow', row);
};

const sendEmail = (ids) => {
  emit('sendEmail', ids);
};

const deleteRow = (ids) => {
  emit('deleteRow', ids);
};
</script>

<style scoped lang="scss">
@import 'src/css/TableEmployee.scss';
</style>
