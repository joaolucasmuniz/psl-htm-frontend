import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
    <div className="container d-flex flex-column align-items-center mt-5">
      <h1 className="display-4 mb-4">{client.name}</h1>
      <section className="card w-75">
        <div className="card-body">
          <p className="card-text">
            <b>Nome:</b>
            {' '}
            {client.name}
          </p>
          <p className="card-text">
            <b>Email:</b>
            {' '}
            {client.email}
          </p>
          <p className="card-text">
            <b>Telefone:</b>
            {' '}
            {client.phone}
          </p>
          <p className="card-text">
            <b>Endereço:</b>
            {' '}
            {client.address}
          </p>
          <p className="card-text">
            <b>Código Postal:</b>
            {' '}
            {client.postalcode}
          </p>
          <p className="card-text">
            <b>Nível de Acesso:</b>
            {' '}
            {client.access_level}
          </p>
        </div>
      </section>
      <div className="d-flex flex-column align-items-center mt-3 w-75">
        <button className="btn btn-primary mb-2 w-50">
          Editar
        </button>
        <button className="btn btn-danger mb-2 w-50" onClick={ handleDelete }>
          Excluir
        </button>
      </div>
    </div>
  );
}

export default ClientDetails;
