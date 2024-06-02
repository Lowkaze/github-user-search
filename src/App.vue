<script setup lang="ts">
import UserCard from '@/components/UserCard.vue'
import UserSearchForm from '@/components/UserSearchForm.vue'
import { useSearchStore } from '@/stores/search'
import { storeToRefs } from 'pinia'

const search = useSearchStore()
const { foundUsers } = storeToRefs(search)
</script>

<template>
  <div class="container pt-5">
    <div class="row d-flex flex-column g-0 align-items-center">
      <h1 class="col-6">GitHub User Search</h1>
      <UserSearchForm />
      <UserCard v-for="user in foundUsers" :key="user.id" :user />
    </div>
  </div>
</template>
