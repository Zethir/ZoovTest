import { Module } from 'vuex/types'
import { RootState } from '../types'
import { BikesState } from './types'
import { actions } from './actions'
import { mutations } from './mutations'
import state from './state'

const namespaced: boolean = true

export const bikes: Module<BikesState, RootState> = {
  namespaced,
  state,
  actions,
  mutations,
}
