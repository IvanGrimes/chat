<template>
  <v-row class="fill-height">
    <v-col class="fill-height" cols="12">
      <v-card v-if="user.name" class="mb-4 pa-4 d-flex align-center" outlined>
        <v-avatar class="mr-4" size="32" color="teal" rounded>
          <span class="white--text headline">{{ user.name.charAt(0) }}</span>
        </v-avatar>
        <span class="subtitle-1">{{ user.name }}</span>
      </v-card>
      <v-btn
        color="primary"
        class="mb-3"
        to="/room/create"
        width="100%"
        :disabled="this.rooms.loading || this.rooms.error"
        >Создать комнату
      </v-btn>
      <div v-if="rooms.loading">
        <template v-for="item in 10">
          <v-divider :key="item + 10"></v-divider>
          <v-skeleton-loader :key="item" type="list-item-two-line" />
        </template>
      </div>
      <div v-else-if="rooms.error" class="text-caption">{{ rooms.error }}</div>
      <v-list v-else :class="[user.name && 'authList', 'list overflow-auto']" three-line>
        <template v-for="(item, index) in rooms.list">
          <v-divider :key="index"></v-divider>
          <v-list-item :key="item.name" class="item" ripple :to="`/room/${item.name}`">
            <v-list-item-content class="content">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
              <v-list-item-subtitle class="font-weight-medium">{{
                formatDate(item.lastMessage.created)
              }}</v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ item.lastMessage.sender.username }}: {{ item.lastMessage.text }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped>
.list {
  height: calc(100% - 60px);
}

.list > *:last-child {
  padding-bottom: 32px;
}

.authList {
  height: calc(100% - 140px) !important;
}

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
import Vue from 'vue';
import { Component } from '@/lib/decorators';
import { useStore } from '@/lib/store';
import UserNameInput from './UserNameInput';
import { formatDate } from '@/lib/formatDate';
@Component({ components: { UserNameInput } })
class RoomList extends Vue {
  user = useStore(this.$store).user;

  rooms = useStore(this.$store).rooms;

  formatDate = formatDate;

  created() {
    this.rooms.getList();
  }
}

export default RoomList;
</script>
