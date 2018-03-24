import React from 'react'
import DevTools from 'mobx-react-devtools'
import Counter from './Counter'
import TodoList from './TodoList'

const App = () => (
  <div>
    <h1>Hello, Sailor!</h1>
    <Counter />
    <TodoList />
    <DevTools />
  </div>
)

export default App
