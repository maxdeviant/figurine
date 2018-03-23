import produce from 'immer'

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
  mutate(transform: Transform<T>): T & Model<T>
}

export const Model = <T>(props: T): T & Model<T> => ({
  ...(props as any),
  with(transform: Transform<T>) {
    return produce(transform)(this as any)
  },
  mutate(transform: Transform<T>) {
    transform(this as any)
    return this
  }
})

export const makeModel = <T>() => (props: T) => Model(props)
