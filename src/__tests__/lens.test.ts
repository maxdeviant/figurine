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
