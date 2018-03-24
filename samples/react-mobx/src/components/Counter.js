import React, { Component } from 'react'
import { decorate, observable } from 'mobx'
import { Observer } from 'mobx-react'

export default class Counter extends Component {
  count = 0

  handleIncrement = () => {
    this.count++
  }

  handleDecrement = () => {
    this.count--
  }

  render() {
    return (
      <Observer>
        {() => (
          <div>
            Counter: {this.count}
            <br />
            <button onClick={this.handleIncrement}> + </button>
            <button onClick={this.handleDecrement}> - </button>
          </div>
        )}
      </Observer>
    )
  }
}

decorate(Counter, {
  count: observable
})
