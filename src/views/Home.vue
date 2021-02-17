<template>
  <user-name-input v-if="!this.user.name" />
</template>

<script>
import Vue from 'vue'
import UserNameInput from '@/components/UserNameInput'
import {Component} from "@/lib/decorators";
import {useStore} from "@/lib/store";

@Component({ components: { UserNameInput } })
class Home extends Vue {
  user = useStore(this.$store).user
}

export default Home
</script>
