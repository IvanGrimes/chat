<template>
  <div v-if="user.name">
    <v-form ref="form">
      <v-text-field name="message" v-model="message" :rules="rules" />
      <v-btn @click="sendMessage">Отправить</v-btn>
    </v-form>
  </div>
  <div v-else>
    <user-name-input />
  </div>
</template>

<script>
import Vue from 'vue'
import {Component, Prop, Ref} from "@/lib/decorators";
import {useStore} from "@/lib/store";
import UserNameInput from './UserNameInput'
import {validation} from "@/lib/validation";

@Component({ components: { UserNameInput } })
class SendMessage extends Vue {
  @Prop({ type: String, required: true })
  id

  @Ref('form')
  form

  room = useStore(this.$store).room

  user = useStore(this.$store).user

  config = useStore(this.$store).config

  get rules() {
    return [validation.required, validation.maxRoomNameLength(this.config.maxMessageLength)]
  }

  message = ""

  sendMessage() {
    if (this.form?.validate?.()) {
      this.room.sendMessage({ username: this.user.name, message: this.message })

      this.message = ""

      this.form?.resetValidation?.()
    }
  }
}

export default SendMessage
</script>
