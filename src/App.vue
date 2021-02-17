<template>
  <v-app class="fill-height">
    <default-layout>
      <router-view />
    </default-layout>
  </v-app>
</template>

<script>
import DefaultLayout from '@/layouts/Default'

// @todo: редирект с создания комнаты, если нет имени
// @todo: skeleton
// @todo: верстка
export default { components: { DefaultLayout } }
</script>
