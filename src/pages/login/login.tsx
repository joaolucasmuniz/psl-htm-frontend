/* eslint-disable react/jsx-max-depth */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../helpers/urlBase';
import { ErrorAlert } from '../../utils/alert';
import Loading from '../../componentes/loading ';
import loginIcon from '../../images/login.jpg';

import styles from './login.module.css';

function Login() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const setLocalStorage = (token: string) => {
    localStorage.setItem('token', token);
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch(`https://${urlBase}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    setLoading(false);

    if (data.error) {
      ErrorAlert(data.error);
    } else {
      setLocalStorage(data.token);
      navigate('/clients');
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  if (loading) return <Loading />;

  return (
    <div className={ styles.loginContainer }>
      <section className={ styles.login }>
        <img src={ loginIcon } alt="login" />
        <section className={ styles.loginForm }>
          <div className={ styles.loginFormContainer }>
            <h1>Login</h1>
            <form
              onSubmit={ handleLogin }
            >
              <label htmlFor="username">
                Username
                <input
                  id="username"
                  type="text"
                  value={ username }
                  onChange={ handleUsername }
                  placeholder="Mariana.Vasconcelos"
                />
              </label>
              <button type="submit">
                Entrar
              </button>
            </form>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Login;
