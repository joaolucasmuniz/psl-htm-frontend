import { useState } from 'react';
import { TCreateClient } from '../../types/types';
import { urlBase } from '../../helpers/urlBase';
import { ErrorAlert, SuccessAlert } from '../../utils/alert';

function CreateClient() {
  const [newClient, setNewClient] = useState<TCreateClient>({
    name: '',
    accessLevel: 0,
    postalcode: '',
    email: '',
    phone: '',
    address: '',
  });

  const [validations, setValidations] = useState({
    name: false,
    accessLevel: false,
    postalcode: false,
    email: false,
    phone: false,
    address: false,
  });

  const validate = (name: string, value: string) => {
    const regex = {
      name: /^[a-zA-Z ]{3,}$/,
      accessLevel: /^[0-9]{1,}$/,
      postalcode: /^[0-9]{5}-[0-9]{3}$/,
      email: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
      phone: /^[0-9]{10,11}$/,
      address: /^[a-zA-Z0-9 ]{5,}$/,
    };

    if (regex[name as keyof typeof regex].test(value)) {
      setValidations({ ...validations, [name]: true });
    } else {
      setValidations({ ...validations, [name]: false });
    }
  };

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    validate(e.target.name, e.target.value);
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const createClient = async () => {
    const response = await fetch(`https://${urlBase}/clients`, {
      method: 'POST',
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
    if (Object.values(validations).includes(false)) {
      return;
    }
    const response = await createClient();
    if (response.error) {
      ErrorAlert(response.error);
    } else if (response.message) {
      SuccessAlert(response.message);
    } else {
      ErrorAlert('Erro ao criar cliente');
    }
  };

  const cssClassInvalid = 'is-invalid';

  return (
    <div className="container mt-5 shadow-lg p-4 bg-white rounded">
      <h1
        className="text-center"
      >
        Cadastrar Cliente
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
            className={ `form-control ${!validations.name ? cssClassInvalid : ''}` }
            placeholder="Nome completo"
          />
          {!validations.name && (
            <div className="invalid-feedback">Nome inválido</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="email">Email:</label>
          <input
            name="email"
            type="email"
            id="email"
            value={ newClient.email }
            onChange={ (e) => handleChanges(e) }
            className={ `form-control ${!validations.email ? cssClassInvalid : ''}` }
            placeholder="SeuEmail@exemplo.com"
          />
          {!validations.email && (
            <div className="invalid-feedback">Email inválido</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phone">Telefone:</label>
          <input
            name="phone"
            type="tel"
            id="phone"
            value={ newClient.phone }
            onChange={ (e) => handleChanges(e) }
            className={ `form-control ${!validations.phone ? cssClassInvalid : ''}` }
            placeholder="(00) 00000-0000"
          />
          {!validations.phone && (
            <div className="invalid-feedback">Telefone inválido</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Endereço:</label>
          <input
            name="address"
            type="text"
            id="address"
            value={ newClient.address }
            onChange={ (e) => handleChanges(e) }
            className={ `form-control ${!validations.address ? cssClassInvalid : ''}` }
            placeholder='Rua "Nome da Rua", 0000'
          />
          {!validations.address && (
            <div className="invalid-feedback">Endereço inválido</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="postalcode">Código postal:</label>
          <input
            name="postalcode"
            type="text"
            id="postalcode"
            value={ newClient.postalcode }
            onChange={ (e) => handleChanges(e) }
            className={ `form-control ${!validations.postalcode ? cssClassInvalid : ''}` }
            placeholder="00000-000"
          />
          {!validations.postalcode && (
            <div className="invalid-feedback">Código postal inválido</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="accessLevel">Nível de acesso:</label>
          <input
            name="accessLevel"
            type="number"
            id="access_level"
            value={ newClient.accessLevel }
            onChange={ (e) => handleChanges(e) }
            className={ `form-control 
            ${!validations.accessLevel ? cssClassInvalid : ''}` }
          />
          {!validations.accessLevel && (
            <div className="invalid-feedback">Nível de acesso inválido</div>
          )}
        </div>
        <div className="form-group text-center mb-3">
          <button
            type="submit"
            className="btn btn-primary w-50"
            disabled={ Object.values(validations).includes(false) }
          >
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateClient;
