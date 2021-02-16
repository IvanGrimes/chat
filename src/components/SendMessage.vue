<template>
  <div v-if="user.name">
    <form @submit.prevent="sendMessage">
      <v-text-field name="message" />
      <v-btn type="submit">Отправить</v-btn>
    </form>
  </div>
  <div v-else>
    <div>Прежде чем отправлять сообщения укажите свое имя</div>
    <user-name-input />
  </div>
</template>

<script>
import Vue from 'vue'
import {Component, Prop} from "@/lib/decorators";
import {useStore} from "@/lib/store";
import UserNameInput from './UserNameInput'

@Component({ components: { UserNameInput } })
class SendMessage extends Vue {
  @Prop({ type: String, required: true })
  id

  room = useStore(this.$store).room

  user = useStore(this.$store).user

  sendMessage(ev) {
    this.room.sendMessage({ username: this.user.name, message: ev.target.elements.message.value })
  }
}

export default SendMessage
</script>
