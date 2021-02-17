import {Action, Mutation, State} from "@/lib/decorators";
import {http} from "@/lib/http";
import {RoomWS} from "@/services/RoomWS";

export class Rooms {
  constructor() {
    RoomWS.getInstance().socket.on(data => {
      if (this.list.some(item => item.name === data.room)) {
        this.updateList(this.list.map(item => {
          if (item.name === data.room) {
            return {
              ...item,
              lastMessage: data
            }
          }

          return item
        }))
      } else {
        this.updateList([{ name: data.room, lastMessage: data }, ...this.list])
      }
    })
  }

  @State()
  list = []

  @State()
  error = null

  @State()
  loading = false

  @Mutation()
  updateList(list) {
    this.list = list
  }

  @Mutation()
  updateLoading(loading) {
    this.loading = loading
  }

  @Mutation()
  updateError(error) {
    this.error = error
  }

  @Action()
  async getList() {
    this.updateError(null)
    this.updateLoading(true)

    try {
      const list = await http.get('/rooms')
        .then(({data}) => data.result.map(({last_message, ...item}) => ({lastMessage: last_message, ...item})))

      this.updateList(list)
    } catch (e) {
      console.log('rooms/getList', e)
      this.updateError('При загрузке списка комнат произошла ошибка')
    }

    this.updateLoading(false)
  }
}
