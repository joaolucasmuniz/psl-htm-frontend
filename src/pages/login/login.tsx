import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../helpers/urlBase';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const setLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await fetch(`https://${urlBase}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else {
      setLocalStorage(data.token);
      navigate('/');
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  return (
    <div>
      <h1>Login</h1>

      <form
        onSubmit={ handleLogin }
      >
        <label htmlFor="username">
          Usuário
          <input
            id="username"
            type="text"
            value={ username }
            onChange={ handleUsername }
          />
        </label>
        <button type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
