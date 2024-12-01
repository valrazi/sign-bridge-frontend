const initialState = {
  isModal: false,
  logoutModal: false,
  unauthorizedModal: false,
  adminSidebar: false
};

export const useUserStore = defineStore("user", {
  state: () => initialState,
  actions: {
    showModal() {
      this.isModal = true
    },
    hideModal() {
      this.isModal = false
    },
    showLogout() {
      this.logoutModal = true
    },
    hideLogout() {
      this.logoutModal = false
    },
    showUnauthorized() {
      this.unauthorizedModal = true
    },
    hideUnauthorized() {
      this.unauthorizedModal = false
    },
    showAdminSidebar() {
      this.adminSidebar = true
    },
    hideAdminSidebar() {
      this.adminSidebar = false
    }
  },
});
