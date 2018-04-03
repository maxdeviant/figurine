import produce from 'immer'
import { Model, ModelInstance, Transform } from './model'

export interface Lensed<T> {
  with(transform: Transform<T>): T & Lensed<T>
  withMutations(transform: Transform<T>): T & Lensed<T>
}

export type Lens<TModel, TLens> = (model: ModelInstance<TModel>) => TLens

export const makeLens = <TModel, TLens>(
  lens: (model: TModel) => TLens
): Lens<TModel, TLens> => (model: ModelInstance<TModel>) => ({
  ...(lens(model as any) as any),
  with(transform: Transform<TLens>) {
    const updatedModel = produce(draft => {
      transform(lens(draft))
    })(model)
    return lens(updatedModel)
  },
  withMutations(transform: Transform<TLens>) {
    transform(lens(model as any))
    return lens(model as any)
  }
})
