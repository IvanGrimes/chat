<template>
  <v-row>
    <v-col cols="12">
      <user-name-input v-if="!user.name" />
      <div v-else>{{user.name}}</div>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>

<script>
import Vue from 'vue'
import {Component} from "@/lib/decorators";
import {useStore} from "@/lib/store";
import UserNameInput from './UserNameInput'

@Component({ components: {UserNameInput} })
class UserBar extends Vue {
  user = useStore(this.$store).user

  updateName(ev) {
    this.user.updateName(ev.target.elements.name.value)
  }
}

export default UserBar
</script>
