<template>
  <div>
    <v-row>
      <v-col cols="4">
        <room-list />
      </v-col>
      <v-col cols="8">
        <room-component :id="id" />
        <send-message :id="id" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import {Component} from "@/lib/decorators";
import RoomList from '@/components/RoomList'
import RoomComponent from '@/components/Room'
import SendMessage from '@/components/SendMessage'

@Component({ components: { RoomList, RoomComponent, SendMessage } })
class Room extends Vue {
  get id() {
    return this.$route.params.id
  }
}

export default Room
</script>
