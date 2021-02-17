import { Mutation, State } from '@/lib/decorators';
import {RoomWS} from "@/services/RoomWS";

export class User {
  @State()
  name = null;

  @Mutation()
  updateName(name) {
    this.name = name;

    RoomWS.getInstance().setUsername(name)
  }
}
