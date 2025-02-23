<template>
  <q-page>
    <div class="q-pa-md full-height">
      <TableHeader
        :search="search"
        :selectedEmployees="selectedEmployees"
        @update:search="search = $event"
        @openAddEmployeeDialog="openAddEmployeeDialog"
        @sendEmail="sendEmail(getSelectedEmployeeIds())"
        @deleteSelectedEmployees="deleteSelectedEmployees(getSelectedEmployeeIds())"
      />
      <TableEmployee
        :rows="filteredEmployees"
        :columns="columns"
        :selected="selectedEmployees"
        @editRow="openEditEmployeeDialog"
        @sendEmail="sendEmail"
        @deleteRow="deleteSelectedEmployees"
        @update:selected="selectedEmployees = $event"
      />
    </div>

    <EmployeeDialog :isOpen="isEmployeeDialogOpen" :employee="currentEmployee" :isEditMode="isEditMode"
      @update:isOpen="isEmployeeDialogOpen = $event" @employeeAdded="fetchEmployees"
      @employeeUpdated="fetchEmployees" />
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import { useEmployeeStore } from 'src/stores/employee-store';
import EmployeeDialog from 'src/components/EmployeeDialog.vue';
import TableHeader from 'src/components/TableHeader.vue';
import TableEmployee from 'src/components/TableEmployee.vue';
import 'src/css/ListEmployeePage.scss';
import { useRouter } from 'vue-router';

const { t: $t } = useI18n();
const $q = useQuasar();
const search = ref('');
const isEmployeeDialogOpen = ref(false);
const isEditMode = ref(false);
const currentEmployee = ref({
  cpf: '',
  name: '',
  email: '',
  shirtSize: '',
  shoeSize: null,
});
const selectedEmployees = ref([]);
const router = useRouter();

const employeeStore = useEmployeeStore();

const columns = [
  { name: 'select', align: 'left', label: '', field: 'select', sortable: false },
  { name: 'cpf', required: true, label: $t('cpf'), align: 'left', field: row => row.cpf, format: val => `${val}`, sortable: true },
  { name: 'name', align: 'left', label: $t('name'), field: row => row.name, sortable: true },
  { name: 'email', align: 'left', label: $t('email'), field: row => row.email, sortable: true },
  { name: 'shirtSize', align: 'left', label: $t('shirtSize'), field: row => row.shirtSize, sortable: true },
  { name: 'shoeSize', align: 'left', label: $t('shoeSize'), field: row => row.shoeSize, sortable: true },
  { name: 'actions', align: 'right', label: $t('actions'), field: 'actions', sortable: false },
];

const filteredEmployees = computed(() => {
  return employeeStore.filteredEmployees(search.value);
});

const openAddEmployeeDialog = () => {
  isEditMode.value = false;
  currentEmployee.value = {
    cpf: '',
    name: '',
    email: '',
    shirtSize: '',
    shoeSize: null,
  };
  isEmployeeDialogOpen.value = true;
};

const openEditEmployeeDialog = (employee) => {
  isEditMode.value = true;
  currentEmployee.value = { ...employee };
  isEmployeeDialogOpen.value = true;
};

const getSelectedEmployeeIds = () => {
  return selectedEmployees.value.map(employee => employee.id);
};

const deleteSelectedEmployees = async (ids) => {
  try {
    await employeeStore.deleteSelectedEmployees(ids);
    $q.notify({
      type: 'positive',
      message: $t('notifications.deleteSuccess'),
      position: 'top-right'
    });
    selectedEmployees.value = [];
    fetchEmployees();
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: $t('notifications.deleteError', { error: error.message }),
      position: 'top-right'
    });
  }
};

const sendEmail = async (ids) => {
  try {
    await employeeStore.sendEmail(ids);
    $q.notify({
      type: 'positive',
      message: $t('notifications.sendEmailSuccess'),
      position: 'top-right'
    });
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: $t('notifications.sendEmailError', { error: error.message }),
      position: 'top-right'
    });
  }
};

const fetchEmployees = () => {
  employeeStore.fetchEmployees(router);
};

onMounted(() => {
  fetchEmployees();
});
</script>
