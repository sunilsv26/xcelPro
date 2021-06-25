import { useState, useEffect, useContext, createContext } from "react";
import { auth, db } from "../configs/firebase";
import firebase from "firebase";
import { useHistory } from 'react-router-dom';

// Provider hook that creates an auth object and handles it's state
const authContext = createContext({ user: {} ,allUsers:[],loading:true});
const { Provider } = authContext;
export function AuthProvider(props) {
  const auth = useAuthProvider();
  return <Provider value={auth}>{props.children}</Provider>;
}
export const useAuth = () => {
  return useContext(authContext);
};
const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const[loading,setLoading]=useState(true)
  const history = useHistory();

  let databaseRef = firebase.database().ref("users/");

  function writeUserData({ firstName, lastName, email }) {
    let uid = firebase.database().ref().child("users").push().key;
    let data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      image: "https://picsum.photos/200",
    };
    let updates = {};
    updates["users/" + uid] = data;
    firebase.database().ref().update(updates);
    getUsers();
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function(user) {
      if(user){
        getUsers()
        setUser(user); 
      }
      
      if (!user) {
        history.push('/signin');
      }
    });
    console.log('inside-44');
  }, []);

  const getUsers = () => {
    let users =[];
    console.log("inside getUsers");
    databaseRef.once("value", function (snapshot) {
      snapshot.forEach((childSnapshot) => {
        let childKey = childSnapshot.key;
        let childData = childSnapshot.val();
        console.log(childData, childKey, snapshot);
        users.push({...childData,key:childKey})
      });
    });
    setAllUsers(users)
    setLoading(false)
  };
  const signUp = ({ firstName, lastName, email, password }) => {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        console.log(response);
        writeUserData({
          firstName,
          lastName,
          email,
        });
      })
      .catch((error) => {
        return { error };
      });
  };
  const signIn = ({ email, password }) => {
    return auth
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        setUser(response.user);
        getUsers();
        return response.user;
      })
      .catch((error) => {
        return { error };
      });
  };
  const signOut = () => {
    return auth.signOut().then(() => setUser(false));
  };
  return {
    user,
    signUp,
    signIn,
    allUsers,
    signOut,
    loading
  };
};
