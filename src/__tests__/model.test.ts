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

    expect(updatedPost.views).toBe(3)
  })
})

describe('Model.mutate', () => {
  it('updates the model in-place', () => {
    const user = Model({
      name: 'Spongebob Squarepants'
    })

    const updatedUser = user.mutate(user => {
      user.name = 'Patrick Star'
    })

    expect(user === updatedUser).toBe(true)
    expect(user.name).toBe('Patrick Star')
    expect(updatedUser.name).toBe('Patrick Star')
  })

  it('is chainable', () => {
    type Tweet = {
      retweets: number
      favorites: number
    }

    const tweet = Model<Tweet>({
      retweets: 0,
      favorites: 0
    })

    const updatedTweet = tweet
      .mutate(tweet => {
        tweet.favorites++
      })
      .mutate(tweet => {
        tweet.retweets += 4
      })
      .mutate(tweet => {
        tweet.favorites += 1
      })

    expect(tweet === updatedTweet).toBe(true)
    expect(tweet.retweets).toBe(4)
    expect(tweet.favorites).toBe(2)
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
})
