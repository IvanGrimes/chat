<template>
  <div class="fill-height">
    <div><header-component /></div>
    <v-container class="fill-height" fluid>
      <v-row class="fill-height">
        <v-col class="fill-height overflow-auto" cols="4">
          <room-list />
        </v-col>
        <v-col class="fill-height overflow-auto" cols="8">
          <slot />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import HeaderComponent from "@/components/Header";
import RoomList from '@/components/RoomList'

export default { components: { HeaderComponent, RoomList } }
</script>
