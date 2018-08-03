import produce from 'immer'
import { Lens, Lensed } from './lens'

export type Transform<T> = (model: T) => void

export interface Model<T> {
  /**
   * Runs the given transform and returns a copy of the model after applying the transformation.
   *
   * @param transform The transform to apply to the model.
   */
  with(transform: Transform<T>): T & Model<T>

  /**
   * Views the model through the given lens.
   *
   * @param lens The lens through which to view the model.
   */
  throughLens<TLens>(lens: Lens<T, TLens>): TLens & Lensed<TLens, T & Model<T>>
}

export type ModelInstance<T> = Readonly<T & Model<T>>

export const Model = <T>(props: T): ModelInstance<T> => ({
  ...(props as any),
  with(transform: Transform<T>) {
    return produce(transform)(this as any)
  },
  throughLens<TLens>(lens: Lens<T, TLens>) {
    return lens(this)
  }
})

export const makeModel = <T>(defaultProps?: T) => (
  props: T
): ModelInstance<T> =>
  defaultProps
    ? (Model({ ...(defaultProps as any), ...(props as any) }) as any)
    : Model(props)
