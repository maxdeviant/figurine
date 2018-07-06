import { makeModel, ModelInstance } from '../model'

export interface CarTraits {
  tag: 'Car'
  make: string
  model: string
}

export interface Car extends ModelInstance<CarTraits> {}

export interface BoatTraits {
  tag: 'Boat'
  name: string
}

export interface Boat extends ModelInstance<BoatTraits> {}

export interface PlaneTraits {
  tag: 'Plane'
}

export interface Plane extends ModelInstance<PlaneTraits> {}

export type VehicleTraits = CarTraits | BoatTraits | PlaneTraits

export type Vehicle = ModelInstance<VehicleTraits>

export const makeVehicle = makeModel<VehicleTraits>()

describe('Discriminated Unions', () => {
  it('correctly infers the type of `with` for discriminated unions', () => {
    const vehicle: Vehicle = makeVehicle({
      tag: 'Boat',
      name: 'Boaty McBoatface'
    })

    const updatedVehicle = vehicle.with(vehicle => {
      if (vehicle.tag === 'Boat') {
        vehicle.name = 'Yachty McYachtface'
      }
    })

    expect(updatedVehicle.tag).toBe('Boat')
    if (updatedVehicle.tag === 'Boat') {
      expect(updatedVehicle.name).toBe('Yachty McYachtface')
    }
  })

  it('correctly narrows the type of an array', () => {
    const hondaCivic = makeVehicle({
      tag: 'Car',
      make: 'Honda',
      model: 'Civic'
    })
    const fordExplorer = makeVehicle({
      tag: 'Car',
      make: 'Ford',
      model: 'Explorer'
    })

    const vehicles: Vehicle[] = [
      makeVehicle({
        tag: 'Plane'
      }),
      hondaCivic,
      fordExplorer
    ]

    const isCar = (vehicle: Vehicle): vehicle is Car => vehicle.tag === 'Car'

    const cars = vehicles.filter(isCar)

    expect(cars).toEqual([hondaCivic, fordExplorer])
  })
})
