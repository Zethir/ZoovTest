import { ActionContext, ActionTree } from 'vuex/types'
import { RootState } from '../types'
import { BikesState } from './types'

interface BikesActionContext extends ActionContext<BikesState, RootState> {}

export const actions: ActionTree<BikesState, RootState> = {
  async fetchBikes({ commit }: BikesActionContext) {
    await this.$axios
      .$get('https://615d96f912571a00172076fd.mockapi.io/bikes')
      .then((result) => {
        commit('setBikes', result.bikes)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async deleteBike({ commit }: BikesActionContext, bikeId: String) {
    await this.$axios
      .$delete(`https://615d96f912571a00172076fd.mockapi.io/bikes/${bikeId}`)
      .then((result) => {
        commit('deleteBike', bikeId)
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },

  async updateBike({ commit }: BikesActionContext, { bikeId, bike }) {
    await this.$axios
      .$put(`https://615d96f912571a00172076fd.mockapi.io/bikes/${bikeId}`, bike)
      .then((result) => {
        commit('updateBike', { bikeId, result })
      })
      .catch((error) => {
        throw new Error(`API ${error}`)
      })
  },
}

export default actions
