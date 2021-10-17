<template>
  <div class="main">
    <div v-if="displaySuccessMessage" class="success-message">
      Bike Updated !
    </div>
    <div class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1170 371">
        <defs>
          <linearGradient id="myGradient" gradientTransform="rotate(90)">
            <stop offset="5%" stop-color="rgb(63, 83, 243)" />
            <stop offset="95%" stop-color="rgb(162, 148, 219)" />
          </linearGradient>
        </defs>
        <path
          fill="url(#myGradient)"
          fill-opacity="0.2"
          d="M347.992 340.79c-15.309 17.608-37.873 28.74-63.038 28.74H85.722c-74.215 0-111.55-89.578-59.302-142.284l58.234-58.747C38.698 168.313 1.5 131.001 1.5 85 1.5 38.884 38.884 1.5 85 1.5h200c26.23 0 47.855 11.191 62.544 27.99C375.783 11.756 409.194 1.5 445 1.5c56.39 0 106.839 25.436 140.5 65.46C619.161 26.936 669.61 1.5 726 1.5c35.942 0 69.47 10.333 97.776 28.191 6.824-7.625 15.174-14.115 24.883-18.97 41.247-20.623 91.403-3.903 112.026 37.344l25.187 50.375 25.474-50.844c20.658-41.23 70.828-57.907 112.058-37.25 41.23 20.658 57.907 70.828 37.25 112.058l-100.206 200c-30.809 61.49-118.582 61.453-149.34-.063l-24.373-48.748C855.481 330.178 795.215 368.5 726 368.5c-56.39 0-106.839-25.436-140.5-65.46-33.661 40.024-84.11 65.46-140.5 65.46-35.617 0-68.864-10.148-97.008-27.71z"
        ></path>
        <path
          fill="url(#myGradient)"
          d="M328.16 271.726a45.456 45.456 0 012.294 14.304c0 25.129-20.37 45.5-45.5 45.5H85.722c-40.44 0-60.784-48.812-32.314-77.532L175.828 130.5H85c-25.129 0-45.5-20.371-45.5-45.5S59.871 39.5 85 39.5h200c32.047 0 51.474 30.655 43.987 57.673C355.556 62.133 397.635 39.5 445 39.5c67.227 0 123.805 45.593 140.5 107.545C602.195 85.093 658.773 39.5 726 39.5c47.389 0 89.486 22.655 116.053 57.725-5.528-20.466 3.905-42.668 23.6-52.515 22.475-11.238 49.806-2.127 61.044 20.349l59.14 118.283 59.483-118.724c11.257-22.466 38.595-31.554 61.062-20.298 22.466 11.257 31.554 38.595 20.298 61.062l-100.206 200c-16.788 33.506-64.617 33.486-81.377-.034L867.101 149.35A145.8 145.8 0 01871.5 185c0 80.357-65.143 145.5-145.5 145.5-67.227 0-123.805-45.593-140.5-107.545C568.805 284.907 512.227 330.5 445 330.5c-47.86 0-90.322-23.107-116.84-58.774zm-11.736-18.558C305.62 232.833 299.5 209.63 299.5 185c0-23.705 5.669-46.086 15.725-65.861L194.892 240.53h90.062c12.21 0 23.297 4.81 31.47 12.638zM780.5 185c0-30.1-24.4-54.5-54.5-54.5s-54.5 24.4-54.5 54.5 24.4 54.5 54.5 54.5 54.5-24.4 54.5-54.5zm-281 0c0-30.1-24.4-54.5-54.5-54.5s-54.5 24.4-54.5 54.5 24.4 54.5 54.5 54.5 54.5-24.4 54.5-54.5z"
        ></path>
      </svg>
    </div>
    <div class="map">
      <GmapMap
        :center="center"
        :zoom="zoom"
        class="map-card"
        map-type-id="terrain"
        style="width: 500px; height: 300px"
      >
        <GmapMarker
          v-for="bikeMap in bikes"
          :key="bikeMap.id"
          :position="{
            lng: bikeMap.location.coordinates[0],
            lat: bikeMap.location.coordinates[1],
          }"
          :clickable="true"
          :draggable="true"
          @click="displayBikeData(bikeMap)"
        />
      </GmapMap>
      <div v-if="bike" class="bike-card">
        <h1>Bike's details</h1>
        <p>
          <strong>Battery Level:</strong>
          <input v-model="bike.battery_level" type="text" />
        </p>
        <p>
          <strong>Service Status:</strong>
          <select v-model="bike.service_status">
            <option
              v-for="(service, key, index) in serviceStatus"
              :key="index"
              :value="key"
              :selected="service == serviceStatus[bike.service_status]"
            >
              {{ service }}
            </option>
          </select>
        </p>
        <p>
          <strong>In order:</strong>
          <select v-model="bike.in_order">
            <option
              v-for="(order, key, index) in inOrder"
              :key="index"
              :value="key"
              :selected="order == inOrder[bike.in_order]"
            >
              {{ order }}
            </option>
          </select>
        </p>
        <p>
          <strong>Serial Number:</strong
          ><input v-model="bike.serial_number" type="text" />
        </p>
        <p>
          <strong>Coordinates:</strong> Lat:
          <input v-model="bike.location.coordinates[1]" type="text" />Lng:
          <input v-model="bike.location.coordinates[0]" type="text" />
        </p>
        <div class="buttons">
          <button @click="deleteBikeFromId(bike.id)" class="delete-button">
            Delete
          </button>
          <button
            @click.prevent="updateBikeFromId(bike.id)"
            class="update-button"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { bikesVuexNamespace } from '../store/bikes/const'

