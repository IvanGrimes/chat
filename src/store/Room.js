import { Action, Mutation, State } from '@/lib/decorators';
import { http } from '@/lib/http';
import { RoomWS } from '@/services/RoomWS';

export class Room {
  constructor() {
    RoomWS.getInstance().socket.on(data => {
      if (this.id === data.room) {
        if (!this.cache[data.room]) {
          this.cache[data.room] = data;
        }
        this.pushHistory(data);
      }
    });
  }

  cache = {};

  @State()
  id = null;

  @State()
  history = [];

  @State()
  loading = false;

  @State()
  error = null;

  @Mutation()
  pushHistory(item) {
    this.history.push(item);
  }

  @Mutation()
  updateId(id) {
    this.id = id;
  }

  @Mutation()
  updateHistory(history) {
    this.history = history;
  }

  @Mutation()
  updateLoading(loading) {
    this.loading = loading;
  }

  @Mutation()
  updateError(error) {
    this.error = error;
  }

  @Action()
  async get(roomId) {
    this.updateError(null);
    this.updateLoading(true);

    try {
      const fromCache = this.cache[roomId];

      this.updateId(roomId);

      if (fromCache) {
        this.updateHistory(fromCache);
      } else {
        const list = await http.get(`/rooms/${roomId}/history`).then(({ data }) => data.result);

        this.cache[roomId] = list;
        this.updateHistory(list);
      }
    } catch (e) {
      console.log('room/get', e);
      this.updateError('При загрузке истории сообщение произошла ошибка');
    }

    this.updateLoading(false);
  }

  @Action()
  sendMessage({ username, message, room }) {
    RoomWS.getInstance()
      .socket.setUrl(`wss://nane.tada.team/ws?username=${username}`)
      .send({ text: message, room: room || this.id });
  }
}
