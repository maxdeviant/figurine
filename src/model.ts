import produce from 'immer'

export interface Model<T> {
  with: (fn: (x: T) => void) => T & Model<T>
}

export const Model = <T>(props: T): T & Model<T> => ({
  ...(props as any),
  with(transform: (draft: T) => void) {
    return produce(transform)(this as any)
  }
})

export const makeModel = <T>() => (props: T) => Model(props)
