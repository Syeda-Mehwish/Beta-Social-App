import React from 'react';
import  {AuthProvider}  from './AuthProvider';
import Routers from './Routers';


const Provider = () => {
  return (
    <AuthProvider>
    <Routers/>
  
</AuthProvider>
  )
}

export default Provider;


