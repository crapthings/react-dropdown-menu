import _ from 'lodash'

import faker from 'faker'

import React, { Component } from 'react'

import { render } from 'react-dom'

import MenuComponent from './react-dropdown-menu'

let menu = _.times(10, n => ({
  text: faker.lorem.word(),
  href: faker.image.imageUrl(),
  target: '_blank',
  onClick() {
    alert(1)
  },

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
  {
    type: 'divider',
    text: 'basic info',
  },
  ...menu,
]

Meteor.startup(init)

const App = () => <div>
  <nav id="top-left">
    <a href="">logo</a>
    <MenuComponent text='test' href='/' menu={menu} />
    <a href="">help</a>
  </nav>

  <nav id="top-right" style={{ display: 'flex' }}>
    <a href="">logo</a>
    <MenuComponent component={() => <div style={{ display: 'flex', padding: '8px 16px', alignContent: 'center' }}>
      <span style={{ alignSelf: 'center', marginRight: 16 }}>user</span> <img src={faker.internet.avatar()} style={{ width: 40, height: 40, borderRadius: '50%' }} />
    </div>} href='/' menu={menu} />
    <a href="">help</a>
  </nav>

  <nav id="bottom-left">
    <a href="">logo</a>
    <MenuComponent text='test' href='/' menu={menu} />
    <a href="">help</a>
  </nav>

  <nav id="bottom-right">
    <a href="">logo</a>
    <MenuComponent component={() => <div style={{ display: 'inline-block' }}>
      <span style={{ display: 'flex', alignSelf: 'center' }}>user</span> <img src={faker.internet.avatar()} style={{ width: 40, height: 40, borderRadius: '50%' }} />
    </div>} href='/' menu={menu} />
    <a href="">help</a>
  </nav>
</div>

function init() {
  render(<App />, document.getElementById('test'))
}
