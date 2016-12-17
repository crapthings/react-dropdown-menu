import React, { Component } from 'react'

import randomColor from 'randomcolor'

const defaultRootComponentProps = {
  className: 'react-dropdown-menu-root',
  width: 128,
}

const defaultRootComponentStyle = {
  display: 'inline',
  position: 'relative',
  padding: 0,
  backgroundColor: 'red',
  cursor: 'pointer',
}

const defaultMenuComponentStyle = {
  display: 'none',
  position: 'absolute',
  left: 0,
  padding: 0,
  width: defaultRootComponentProps.width + 'px',
  backgroundColor: 'red',
}

const defaultItemComponentStyle = {
  display: 'block',
  padding: '8px',
  borderBottom: '1px solid white',
  color: 'white',
  cursor: 'pointer',
}

function RootComponent({ text, component, menu }) {
  return <div
    { ...defaultRootComponentProps }
    style={defaultRootComponentStyle}
    onMouseEnter={menu && handleOnMouse}
    onMouseLeave={menu && handleOnMouse}
  /* end of start div */>
    {component ? component() : <span>{text}</span>}
    {menu && <MenuComponent menu={menu} />}
  </div>
}

function MenuComponent({ text = 'undefined', href = '#', menu = [], style= {} }) {
  return <div
    style={{...defaultMenuComponentStyle, ...style}}
  /* end of start div  */>
    {menu.map(({ text, component, href, menu, onClick, ...item}, itemIdx) => <ItemComponent
      key={itemIdx}
      text={text}
      href={href}
      menu={menu}
      onClick={onClick}
    />)}
  </div>
}

function ItemComponent({ text, component, href, menu, onClick }) {
  return <div
    style={defaultItemComponentStyle}
    onMouseEnter={menu && handleOnMouse}
    onMouseLeave={menu && handleOnMouse}
    onClick={onClick}
  /* end of start div */>
    {component ? component() : <span>{text}</span>}
    {menu && <MenuComponent menu={menu} />}
  </div>
}

function handleOnMouse(evt) {

  const viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
  const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)

  const pageX = evt.pageX
  const pageY = evt.pageY
  const currentTarget = evt.currentTarget
  const children = Array.prototype.slice.call(currentTarget.parentNode.children)
  const currentIdx = children.indexOf(currentTarget) + 1
  const isRootEl = currentTarget.className === defaultRootComponentProps.className
  const clientRect = currentTarget.getBoundingClientRect()
  const menu = currentTarget.lastElementChild

  if (isRootEl) {

    if (viewportWidth / 2 > pageX)
      menu.style.left = 0
    else
      menu.style.left = -(defaultRootComponentProps.width - clientRect.width) + 'px'

    if (viewportHeight / 2 > pageY)
      menu.style.top = clientRect.height + 'px'
    else
      menu.style.bottom = (currentTarget.offsetTop + clientRect.height) + 'px'

  } else {

    if (viewportWidth / 2 > pageX)
      menu.style.left = clientRect.width + 'px'
    else
      menu.style.left = -clientRect.width + 'px'

    if (viewportHeight / 2 > pageY)
      menu.style.top = currentTarget.offsetTop + 'px'
    else
      menu.style.bottom = (children.length - currentIdx) * clientRect.height + 'px'

  }

  if (evt.type === 'mouseenter')
    menu.style.display = 'block'
  else
    menu.style.display = 'none'

  // dev
  menu.style.backgroundColor = randomColor({
    luminosity: 'dark'
  })

}

export default RootComponent
