<template>
  <v-row>
    <v-col cols="12">
      <form @submit.prevent="updateName">
        <v-text-field name="name" outlined placeholder="Введите ваше имя" />
        <v-btn type="submit">Ок</v-btn>
      </form>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>

<script>
import Vue from 'vue'
import {Component} from "@/lib/decorators";
import {useStore} from "@/lib/store";

@Component
class UserNameInput extends Vue {
  user = useStore(this.$store).user

  updateName(ev) {
    this.user.updateName(ev.target.elements.name.value)
  }
}

export default UserNameInput
</script>
