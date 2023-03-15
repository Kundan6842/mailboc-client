import React from 'react';

import MainNavigation from './MainNavigation';

const Layout = (props) => {
  return (
    <React.Fragment>
      <MainNavigation />
      {props.children}
    </React.Fragment>
  );
};

export default Layout;