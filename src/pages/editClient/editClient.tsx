import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TCreateClient } from '../../types/types';
import { urlBase } from '../../helpers/urlBase';
import { ErrorAlert, SuccessAlert } from '../../utils/alert';
import Loading from '../../componentes/loading ';

function EditClient() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [newClient, setNewClient] = useState<TCreateClient>({
    name: '',
    accessLevel: 0,
    postalcode: '',
    email: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    const getClient = async () => {
      setLoading(true);
      const response = await fetch(`https://${urlBase}/clients/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: localStorage.getItem('token') as string,
        },
      });
      const data = await response.json();
      setLoading(false);
      if (data.error || data.message) {
        ErrorAlert(data.error || data.message);
        navigate('/clients');
      } else {
        const values = {
          ...data[0],
          accessLevel: Number(data[0].access_level),
        };
        delete values.access_level;
        setNewClient(values);
      }
    };
    getClient();
  }, []);

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const editClient = async () => {
    const response = await fetch(`https://${urlBase}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.getItem('token') as string,
      },
      body: JSON.stringify(newClient),
    });

    const data = await response.json();
    return data;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await editClient();
    if (response.error) {
      ErrorAlert(response.error);
    } else if (response.message) {
      SuccessAlert(response.message);
      navigate('/clients');
    } else {
      ErrorAlert('Erro ao editar cliente');
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="container mt-5 shadow-lg p-4 bg-white rounded">
      <h1
        className="text-center"
      >
        Editar cadastro de cliente
      </h1>
      <form
        onSubmit={ (e) => handleSubmit(e) }
      >
        <div className="form-group mb-3">
          <label htmlFor="name">Nome:</label>
          <input
            name="name"
            type="text"
            id="name"
            value={ newClient.name }
            onChange={ (e) => handleChanges(e) }
            className="form-control"
            placeholder="Nome completo"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            value={ newClient.email }
            onChange={ (e) => handleChanges(e) }
            className="form-control"
            placeholder="SeuEmail@exemplo.com"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone">Telefone:</label>
          <input
            name="phone"
            type="tel"
            id="phone"
            value={ newClient.phone }
            onChange={ (e) => handleChanges(e) }
            className="form-control "
            placeholder="(00) 00000-0000"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Endereço:</label>
          <input
            name="address"
            type="text"
            id="address"
            value={ newClient.address }
            onChange={ (e) => handleChanges(e) }
            className="form-control "
            placeholder='Rua "Nome da Rua", 0000'
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="postalcode">Código postal:</label>
          <input
            name="postalcode"
            type="text"
            id="postalcode"
            value={ newClient.postalcode }
            onChange={ (e) => handleChanges(e) }
            className="form-control "
            placeholder="00000-000"
            required
          />
        </div>

        <div className="form-group mb-3">
          <label htmlFor="accessLevel">Nível de acesso:</label>
          <input
            name="accessLevel"
            type="number"
            id="access_level"
            value={ newClient.accessLevel }
            onChange={ (e) => handleChanges(e) }
            className="form-control"
            required
          />

        </div>
        <div className="form-group text-center mb-3">
          <button
            type="submit"
            className="btn btn-primary w-50"
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditClient;
