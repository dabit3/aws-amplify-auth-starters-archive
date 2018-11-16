import React, {Component} from 'react';

import { createSwitchNavigator } from 'react-navigation'

import Auth from './nav/auth/Auth'
import Initializing from './nav/Initializing'
import MainNav from './nav/main/MainNav'

const SwitchNav = createSwitchNavigator({
  Initializing: {
    screen: Initializing
  },
  Auth: {
    screen: Auth
  },
  MainNav: {
    screen: MainNav
  }
})

export default SwitchNav
