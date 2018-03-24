import React from 'react'
import { Provider } from 'mobx-react'
import App from './App'

const Root = ({ stores = [] }) => (
  <Provider {...stores}>
    <App />
  </Provider>
)

export default Root
