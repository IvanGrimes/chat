<template>
  <v-row ref="wrapper" class="overflow-auto">
    <v-col class="fill-height" cols="12">
      <v-list two-line>
        <template v-for="(item, index) in room.history">
          <v-divider :key="index"></v-divider>
          <v-list-item :key="item.created + item.text">
            <v-list-item-content class="content">
              <v-list-item-title>{{item.sender.username}}</v-list-item-title>
              <v-list-item-subtitle>{{item.text}}</v-list-item-subtitle>
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
</style>

<script>
import Vue from 'vue'
import {Component, Prop, Ref, Watch} from "@/lib/decorators";
import {useStore} from "@/lib/store";

@Component
class Room extends Vue {
  @Prop({ type: String, required: true })
  id

  @Ref('wrapper')
  wrapper

  room = useStore(this.$store).room

  loading = false

  created() {
    this.getHistory()
  }

  @Watch('id')
  async getHistory() {
    this.loading = true

    await this.room.get(this.id)

    this.loading = false
  }

  @Watch('room.history')
  scrollBottom() {
      this.$nextTick(() => {
        if (this.wrapper) {
          this.wrapper.scrollTop = this.wrapper.scrollHeight
        }
      })
  }
}

export default Room
</script>
