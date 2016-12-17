import _ from 'lodash'

import faker from 'faker'

import React, { Component } from 'react'

import { render } from 'react-dom'

import MenuComponent from './react-dropdown-menu'

let menu = _.times(10, n => ({
  text: faker.lorem.word(),
  href: faker.image.imageUrl(),
  target: '_blank',

  menu: _.times(_.random(3, 8), n => ({

    text: faker.lorem.word(),
    href: faker.image.imageUrl(),
    target: '_blank',

    menu: _.times(_.random(3, 8), n => ({
      text: faker.lorem.word(),
      href: faker.image.imageUrl(),
      target: '_blank',

      menu: _.times(_.random(3, 8), n => ({
        text: faker.lorem.word(),
        href: faker.image.imageUrl(),
        target: '_blank',
      })),

    })),

  })),

}))

menu = [
  // {
  //   type: 'divider',
  //   text: 'basic info',
  // },
  ...menu,
]

Meteor.startup(init)

const App = () => <div>
  <nav id="top-left">
    <a href="">logo</a>
    <MenuComponent text='test' href='/' menu={menu} />
    <a href="">help</a>
  </nav>

  <nav id="top-right">
    <a href="">logo</a>
    <MenuComponent text='test' href='/' menu={menu} />
    <a href="">help</a>
  </nav>

  <nav id="bottom-left">
    <a href="">logo</a>
    <MenuComponent text='test' href='/' menu={menu} />
    <a href="">help</a>
  </nav>

  <nav id="bottom-right">
    <a href="">logo</a>
    <MenuComponent text='test' href='/' menu={menu} />
    <a href="">help</a>
  </nav>
</div>

function init() {
  render(<App />, document.getElementById('test'))
}
