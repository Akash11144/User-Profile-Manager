import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const LOGIN = gql`
  mutation Login($email:String!) {
    login(email:$email) { token user { id email name } }
  }
`;

export default function Login({ onLoggedIn }:{ onLoggedIn: ()=>void }) {
  const [email, setEmail] = useState('');
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: (d) => { localStorage.setItem('token', d.login.token); onLoggedIn(); }
  });

  return (
    <form onSubmit={e=>{e.preventDefault(); login({ variables:{ email } });}}>
      <h2>Login</h2>
      <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/>
      <button disabled={loading}>Sign in</button>
      {error && <p style={{color:'crimson'}}>Error: {error.message}</p>}
    </form>
  );
}
