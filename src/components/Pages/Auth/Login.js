import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import { AuthContext } from "../../../App";


    function Login() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[emailError, setEmailError] = useState('');
    const[passwordError, setPasswordError] = useState('');

    const loginUrl = 'http://localhost:3001/Login'
    const {auth, setAuth} = useContext(AuthContext);
    
    const navigate = useNavigate();
     function passwordChangeHandler(event){
        setPassword(event.target.value);
     }

     function emailChangeHandler(event){
        setEmail(event.target.value);
     }
 
     function onSubmit(event){
        event.preventDefault();
        setEmailError('');
        setPasswordError('');

     
        const emailValid = validateEmail(email);
        const passwordValid = validatePassword(password);
        
       if(!emailValid || !passwordValid) {
        return;
       }

        const body ={
           email,
           password
        };
        fetch(loginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then((response) => response.json())
        .then((response) => {
            setAuth(response);
            navigate('/');
           
        });
     }
     
       
       function validateEmail(email) {
        const emailRegex =/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
       const emailValid = emailRegex.test(email);
        if (!emailValid) {
            setEmailError('Please enter a valid email');
        }
           return emailValid;
       }

       function validatePassword(password){
         const specialCharacterList =
          ['!', '@', '#', '$', '%', '^', '&', '*'];

        if (!(password.length >= 6)){
         setPasswordError('Password must contain at least 6 characters');

            return false;
        }
        let hasUpperCaseCharacter = false;
        let hasNumberCharacter = false;
        let hasSpecialCharacter = false;

        for (let letter of password){
            if (!specialCharacterList.includes(letter) 
            && Number.isNaN(Number(letter)) 
            && letter ===letter.toUpperCase()
            ){
                hasUpperCaseCharacter = true;
            }
            if(typeof Number(letter) ==='number') {
               hasNumberCharacter = true;
            }
            if (specialCharacterList.includes(letter)) {
             hasSpecialCharacter = true;
            }
        }

        if(!hasUpperCaseCharacter){
            setPasswordError('Your password must have at least one upper case character');
        }

        if(!hasNumberCharacter){ 
            setPasswordError('Your password must include at least one number');
        }

        if(!hasSpecialCharacter){ 
            setPasswordError('Your password must include at least one special character');
        }

         if (hasNumberCharacter && hasUpperCaseCharacter && hasSpecialCharacter) {
            return true;
         }
        return false;
       }

    return(
        <form onSubmit={onSubmit} noValidate>
            <div>
         <label htmlFor="email">Email</label>
         <input id="email" type='email' value={email} onChange={emailChangeHandler}/>
         {emailError}
         <p className="danger">{emailError}</p>
         </div>

         <div>
         <label htmlFor="password">Password</label>
         <input id="password" type='password' value={password} onChange={passwordChangeHandler}/>
           <p className="danger">{passwordError}</p>  
         </div>


          <button type="submit">
            Login
          </button>

        </form>
    );
}

export default Login;