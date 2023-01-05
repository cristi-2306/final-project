import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../App";

export function AuthContextProvider(props) {
  const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')) || {});
  const { children } = props;
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem('auth', JSON.stringify(auth));
  }, [auth]);

  function logOut() {
    window.localStorage.removeItem('auth');
    setAuth({});
    navigate('/');
  }

  function updateUser(updatedUser) {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    };
    fetch('http://localhost:3001/users', options)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setAuth(data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <AuthContext.Provider value={{ auth, setAuth, logOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}