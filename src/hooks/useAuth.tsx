import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '../context/AuthContext';

export function userAuth(): AuthContextProps{
  const context = useContext(AuthContext)

  return context;
}