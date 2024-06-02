import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  const isLoading = ref<boolean>(false)
  const foundUsers = ref<User[]>([])
  const notFoundUsernames = ref<string[]>([])
  const search = async (usernames: string[]) => {
    isLoading.value = true
    foundUsers.value = []
    notFoundUsernames.value = []

    try {
      for (const username of usernames) {
        const response = await fetch(`https://api.github.com/users/${username}`)

        if (!response.ok) {
          notFoundUsernames.value.push(username)

          continue
        }

        foundUsers.value.push(await response.json())
      }
    } finally {
      isLoading.value = false
    }
  }

  return { isLoading, foundUsers, notFoundUsernames, search }
})
