import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import axios from 'axios';


export const useUserStore = defineStore('UserStore', () => {
  const userState = ref(null);
  const tokenState = ref(null);
  const loading = ref(true);
  const toast = useToast();

  const setUser = (user) => {
    userState.value = user;
    // Store userState as a cookie
    // document.cookie = `userState=${JSON.stringify(user)}; path=/;`;
    loading.value = false;
  };


  // Function to get the value of a cookie by its name
  const getCookie = (name) => {
          const cookies = document.cookie.split(';');
          
          for (const cookie of cookies) {
              const [cookieName, cookieValue] = cookie.trim().split('=');
  
              if (cookieName === name) {
              return JSON.parse(cookieValue); // Parse the JSON value if needed
              }
          }
  
          return null; // Cookie not found
  }

  const fetchUserProfile = (tokenCookie) =>{
    if (tokenCookie) {
      const endpointUrl = '/api/v1/user';
      axios.get(endpointUrl, {
          headers:{
              "Authorization": `Bearer ${tokenCookie.token}`
          }
      }).then((res)=>{
          console.log(res);
          setUser(res.data)
          showSuccess(res.data.username);
      }).catch((err)=>{
          console.log(err);
      })
      console.log(tokenCookie.token);
      } else {
        console.log('Token cookie not found');
      }
  }

  const setToken = (token) => {
    tokenState.value = token;
    document.cookie = `token=${JSON.stringify(token)}; path=/;`;
    loading.value = false;
  }

  const setLoading = () => {
    loading.value = false;
  }

  const showSuccess = (message, detail) => {
    toast.add({ severity: 'success', summary: message, detail: detail, group: 'br', life: 10000 });
  };
  const showError = (message, detail) => {
    toast.add({ severity: 'error', summary: message, detail: detail, group: 'br', life: 10000 });
};

const showWarn = (message, detail) => {
  toast.add({ severity: 'warning', summary: message, detail: detail, group: 'br', life: 10000 });
};


  return {
    userState,
    setUser,
    loading,
    setLoading,
    showSuccess,
    showError,
    showWarn,
    tokenState,
    setToken,
    fetchUserProfile,
    getCookie
  };
}, {
  persist: {
    async rehydrated() {
      // Retrieve userState from cookies
      const cookies = document.cookie.split(';').map(cookie => cookie.trim());
      const savedUserStateCookie = cookies.find(cookie => cookie.startsWith('userState='));
      if (savedUserStateCookie) {
        try {
          const savedUserState = savedUserStateCookie.split('=')[1];
          const parsedUserState = JSON.parse(savedUserState);
          // Update userState with the parsed value
          setUser(parsedUserState);
        } catch (error) {
          console.error('Error parsing userState from cookie:', error);
        }
      }
    },
  },
});
