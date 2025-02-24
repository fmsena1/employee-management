<template>
  <q-dialog v-model="localIsOpen">
    <q-card style="width: 600px;">
      <q-card-section class="q-gutter-sm row items-center justify-between">
        <div class="text-h4">{{ isEditMode ? $t('editEmployeeDialogTitle') : $t('addEmployeeDialogTitle') }}</div>
        <q-btn flat icon="close" @click="closeDialog" />
      </q-card-section>

      <q-card-section>
        <q-input v-model="_employee.cpf" :label="$t('cpf')" :readonly="isEditMode" color="grey-8" maxlength="14"
          :rules="[val => !!val || $t('fieldRequired')]" />
        <q-input v-model="_employee.name" :label="$t('name')" color="grey-8"
          :rules="[val => !!val || $t('fieldRequired')]" />
        <div class="card-section">
          <q-input v-model="_employee.email" :label="$t('email')" color="grey-8" />
          <q-select v-model="_employee.shirtSize" :options="shirtSizes" :label="$t('shirtSize')" color="grey-8" />
          <q-input v-model="_employee.shoeSize" :label="$t('shoeSize')" type="number" :min="1" color="grey-8" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn color="primary" :label="$t('cancel')" @click="closeDialog" no-caps />
        <q-btn color="dark" :label="isEditMode ? $t('update') : $t('add')"
          @click="isEditMode ? updateEmployee() : createEmployee()" no-caps />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { formatCPF } from 'src/utils/formatCPF';
import { useEmployeeStore } from 'src/stores/employee-store';
import { parseError } from 'src/utils/errorMap';

const { t: $t } = useI18n();
const $q = useQuasar();
const employeeStore = useEmployeeStore();

const props = defineProps({
  isOpen: Boolean,
  employee: Object,
  isEditMode: Boolean,
});

const emit = defineEmits(['update:isOpen', 'employeeAdded', 'employeeUpdated']);
const localIsOpen = ref(props.isOpen);

watch(() => props.isOpen, (newVal) => {
  localIsOpen.value = newVal;
});

watch(localIsOpen, (newVal) => {
  emit('update:isOpen', newVal);
});

const _employee = ref({ ...props.employee });

watch(() => props.employee, (newVal) => {
  _employee.value = { ...newVal };
});

const shirtSizes = employeeStore.shirtSizes;

const createEmployee = async () => {
  try {
    await employeeStore.addEmployee({ ..._employee.value });
    $q.notify({
      type: 'positive',
      message: $t('notifications.successCreate'),
      position: 'top-right'
    });
    emit('employeeAdded');
    closeDialog();
  } catch (error) {
    const errorMessageKey = parseError(error.message);
    $q.notify({
      type: 'negative',
      message: $t(`notifications.${errorMessageKey}`, { error: error.message }),
      position: 'top-right'
    });
  }
};

const updateEmployee = async () => {
  try {
    await employeeStore.updateEmployee({ ..._employee.value });
    $q.notify({
      type: 'positive',
      message: $t('notifications.updateSuccess'),
      position: 'top-right'
    });
    emit('employeeUpdated');
    closeDialog();
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: $t('notifications.updateError', { error: error.message }),
      position: 'top-right'
    });
  }
};

const closeDialog = () => {
  localIsOpen.value = false;
};

watch(() => _employee.value.cpf, (newVal) => {
  _employee.value.cpf = formatCPF(newVal);
});

</script>
<style scoped lang="scss">
@import 'src/css/EmployeeDialog.scss';
</style>
