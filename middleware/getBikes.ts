import { Middleware } from '@nuxt/types'

const getBikes: Middleware = async ({ store }) => {
  await store.dispatch('bikes/fetchBikes')
}

export default getBikes
