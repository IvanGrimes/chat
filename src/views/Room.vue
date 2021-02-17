<template>
  <div class="fill-height">
    <room-component class="room" :id="id" />
    <send-message :id="id" />
  </div>
</template>

<style scoped>
.room {
  height: calc(100% - 110px);
}
</style>

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
