<template>
  <v-app class="fill-height">
    <default-layout>
      <router-view />
    </default-layout>
  </v-app>
</template>

<script>
import DefaultLayout from '@/layouts/Default';

export default { components: { DefaultLayout } };
</script>
