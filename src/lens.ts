import produce from 'immer'
import { ModelInstance, Transform } from './model'

export interface Lensed<TLens, TModel> {
  /**
   * Runs the given transform and returns a copy of the lensed model after applying the transformation.
   *
   * @param transform The transform to apply to the lensed model.
   */
  with(transform: Transform<TLens>): TLens & Lensed<TLens, TModel>

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
  removeLens() {
    return model
  }
})
