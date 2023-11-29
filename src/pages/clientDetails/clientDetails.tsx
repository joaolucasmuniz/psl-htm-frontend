import { useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { urlBase } from '../../helpers/urlBase';
import { TClientDetails } from '../../types/types';
import Loading from '../../componentes/loading ';
import { ErrorAlert, SuccessAlert } from '../../utils/alert';

function ClientDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [client, setClient] = useState<TClientDetails>({
    id: 0,
    access_level: 0,
    address: '',
    email: '',
    name: '',
    phone: '',
    postalcode: '',
  });

  const getClientById = async (clientId: string) => {
    const response = await fetch(`https://${urlBase}/clients/${clientId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token') as string,
      },
    });
    return response;
  };

  useEffect(() => {
    const getClient = async () => {
      setLoading(true);
      const response = await getClientById(id as string);
      const data = await response.json();
      setLoading(false);
      if (data.error || data.message) {
        ErrorAlert(data.error || data.message);
        navigate('/clients');
      } else {
        setClient(data[0]);
      }
    };
    getClient();
  }, []);

  const handleDelete = async () => {
    setLoading(true);
    const response = await fetch(`https://${urlBase}/clients/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token') as string,
      },
    });
    const data = await response.json();
    setLoading(false);
    if (data.error) {
      ErrorAlert(data.error);
    } else if (data.message) {
      SuccessAlert(data.message);
      navigate('/clients');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1>{client.name}</h1>
      <div>
        <p>{`Nome: ${client.name}`}</p>
        <p>{`Email: ${client.email}`}</p>
        <p>{`Telefone: ${client.phone}`}</p>
        <p>{`Endereço: ${client.address}`}</p>
        <p>{`Codigo Postal: ${client.postalcode}`}</p>
        <p>{`Nível de acesso: ${client.access_level}`}</p>
      </div>
      <div>
        <button>
          Editar
        </button>
        <button
          onClick={ handleDelete }
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ClientDetails;
