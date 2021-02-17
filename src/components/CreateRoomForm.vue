<template>
  <v-row>
    <v-col cols="12">
      <v-form @submit.prevent="createRoom">
        <v-text-field name="room" placeholder="Название комнаты" />
        <v-text-field name="message" placeholder="Сообщение" />
        <v-btn type="submit">Создать</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import {Component} from "@/lib/decorators";
import {useStore} from "@/lib/store";

@Component
class CreateRoomForm extends Vue {
  room = useStore(this.$store).room

  user = useStore(this.$store).user

  createRoom(ev) {
    const {room,message} = ev.target.elements

    this.room.sendMessage({ message: message.value, room: room.value, username: this.user.name })

    this.$router.push(`/room/${room.value}`)
  }
}

export default CreateRoomForm
</script>
