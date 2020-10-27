import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';

import { selectUser, login, logout } from './userSlice';
import { auth } from './firebase';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

useEffect(() => {
  auth.onAuthStateChanged((authUser) =>{
    if (authUser) {
      dispatch(
        login({
          uid: authUser.uid,
          photo: authUser.photoURL,
          email: authUser.email,
          displayName: authUser.displayName,
        })
      )
    } else {
      dispatch(logout())
    }
  })
}, [dispatch])

const renderApp = (user) => {
  if (!user) {
    return <Login />
  } else {
    return (
      <>
        <Sidebar />
        <Chat />
      </>
    )
  };
};

  return (
    <div className="app">
      {renderApp(user)}
    </div>
  );
};

export default App;
