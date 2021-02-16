import {Rooms} from "./Rooms";
import {Module} from "@/lib/decorators";
import {Room} from "./Room";
import {User} from "@/store/User";

export class Store {
  @Module()
  rooms = new Rooms()

  @Module()
  room = new Room()

  @Module()
  user = new User()
}
