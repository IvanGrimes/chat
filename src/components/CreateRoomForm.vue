<template>
  <v-row>
    <v-col cols="12">
      <v-form ref="form" @submit.prevent="createRoom" autocomplete="off">
        <v-text-field
            name="room"
            v-model="roomValue"
            :rules="[rules.required, rules.maxRoomNameLength]"
            :disabled="disabled"
            placeholder="Название комнаты"
        />
        <v-text-field
            name="message"
            v-model="message"
            :rules="[rules.required, rules.maxMessageLength]"
            :disabled="disabled"
            placeholder="Сообщение"
        />
        <v-btn type="submit" color="primary" :disabled="disabled">Создать</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import {Component, Ref} from "@/lib/decorators";
import {useStore} from "@/lib/store";
import {validation} from "@/lib/validation";

@Component
class CreateRoomForm extends Vue {
  @Ref('form')
  form

  room = useStore(this.$store).room

  rooms = useStore(this.$store).rooms

  user = useStore(this.$store).user

  config = useStore(this.$store).config

  roomValue = ""

  message = ""

  get disabled() {
    return this.rooms.loading || this.rooms.error
  }

  get rules() {
    return {
      required: validation.required,
      maxRoomNameLength: validation.maxRoomNameLength(this.config.maxRoomNameLength),
      maxMessageLength: validation.maxRoomNameLength(this.config.maxMessageLength),
    }
  }

  createRoom() {
    if (this.form?.validate?.()) {
      this.room.sendMessage({ message: this.message, room: this.roomValue, username: this.user.name })

      this.$router.push(`/room/${this.roomValue}`).then(() => {
        this.roomValue = ""

        this.message = ""

        this.form?.resetValidation?.()
      })
    }
  }
}

export default CreateRoomForm
</script>
