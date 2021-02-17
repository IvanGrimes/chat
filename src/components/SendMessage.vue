<template>
  <v-row>
    <v-col cols="12">
      <v-form v-if="user.name" ref="form" @submit.prevent="sendMessage" autocomplete="off">
        <v-row class="align-end flex-nowrap">
          <v-col class="flex-shrink-1" cols="12">
            <v-text-field
              name="message"
              v-model="message"
              :rules="rules"
              placeholder="Введите ваше сообщение"
              :disabled="disabled"
              full-width
            />
          </v-col>
          <v-col class="mb-5">
            <v-btn type="submit" color="primary" :disabled="disabled">Отправить</v-btn>
          </v-col>
        </v-row>
      </v-form>
      <user-name-input v-else />
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import { Component, Prop, Ref } from '@/lib/decorators';
import { useStore } from '@/lib/store';
import UserNameInput from './UserNameInput';
import { validation } from '@/lib/validation';

@Component({ components: { UserNameInput } })
class SendMessage extends Vue {
  @Prop({ type: String, required: true })
  id;

  @Ref('form')
  form;

  room = useStore(this.$store).room;

  user = useStore(this.$store).user;

  config = useStore(this.$store).config;

  get disabled() {
    return this.room.loading || this.room.error
  }

  get rules() {
    return [validation.required, validation.maxRoomNameLength(this.config.maxMessageLength)];
  }

  message = '';

  sendMessage() {
    if (this.form?.validate?.()) {
      this.room.sendMessage({ username: this.user.name, message: this.message });

      this.message = '';

      this.form?.resetValidation?.();
    }
  }
}

export default SendMessage;
</script>
