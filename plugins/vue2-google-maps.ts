import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDY3Ips8GBV_tJvkVODGyh7ZE_J36rjfqQ',
    libraries: 'places',
  },
})
