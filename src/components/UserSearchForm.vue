<script setup lang="ts">
import UserSearchFormErrorAlert from '@/components/UserSearchFormErrorAlert.vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'

const search = useSearchStore()
const { isLoading, notFoundUsernames } = storeToRefs(search)
const username = ref<string>('')
const usernames = computed(() => username.value.split(',').map((u) => u.trim()))
const emptyUsername = ref<boolean>(false)
const onSubmit = () => {
  if (!username.value.length) {
    emptyUsername.value = true

    return
  }

  search.search(usernames.value)
}

watch(username, (newUsername, oldUsername) => {
  if (newUsername.length === 0 && oldUsername.length > 0) {
    emptyUsername.value = true
  }

  if (newUsername.length > 0 && oldUsername.length === 0) {
    emptyUsername.value = false
  }
})
</script>

<template>
  <UserSearchFormErrorAlert v-if="notFoundUsernames.length" />
  <form @submit.prevent="onSubmit" class="col-6">
    <label for="username">Usernames</label>
    <div class="d-flex mb-3 mt-2">
      <div class="col-10">
        <input
          v-model="username"
          type="text"
          name="usernames"
          id="usernames"
          class="form-control"
          :class="{ 'is-invalid': emptyUsername }"
          placeholder="Enter usernames (e.g., octocat, lowkaze), separated by commas"
        />
        <div v-if="emptyUsername" class="invalid-feedback">Please enter at least one username.</div>
      </div>
      <div class="col-2">
        <button class="btn btn-primary w-100" type="submit" :disabled="isLoading">
          <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span v-if="isLoading" class="visually-hidden" role="status">Loading...</span>
          <span v-if="!isLoading">Search</span>
        </button>
      </div>
    </div>
  </form>
</template>
