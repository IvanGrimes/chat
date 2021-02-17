<template>
  <v-toolbar>
    <v-toolbar-title>Gypsy chat</v-toolbar-title>
  </v-toolbar>
</template>

<style scoped></style>

<script>
import Vue from 'vue';
import { Component } from '@/lib/decorators';
import { useStore } from '@/lib/store';

@Component
class Header extends Vue {
  user = useStore(this.$store).user;

  updateName(ev) {
    this.user.updateName(ev.target.elements.name.value);
  }
}

export default Header;
</script>
