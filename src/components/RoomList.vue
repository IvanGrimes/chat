<template>
  <v-row>
    <v-col cols="12">
      <v-btn v-if="user.name" to="/room/create">Создать комнату</v-btn>
      <v-list two-line>
        <template v-for="(item, index) in rooms.list">
          <v-divider :key="index"></v-divider>
          <v-list-item :key="item.name" class="item" ripple :to="`/room/${item.name}`">
            <v-list-item-content class="content">
              <v-list-item-title>{{item.name}}</v-list-item-title>
              <v-list-item-subtitle>{{item.lastMessage.sender.username}}: {{item.lastMessage.text}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped>
.item {
  cursor: pointer;
}

.content {
  flex-direction: column;
  align-items: flex-start;
}

.content > * {
  flex-basis: auto;
  align-self: flex-start;
}
</style>

<script>
import Vue from 'vue'
import {Component} from "@/lib/decorators";
import {useStore} from "@/lib/store";

@Component
class RoomList extends Vue {
  user = useStore(this.$store).user

  rooms = useStore(this.$store).rooms

  loading = false

  async created() {
    this.loading = true

    await this.rooms.getList()

    this.loading = false
  }
}

export default RoomList
</script>
