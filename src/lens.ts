import produce from 'immer'
import { Model, ModelInstance, Transform } from './model'

export interface Lensed<T> {
  with(transform: Transform<T>): T & Lensed<T>
  withMutations(transform: Transform<T>): T & Lensed<T>
}

export type Lens<TModel, TLense> = (
  model: ModelInstance<TModel>
) => TLense & Lensed<TModel>

export const makeLens = <TModel, TLense>(lens: (model: TModel) => TLense) => (
  model: ModelInstance<TModel>
): TLense & Lensed<TLense> => ({
  ...(lens(model as any) as any),
  with(transform: Transform<TLense>) {
    return lens(produce(draft => {
      transform(lens(draft as any))
    }, model) as any)
  },
  withMutations(transform: Transform<TLense>) {
    transform(lens(model as any))
    return lens(model as any)
  }
})
