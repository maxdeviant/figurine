import { makeLens } from '../lens'
import { Model } from '../model'

describe('Lens.with', () => {
  it('immutably updates the source model', () => {
    type Person = {
      firstName: string
      lastName: string
    }

    const person = Model<Person>({
      firstName: 'Tony',
      lastName: 'Montana'
    })

    const fullNameLens = makeLens<Person, { fullName: string }>(model => ({
      get fullName() {
        return `${model.firstName} ${model.lastName}`
      },
      set fullName(value) {
        const [firstName, lastName] = value.split(' ')
        model.firstName = firstName
        model.lastName = lastName
      }
    }))

    const updatedPerson = person.throughLens(fullNameLens).with(person => {
      person.fullName = 'Jerry Michigan'
    })

    expect(updatedPerson.fullName).toBe('Jerry Michigan')

    expect(person.firstName).toBe('Tony')
    expect(person.lastName).toBe('Montana')

    expect(updatedPerson.removeLens().firstName).toBe('Jerry')
    expect(updatedPerson.removeLens().lastName).toBe('Michigan')
  })
})

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
