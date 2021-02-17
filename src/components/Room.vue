<template>
  <v-row ref="wrapper" class="overflow-auto">
    <v-col v-if="room.loading" cols="12">
      <template v-for="item in 10">
        <v-divider :key="item + 10"></v-divider>
        <v-skeleton-loader :key="item" type="list-item-two-line" />
      </template>
    </v-col>
    <v-col v-else-if="room.error" cols="12">
      <span class="text-caption">{{ room.error }}</span>
    </v-col>
    <v-col v-else class="fill-height" cols="12">
      <v-list two-line>
        <template v-for="(item, index) in room.history">
          <v-divider :key="index"></v-divider>
          <v-list-item :key="item.created + item.text">
            <v-list-item-content class="content">
              <v-list-item-title class="messageTitle mb-2">
                <span>{{ item.sender.username }}</span>
                <span>{{ formatDate(item.created) }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>{{ item.text }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-col>
  </v-row>
</template>

<style scoped>
.content {
  flex-direction: column;
  align-items: flex-start;
}

.content > * {
  flex-basis: auto;
  align-self: flex-start;
}

.messageTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
</style>

<script>
import Vue from 'vue';
import { Component, Prop, Ref, Watch } from '@/lib/decorators';
import { useStore } from '@/lib/store';
import { formatDate } from '@/lib/formatDate';

@Component
class Room extends Vue {
  @Prop({ type: String, required: true })
  id;

  @Ref('wrapper')
  wrapper;

  room = useStore(this.$store).room;

  formatDate = formatDate;

  created() {
    this.getHistory();
  }

  @Watch('id')
  getHistory() {
    if (!this.room.history.length) {
      this.room.get(this.id);
    }
  }

  @Watch('room.history')
  scrollBottom() {
    this.$nextTick(() => {
      if (this.wrapper) {
        this.wrapper.scrollTop = this.wrapper.scrollHeight;
      }
    });
  }
}

export default Room;
</script>
