import {Rooms} from "./Rooms";
import {Module} from "@/lib/decorators";
import {Room} from "./Room";
import {User} from "./User";
import {Config} from './Config'

export class Store {
  @Module()
  rooms = new Rooms()

  @Module()
  room = new Room()

  @Module()
  user = new User()

  @Module()
  config = new Config()
}