@Component({
  middleware: ['getBikes'],
})
export default class index extends Vue {
  @bikesVuexNamespace.State
  private bikes!: Array<{}>

  @bikesVuexNamespace.Action('deleteBike')
  private deleteBike!: (bikeId: string) => void

  @bikesVuexNamespace.Action('updateBike')
  private updateBike!: ({}) => void

  private bike: any = null

  private center: {} = {}

  private zoom: number = 10

  private apartmentNumber: String = ''

  private serviceStatus: {} = {
    1: 'free',
    2: 'booked',
    3: 'in use',
  }

  private inOrder: {} = {
    true: 'Yes',
    false: 'No',
  }

  private displaySuccessMessage: boolean = false

  mounted() {
    const formattedBikeLocation: Array<{}> = []

    this.bikes.forEach((bike: any) => {
      formattedBikeLocation.push({
        lng: bike.location.coordinates[0],
        lat: bike.location.coordinates[1],
      })
    })

    this.center = this.getAverageGeolocation(formattedBikeLocation)
  }

  public displayBikeData(bike: any) {
    this.center = {
      lat: bike.location.coordinates[1],
      lng: bike.location.coordinates[0],
    }
    this.zoom = 14
    this.bike = { ...bike }
  }

  public deleteBikeFromId(bikeId: string) {
    this.bike = null
    this.deleteBike(bikeId)
  }

  public updateBikeFromId(bikeId: string) {
    const bike = this.bike
    this.updateBike({ bikeId, bike })
    this.displaySuccessMessage = true
    setTimeout(() => {
      this.displaySuccessMessage = false
    }, 3000)
  }

  public getAverageGeolocation(coords: any) {
    if (coords.length === 1) {
      return coords[0]
    }

    let x = 0.0
    let y = 0.0
    let z = 0.0

    for (const coord of coords) {
      const latitude = (coord.lat * Math.PI) / 180
      const longitude = (coord.lng * Math.PI) / 180

      x += Math.cos(latitude) * Math.cos(longitude)
      y += Math.cos(latitude) * Math.sin(longitude)
      z += Math.sin(latitude)
    }

    const total = coords.length

    x = x / total
    y = y / total
    z = z / total

    const centralLongitude = Math.atan2(y, x)
    const centralSquareRoot = Math.sqrt(x * x + y * y)
    const centralLatitude = Math.atan2(z, centralSquareRoot)

    return {
      lat: (centralLatitude * 180) / Math.PI,
      lng: (centralLongitude * 180) / Math.PI,
    }
  }
}
</script>

<style scoped>
.main {
  @apply grid place-items-center w-screen pt-20 py-1 gap-y-20 h-screen;
}

.logo {
  width: 12em;
  transform: rotate(-17deg);
}

.map {
  @apply grid grid-flow-row gap-y-4 items-center justify-items-center;
}

.map-card {
  border-radius: 0.5em;
  overflow: hidden;
  width: 90vw !important;
  height: 300px !important;
}

.bike-card {
  @apply grid px-6 py-4 grid-flow-row items-start gap-y-4;

  border-radius: 0.5em;

  /* prettier-ignore */
  background:
    rgba(0, 0, 0, 0)
    linear-gradient(
      90deg,
      rgb(63, 83, 243) -20.8856%,
      rgb(162, 148, 219) 119.114%
    )
    repeat scroll 0% 0%;
  color: white;
}

.bike-card p {
  @apply grid gap-x-1 grid-flow-row;
}

.bike-card input {
  @apply p-1;

  background: transparent;
  border: 1px solid white;
  border-radius: 0.7em;
}

.bike-card input:focus,
.bike-card input:focus-visible {
  outline: 0.15em solid;
  outline-color: rgb(51, 197, 255);
}

.bike-card select {
  @apply p-1;

  background: transparent;
  border: 1px solid white;
  border-radius: 0.7em;
}

.bike-card h1 {
  font-size: 2em;
}

.buttons {
  @apply grid grid-flow-row gap-y-4;

  font-size: 1.3em;
}

.update-button {
  @apply py-1;

  background: rgb(51, 197, 255);
  border-radius: 0.7em;
}

.delete-button {
  @apply py-1;

  background: rgb(212, 34, 64);
  border-radius: 0.7em;
}

.success-message {
  @apply absolute p-4 border-green-300 bg-green-100 text-green-400;

  top: 10px;
  left: 10px;
  border-radius: 0.3em;
  border: 0.1em solid;
}

@media (min-width: 640px) {
  .main {
    @apply p-10;
  }

  .map-card {
    width: 500px !important;
    height: 300px !important;
  }
}

@media (min-width: 768px) {
  .main {
    height: 80vh;
  }

  .map {
    @apply grid-flow-col gap-x-4;
  }

  .buttons {
    @apply grid-flow-col gap-x-4;
  }
}

@media (min-width: 1024px) {
  .map-card {
    width: 700px !important;
    height: 500px !important;
  }
}
</style>
