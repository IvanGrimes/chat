import {Action, Mutation, State} from "@/lib/decorators";
import {http} from "@/lib/http";
import {RoomWS} from "@/services/RoomWS";

export class Rooms {
  constructor() {
    RoomWS.getInstance().socket.on(data => {
      this.updateList(this.list.map(item => {
        if (item.name === data.room) {
          return {
            ...item,
            lastMessage: data
          }
        }

        return item
      }))
    })
  }


  @State()
  list = []

  @Mutation()
  updateList(list) {
    this.list = list
  }

  @Action()
  async getList() {
    try {
      const list = await http.get('/rooms')
        .then(({data}) => data.result.map(({last_message, ...item}) => ({id: item.name + last_message.text, lastMessage: last_message, ...item})))

      this.updateList(list)
    } catch (e) {
      console.log('rooms/getList', e)
    }
  }
}
