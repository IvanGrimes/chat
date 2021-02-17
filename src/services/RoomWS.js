import { WS } from '@/lib/ws';

const enforcer = Symbol('singleton');

export class RoomWS {
  static instance = null;

  static getInstance() {
    if (!RoomWS.instance) {
      RoomWS.instance = new RoomWS(enforcer);
    }

    return RoomWS.instance;
  }

  constructor(enforce) {
    if (enforce !== enforcer) {
      throw new Error('You cannot create instantiate Singleton class');
    }

    this.socket = new WS();
  }
}
