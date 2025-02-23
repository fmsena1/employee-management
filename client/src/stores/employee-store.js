import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { useAuthStore } from './auth-store';

const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [],
    shirtSizes: ['PP', 'P', 'M', 'G', 'GG', 'EXG', "EX1", "EX2", "EX3", "EX4", "EX5", "EX6"],
  }),

  getters: {
    filteredEmployees: (state) => (search) => {
      return state.employees.filter(employee => {
        return (
          employee.cpf.toLowerCase().includes(search.toLowerCase()) ||
          employee.name.toLowerCase().includes(search.toLowerCase()) ||
          employee.email.toLowerCase().includes(search.toLowerCase()) ||
          employee.shirtSize.toLowerCase().includes(search.toLowerCase()) ||
          (employee.shoeSize && employee.shoeSize.toString().includes(search))
        );
      });
    },
  },

  actions: {
    async fetchEmployees(router) {
      const authStore = useAuthStore();
      try {
        const response = await api.get('/employees');
        this.employees = response.data;
      } catch (error) {
        console.error('Error fetching employees:', error);
        if (error.response && error.response.status === 401) {
          authStore.logout(router);
        }
      }
    },
    async addEmployee(employee) {
      if (!cpfRegex.test(employee.cpf)) {
        throw new Error('errorCreate');
      }
      if (!emailRegex.test(employee.email)) {
        throw new Error('errorCreate');
      }
      try {
        const response = await api.post('/employees/create', employee);
        this.employees.push(response.data);
      } catch (error) {
        console.error('Error adding employee:', error);
        throw new Error('errorCreate');
      }
    },
    async updateEmployee(updatedEmployee) {
      console.log(updatedEmployee);
      if (updatedEmployee.cpf && !cpfRegex.test(updatedEmployee.cpf)) {
        throw new Error('updateError');
      }
      if (updatedEmployee.email && !emailRegex.test(updatedEmployee.email)) {
        throw new Error('updateError');
      }
      try {
        const response = await api.put(`/employees/${updatedEmployee.id}`, updatedEmployee);
        console.log(response.data);
        const index = this.employees.findIndex(employee => employee.id === updatedEmployee.id);
        if (index !== -1) {
          this.employees[index] = response.data;
        }
      } catch (error) {
        console.error('Error updating employee:', error);
        throw new Error('updateError');
      }
    },
    async deleteSelectedEmployees(ids) {
      try {
        await api.delete('/employees', { data: { ids } });
        this.employees = this.employees.filter(employee => !ids.includes(employee.id));
      } catch (error) {
        console.error('Error deleting employees:', error);
        throw new Error('deleteError');
      }
    },
    async sendEmail(ids) {
      try {
        await api.post('/employees/send', { ids });
      } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('sendEmailError');
      }
    },
  },
});
