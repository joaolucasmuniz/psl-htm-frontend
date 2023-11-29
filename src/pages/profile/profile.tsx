import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TUser } from '../../types/types';
import { urlBase } from '../../helpers/urlBase';
import Loading from '../../componentes/loading ';

function Profile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<TUser>({
    access_level: 0,
    id: 0,
    username: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const response = await fetch(`https://${urlBase}/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token') as string,
        },
      });
      const data = await response.json();
      setLoading(false);
      setUser(data[0]);
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <p>{`Nome: ${user.username}`}</p>
      <p>{`Nivel de acesso: ${user.access_level}`}</p>
      <button
        onClick={ () => handleLogout() }
      >
        Sair
      </button>
    </div>
  );
}

export default Profile;
