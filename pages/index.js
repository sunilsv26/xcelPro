import React,{useEffect} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SignUp from "../container/signup";
import SignIn from "../container/signin";
import NotFound from "../components/notFound";
import Dashboard from "../components/dashboard";



export default function Home() {
  useEffect(()=>{
    console.log('inside update');
  },[])
  return (
    <Router>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/" component={Dashboard}/>
        <Route path="*" component={NotFound}/>
      </Switch>
    </Router>
  );
}
