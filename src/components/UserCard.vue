<script setup lang="ts">
import type { User } from '@/types/user'

defineProps<{ user: User }>()
</script>

<template>
  <div class="card mb-3 col-6">
    <div class="row g-0">
      <div class="col-2">
        <img :src="user.avatar_url" class="img-fluid rounded-start" />
      </div>
      <div class="col-10">
        <div class="card-body">
          <h5 class="card-title">{{ user.name }}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">{{ user.login }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>
