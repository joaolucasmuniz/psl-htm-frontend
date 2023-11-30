import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TUser } from '../../types/types';
import { urlBase } from '../../helpers/urlBase';
import Loading from '../../componentes/loading ';
import { ErrorAlert } from '../../utils/alert';

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
      if (data.error) {
        ErrorAlert(data.error);
        navigate('/login');
      }
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
    <div className="container d-flex align-items-center flex-column mt-5">
      <div className="card w-75">
        <div className="card-body">
          <p className="card-text">
            <b>Nome:</b>
            {' '}
            {user.username}
          </p>
          <p className="card-text">
            <b>Nível de Acesso:</b>
            {' '}
            {user.access_level}
          </p>
        </div>
        <div className="card-footer d-flex justify-content-center">
          <button className="btn btn-danger w-50" onClick={ () => handleLogout() }>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
