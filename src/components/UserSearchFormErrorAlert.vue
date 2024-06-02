<script setup lang="ts">
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const search = useSearchStore()
const { notFoundUsernames } = storeToRefs(search)
</script>

<template>
  <div class="alert alert-danger alert-dismissible fade show col-6" role="alert">
    <p>A GitHub user was not found for the following <strong>usernames</strong>:</p>
    <ul>
      <li v-for="(username, index) in notFoundUsernames" :key="index" class="text-break">
        {{ username }}
      </li>
    </ul>
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
      @click="notFoundUsernames = []"
    ></button>
  </div>
</template>
