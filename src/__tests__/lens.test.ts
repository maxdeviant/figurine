import { makeLens } from '../lens'
import { Model } from '../model'

describe('Lens.withMutations', () => {
  it('mutates the source model in-place', () => {
    type CamelCasedIdentifier = {
      camelCase: string
    }

    type PascalCasedIdentifier = {
      pascalCase: string
    }

    const identifier = Model<CamelCasedIdentifier>({
      camelCase: 'customerCount'
    })

    const pascalCaseLens = makeLens<
      CamelCasedIdentifier,
      PascalCasedIdentifier
    >(model => ({
      get pascalCase() {
        return `${model.camelCase[0].toUpperCase()}${model.camelCase.slice(1)}`
      },
      set pascalCase(value) {
        model.camelCase = `${value[0].toLowerCase()}${value.slice(1)}`
      }
    }))

    expect(identifier.camelCase).toBe('customerCount')
    expect(identifier.throughLens(pascalCaseLens).pascalCase).toBe(
      'CustomerCount'
    )

    const updatedIdentifier = identifier
      .throughLens(pascalCaseLens)
      .withMutations(identifier => {
        identifier.pascalCase = 'ActiveCustomerCount'
      })

    expect(updatedIdentifier.pascalCase).toBe('ActiveCustomerCount')
    expect(identifier.camelCase).toBe('activeCustomerCount')
  })
})
