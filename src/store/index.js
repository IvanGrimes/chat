import Vue from 'vue'
import Vuex from 'vuex'
import { Store } from "./Store";
import {createVuexStore} from "../lib/store";

Vue.use(Vuex)

const rootStore = new Store()

export default createVuexStore(rootStore, { strict: true })
