import React from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import classes from './MainNavigation.module.css';
import { authActions } from '../Store/Authreducer';
import { showActions } from '../Store/show-slice';


const MainNavigation = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const authHandler = () => {
    if (isLoggedIn) {
      dispatch(authActions.logout());
      dispatch(showActions.compose());
    }
  };

  return (
    <div className={classes.mainNav}>
      <nav>
        <ul>
          <li className={classes.welcome}>
            <NavLink
              to='/home'
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              <i className='ri-mail-line'></i>
              Mail Box
            </NavLink>
          </li>
          <li className={classes.auth}>
            <NavLink
              onClick={authHandler}
              to='/login'
              className={({ isActive }) => (isActive ? classes.active : '')}
            >
              {!isLoggedIn ? 'Login' : 'Logout'}
              {!isLoggedIn ? (
                <i className='ri-login-circle-line'></i>
              ) : (
                <i className='ri-logout-circle-line'></i>
              )}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;