<template>
  <div class="fill-height">
    <room-component class="room" :id="id" />
    <send-message :class="user.name && 'message'" :id="id" />
  </div>
</template>

<style scoped>
.room {
  height: calc(100% - 130px);
}

.message {
  align-items: flex-end;
  height: 105px;
}
</style>

<script>
import Vue from 'vue';
import { Component } from '@/lib/decorators';
import RoomList from '@/components/RoomList';
import RoomComponent from '@/components/Room';
import SendMessage from '@/components/SendMessage';
import { useStore } from '@/lib/store';

@Component({ components: { RoomList, RoomComponent, SendMessage } })
class Room extends Vue {
  user = useStore(this.$store).user;

  get id() {
    return this.$route.params.id;
  }
}

export default Room;
</script>
