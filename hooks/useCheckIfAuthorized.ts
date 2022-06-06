import { useEffect } from 'react'
import Router from "next/router";


export function useCheckIfAuthorized() {
  useEffect(() => {
      const token = window.localStorage.getItem("_token");
      if(!token) Router.replace("/login");
  }, []);
}
