import { Model, makeModel } from '../model'

describe('Model', () => {
  it('creates a model instance', () => {
    const user = Model({
      name: 'Johnny Depp',
      dateOfBirth: new Date('1963-06-09')
    })

    expect(user).toMatchSnapshot()
  })
})

describe('Model.with', () => {
  it('immutably updates the model', () => {
    const user = Model({
      name: 'Brad Pitt'
    })

    const updatedUser = user.with(user => {
      user.name = 'Bradley Cooper'
    })

    expect(user === updatedUser).toBe(false)
    expect(user.name).toBe('Brad Pitt')
    expect(updatedUser.name).toBe('Bradley Cooper')
  })

  it('is chainable', () => {
    type Post = {
      title: string
      views: number
    }

    const post = Model<Post>({
      title: 'Hello, Sailor!',
      views: 0
    })

    const incrementViews = (post: Post) => {
      post.views++
    }

    const updatedPost = post
      .with(incrementViews)
      .with(incrementViews)
      .with(incrementViews)

    expect(post === updatedPost).toBe(false)
    expect(updatedPost.views).toBe(3)
  })
})

describe('makeModel', () => {
  it('returns a function for creating strongly-typed models', () => {
    const Superhero = makeModel<{
      name: string
    }>()

    const batman = Superhero({
      name: 'Batman'
    })

    const superman = Superhero({
      name: 'Superman'
    })

    expect(batman.name).toBe('Batman')
    expect(superman.name).toBe('Superman')
  })

  it('uses the default values for the models', () => {
    const Animal = makeModel<{
      name: string
      age?: number | '???'
    }>({
      name: '',
      age: '???'
    })

    const rover = Animal({
      name: 'Rover'
    })

    expect(rover.name).toBe('Rover')
    expect(rover.age).toBe('???')
  })
})
