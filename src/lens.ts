import produce from 'immer'
import { Model, ModelInstance, Transform } from './model'

export interface Lensed<TLens, TModel> {
  /**
   * Runs the given transform and returns a copy of the lensed model after applying the transformation.
   *
   * @param transform The transform to apply to the lensed model.
   */
  with(transform: Transform<TLens>): TLens & Lensed<TLens, TModel>

  /**
   * Runs the given transform and mutates the source model in-place.
   *
   * @param transform The transform to apply to the source model.
   */
  withMutations(transform: Transform<TLens>): TLens & Lensed<TLens, TModel>

  /**
   * Removes the lens and returns the source model.
   */
  removeLens(): TModel
}

export type Lens<TModel, TLens> = (
  model: ModelInstance<TModel>
) => TLens & Lensed<TModel, TModel>

export const makeLens = <TModel, TLens>(
  lens: (model: TModel) => TLens
): Lens<TModel, TLens> => (model: ModelInstance<TModel>) => ({
  ...(lens(model as any) as any),
  with(transform: Transform<TLens>) {
    const updatedModel = produce(draft => {
      transform(lens(draft))
    })(model)
    return makeLens(lens)(updatedModel)
  },
  withMutations(transform: Transform<TLens>) {
    transform(lens(model as any))
    return makeLens(lens)(model as any)
  },
  removeLens() {
    return model
  }
})
