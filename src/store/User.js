import { Mutation, State } from '@/lib/decorators';

export class User {
  @State()
  name = null;

  @Mutation()
  updateName(name) {
    this.name = name;
  }
}
