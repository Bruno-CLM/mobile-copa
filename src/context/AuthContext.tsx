import { createContext, ReactNode, useState, useEffect } from "react";
import * as Facebook from 'expo-auth-session/providers/facebook';
import * as Google from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { api } from "../service/api";  

WebBrowser.maybeCompleteAuthSession();

interface UserProps{
  name: string;
  avatarUrl: string;
}

interface AuthProviderProps{
  children: ReactNode;
}

export interface AuthContextProps {
  user: UserProps;
  signInGoogle: () => Promise<void>;
  signInFacebook: () => Promise<void>;
  isUserLoadingGoogle: boolean;
  isUserLoadingFacebook: boolean;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProviderGoogle({children}: AuthProviderProps){

  const [user, setUser] = useState<UserProps>({} as UserProps);
  const [isUserLoadingGoogle, setIsUserLoadingGoogle] = useState(false)
  const [isUserLoadingFacebook, setIsUserLoadingFacebook] = useState(false)
  let teste:any = null;

  const [requestF, responseF, promptAsyncFacebook] = Facebook.useAuthRequest({
    clientId: process.env.CLIENT_ID_FACEBOOK,
    redirectUri: AuthSession.makeRedirectUri({useProxy : true}),
    scopes: ['public_profile', 'email']
  })

  const [requestG, responseG, promptAsyncGoogle] = Google.useAuthRequest({
    clientId: process.env.CLIENT_ID_GOOGLE,
    redirectUri: AuthSession.makeRedirectUri({useProxy : true}),
    scopes: ['profile', 'email']
  })

  async function signInWhithGoogle(access_token: string){
    try {
      setIsUserLoadingGoogle(true)
      const token_response = await api.post('/users',{access_token: access_token,provider: 'google'})
      api.defaults.headers.common['Authorization'] = `Bearer ${token_response.data.token}` 
      const userInfoResponse = await api.get('/me')
      setUser(userInfoResponse.data.user)
    } catch (error) {
      console.log(error.stack)
    } finally {
      setIsUserLoadingGoogle(false)
    }
  }

  async function signInWhithFacebook(access_token: string){
    try {
      setIsUserLoadingFacebook(true)
      const token_response = await api.post('/users',{access_token: access_token,provider: "facebook",})
      api.defaults.headers.common['Authorization'] = `Bearer ${token_response.data.token}` 
      const userInfoResponse = await api.get('/me')
      setUser(userInfoResponse.data.user)
    } catch (error) {
      console.log(error)
    } finally {
      setIsUserLoadingFacebook(false)
    }
  }

  async function signInGoogle() {
    try {
      setIsUserLoadingGoogle(true)
      await promptAsyncGoogle()
    } catch (error) {
      console.log(error)
      throw error
    }finally{
      setIsUserLoadingGoogle(false);
    }
  }

  async function signInFacebook() {
    try {
      setIsUserLoadingFacebook(true)
      await promptAsyncFacebook()
    } catch (error) {
      console.log(error)
      throw error
    }finally{
      setIsUserLoadingFacebook(false)
    }
  }

  useEffect(() => {
    if(responseG?.type === 'success' && responseG.authentication?.accessToken){
      signInWhithGoogle(responseG.authentication?.accessToken)
      return
    }
  }, [responseG])

  useEffect(() => {
    if(responseF?.type === 'success' && responseF.authentication?.accessToken){
      signInWhithFacebook(responseF.authentication?.accessToken)
      return
    }
  }, [responseF])

  return(
    <AuthContext.Provider value={{
      signInFacebook,
      signInGoogle,
      isUserLoadingGoogle,
      isUserLoadingFacebook,
      user,
    }}>
      {children}
    </AuthContext.Provider>
  )
}