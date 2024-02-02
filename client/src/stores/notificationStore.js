import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';


export const useNotificationStore = defineStore('NotificationStore', () => {
  const userState = ref(null);
  const tokenState = ref(null);
  const loading = ref(true);
  const toast = useToast();
  const searchTerm = ref("");



  const setLoading = () => {
    loading.value = false;
  }

  const showSuccess = (message, detail) => {
    toast.add({ severity: 'success', summary: message, detail: detail, group: 'br', life: 10000 });
  };
  const showError = (message, detail) => {
    toast.add({ severity: 'error', summary: message, detail: detail, group: 'br', life: 10000 });
};


  return {
    loading,
    setLoading,
    showSuccess,
    showError,
    searchTerm
  };
});
