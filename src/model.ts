import produce, { setAutoFreeze } from 'immer'
import cloneDeep from 'lodash.clonedeep'
import { Lens, Lensed } from './lens'

// Disable auto-freezing so that we can use `with` and `withMutations` interchangeably.
setAutoFreeze(false)

export type Transform<T> = (model: T) => void

export interface Model<T> {
  /**
   * Runs the given transform and returns a copy of the model after applying the transformation.
   *
   * @param transform The transform to apply to the model.
   */
  with(transform: Transform<T>): T & Model<T>

  /**
   * Runs the given transform and mutates the model in-place.
   *
   * @param transform The transform to apply to the model.
   */
  withMutations(transform: Transform<T>): T & Model<T>

  /**
   * Returns a clone of the model.
   */
  clone(): T & Model<T>

  /**
   * Views the model through the given lens.
   *
   * @param lens The lens through which to view the model.
   */
  throughLens<TLens>(lens: Lens<T, TLens>): TLens & Lensed<TLens, T>
}

export type ModelInstance<T> = Readonly<T & Model<T>>

export const Model = <T>(props: T): ModelInstance<T> => ({
  ...(props as any),
  with(transform: Transform<T>) {
    return produce(transform)(this as any)
  },
  withMutations(transform: Transform<T>) {
    transform(this as any)
    return this
  },
  clone() {
    return cloneDeep(this)
  },
  throughLens<TLens>(lens: Lens<T, TLens>) {
    return lens(this)
  }
})

export const makeModel = <T>() => (props: T) => Model(props)
