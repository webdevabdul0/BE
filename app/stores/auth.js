import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null,
    isAuthenticated: false,
  }),

  actions: {
    async login(email, password) {
      try {
        const response = await $fetch('/api/auth/login', {
          method: 'POST',
          body: { email, password}
        })

        if (response.code === 1) {
          this.user = response.data.user
          this.token = response.data.token
          this.isAuthenticated = true
          
          navigateTo('/dashboard')
        } else {
          throw new Error(response.error || 'Login failed')
        }
      } catch (error) {
        console.error('Login error:', error)
        throw error
      }
    },

    logout() {
      this.user = null
      this.token = null
      this.isAuthenticated = false
      navigateTo('/login')
    }
  }
})