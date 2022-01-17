import * as React from 'react';
import Sidebar from './Sidebar';

const SidebarContainer = () => {

  const links = [
    { to: '/', text: 'Home' },
    { to: '/projects', text: 'My Projects' },
    { to: '/about', text: 'About Me', },
  ]

  return < Sidebar links={links} />
};

export default SidebarContainer;
