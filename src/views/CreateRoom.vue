<template>
  <div>
    <create-room-form v-if="this.user.name" />
    <user-name-input v-else />
  </div>
</template>

<script>
import Vue from 'vue';
import RoomList from '@/components/RoomList';
import CreateRoomForm from '@/components/CreateRoomForm';
import UserNameInput from '@/components/UserNameInput';
import { Component } from '@/lib/decorators';
import { useStore } from '@/lib/store';

@Component({ components: { RoomList, CreateRoomForm, UserNameInput } })
class CreateRoom extends Vue {
  user = useStore(this.$store).user;
}

export default CreateRoom;
</script>
