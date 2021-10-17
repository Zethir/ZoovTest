import { MutationTree } from 'vuex/types'
import { BikesState } from './types'

export const mutations: MutationTree<BikesState> = {
  setBikes: (state, bikes: Array<{}>) => {
    state.bikes = bikes
  },

  deleteBike: (state, bikeId: string) => {
    state.bikes = state.bikes.filter((bike: any) => {
      return bike.id !== bikeId
    })
  },

  updateBike: (state, updatedBike: any) => {
    state.bikes = state.bikes.map((bike: any) => {
      if (updatedBike.bikeId === bike.id) {
        return updatedBike.result
      }
      return bike
    })
  },
}
export default mutations
