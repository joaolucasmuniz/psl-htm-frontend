import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlBase } from '../../helpers/urlBase';
import Card from '../../componentes/card';

import styles from './clients.module.css';

function ListClients() {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
      const response = await fetch(`https://${urlBase}/clients`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: token as string,
        },
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      }
      if (data.message) {
        alert(data.message);
      }

      setClients(data);
    };
    init();
  }, []);

  return (
    <div>
      <h1>Clientes</h1>
      <div className={ styles.container }>
        {clients && clients.map((client: any) => (
          <Card
            key={ client.id }
            id={ client.id }
            name={ client.name }
          />
        ))}
      </div>
    </div>
  );
}

export default ListClients;
