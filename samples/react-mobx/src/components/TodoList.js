import React, { Component } from 'react'
import { makeModel } from 'figurine'
import { decorate, observable } from 'mobx'
import { Observer } from 'mobx-react'

const Todo = makeModel()

export default class TodoList extends Component {
  currentId = 0

  todos = []

  addTodo = () => {
    this.currentId += 1
    this.todos.push(
      Todo({
        id: this.currentId,
        name: ''
      })
    )
  }

  updateTodo = todo => {
    const replaceIndex = this.todos.findIndex(t => t.id === todo.id)
    if (replaceIndex !== -1) {
      this.todos.splice(replaceIndex, 1, todo)
    }
  }

  render() {
    return (
      <Observer>
        {() => (
          <div>
            <h2>Todos ({this.todos.length})</h2>
            <button onClick={this.addTodo}>New Todo</button>
            <ul>
              {this.todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} onSave={this.updateTodo} />
              ))}
            </ul>
          </div>
        )}
      </Observer>
    )
  }
}

decorate(TodoList, {
  currentId: observable,
  todos: observable
})

class TodoItem extends Component {
  editingTodo = void 0

  editTodo = () => {
    this.editingTodo = this.props.todo.clone()
  }

  cancelEdit = () => {
    this.editingTodo = void 0
  }

  saveTodo = () => {
    this.props.onSave(this.editingTodo)
    this.editingTodo = void 0
  }

  render() {
    const { todo } = this.props
    return (
      <Observer>
        {() => (
          <li>
            {this.editingTodo ? (
              <div>
                <TodoNameInput todo={this.editingTodo} />
                <button onClick={this.cancelEdit}>Cancel</button>
                <button onClick={this.saveTodo}>Save</button>
              </div>
            ) : (
              <div>
                {todo.name}
                <button onClick={this.editTodo}>Edit</button>
              </div>
            )}
          </li>
        )}
      </Observer>
    )
  }
}

decorate(TodoItem, {
  editingTodo: observable
})

class TodoNameInput extends Component {
  handleChange = event => {
    this.props.todo.withMutations(todo => {
      todo.name = event.target.value
    })
  }

  render() {
    return (
      <Observer>
        {() => (
          <input
            type="text"
            value={this.props.todo.name}
            onChange={this.handleChange}
          />
        )}
      </Observer>
    )
  }
}
