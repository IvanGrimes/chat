<template>
  <v-container fluid>
    <div><user-bar /></div>
    <div>
      <router-view/>
    </div>
  </v-container>
</template>

<script>
import UserBar from '@/components/UserBar'

export default { components: { UserBar } }
</script>
