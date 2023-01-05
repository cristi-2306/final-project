import './Register.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[emailError, setEmailError] = useState('');
  const[passwordError, setPasswordError] = useState('');
  const[firstNameError, setFirstNameError] = useState('');
  const[lastNameError, setLastNameError] = useState('');
  const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
  const navigate = useNavigate();



  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');
    setFirstNameError('');
    setFirstNameError('');
    const body = { email, password, firstName, lastName };
    const emailValid = validateEmail(email);
    const passwordValid = validatePassword(password);
    const firstNameValid = validateFirstName(firstName);
    const lastNameValid = validateLastName(lastName);

    if (!emailValid || !passwordValid || !firstNameValid || !lastNameValid) {
     return;
      }

    fetch('http://localhost:3001/users', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate('/');
      }) 
      .catch((error) => {
        console.error(error);
      });
  };
   
  function validateFirstName(firstName) {
    if (!firstName) {
      setFirstNameError('Please enter your first name');
      return false;
    }
    return true;
  }
  
  function validateLastName(lastName) {
    if (!lastName) {
      setLastNameError('Please enter your last name');
      return false;
    }
    return true;
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


  return (
    <div className='register'>
    <form onSubmit={handleSubmit} className='register_form'>
    <div className='first-name'>
  <label className='first-name-label'>
    First Name:
    <input className='first-name-input'
      type="text"
      value={firstName}
      onChange={(event) => setFirstName(event.target.value)}
    />
    {firstNameError}
  </label>
</div>
<div className='last-name'>
  <label className='last-name-label'>
    Last Name:
    <input className='last-name-input'
      type="text"
      value={lastName}
      onChange={(event) => setLastName(event.target.value)}
    />
    {lastNameError}
  </label>
</div>




      <div className='email'>
      <label className='email_label'>
        Email:
        <input className='email_input'
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        /> {emailError}
      </label>
      </div>
    <div className='password'>
      <label className='password_label'>
        Password:
        <input className='password_input'
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        /> {passwordError}
      </label>
      </div>

      <button type="submit" className='register_btn'>Register</button>
    </form>
    </div>
  );
}

export default RegisterPage;