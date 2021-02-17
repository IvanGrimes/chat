<template>
  <v-row>
    <v-col cols="12">
      <v-form ref="form" @submit.prevent="updateName" autocomplete="off">
        <v-row class="flex-nowrap">
          <v-col class="flex-shrink-1" align-self="center" cols="12">
            <v-text-field
              name="name"
              v-model="name"
              :rules="rules"
              :disabled="disabled"
              placeholder="Введите ваше имя"
              full-width
            />
          </v-col>
          <v-col class="mb-5" align-self="end">
            <v-btn type="submit" color="primary" :disabled="disabled">Войти</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import Vue from 'vue';
import { Component, Prop, Ref, Watch } from '@/lib/decorators';
import { useStore } from '@/lib/store';
import { validation } from '@/lib/validation';

@Component
class UserNameInput extends Vue {
  @Prop({ type: Boolean, default: false })
  disabled;

  @Ref('form')
  form;

  user = useStore(this.$store).user;

  config = useStore(this.$store).config;

  room = useStore(this.$store).room;

  rooms = useStore(this.$store).rooms;

  name = '';

  get disabled() {
    return this.room.loading || this.rooms.loading || this.room.error || this.disabled;
  }

  @Watch('form.errorBag')
  checkValidation(value) {
    console.log(value);
  }

  get rules() {
    return [validation.required, validation.maxUsernameLength(this.config.maxUsernameLength)];
  }

  updateName() {
    if (this.form?.validate?.()) {
      this.user.updateName(this.name);

      this.name = '';

      this.form?.resetValidation?.();
    }
  }
}

export default UserNameInput;
</script>
