import {Action, Mutation, State} from "@/lib/decorators";
import {http} from "@/lib/http";

export class Config {
  constructor() {
    this.get()
  }

  @State()
  maxMessageLength = 10500

  @State()
  maxRoomNameLength = 50

  @State()
  maxUsernameLength = 50

  @Mutation()
  update({ maxMessageLength, maxRoomNameLength, maxUsernameLength }) {
    this.maxMessageLength = maxMessageLength
    this.maxRoomNameLength = maxRoomNameLength
    this.maxUsernameLength = maxUsernameLength
  }

  @Action()
  async get() {
    try {
      const settings = await http.get('/settings')
        .then(({ data: { result: { max_message_length, max_room_title_length, max_username_length } }}) => ({
          maxMessageLength: max_message_length,
          maxRoomNameLength: max_room_title_length,
          maxUsernameLength: max_username_length
        }))

      this.update(settings)
    } catch (e) {
      console.log('config/getSettings', e)
    }
  }
}
