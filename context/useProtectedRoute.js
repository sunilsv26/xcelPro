import { useEffect, useState } from "react";

import firebase from "firebase/app";
import "firebase/auth";

import { useHistory } from "react-router-dom";
import {Redirect} from 'react-router-dom'

export default function useProtectedRoute() {
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user && history) {
        history.push("/signin");
      }
      if(!user && history==undefined){
        window.location.replace('/signin')
      }
    });
  }, [history]);
}
