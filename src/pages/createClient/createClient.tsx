import { useState } from 'react';
import { TClientDetails } from '../../types/types';

function CreateClient() {
  const [newClient, setNewClient] = useState<TClientDetails>({
    name: '',
    access_level: 0,
    postalcode: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewClient({ ...newClient, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newClient);
  };

  return (
    <form onSubmit={ (e) => handleSubmit(e) }>
      <label htmlFor="name">
        Nome:
        <input
          name="name"
          type="text"
          id="name"
          value={ newClient.name }
          onChange={ (e) => handleChanges(e) }
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          name="email"
          type="email"
          id="email"
          value={ newClient.email }
          onChange={ (e) => handleChanges(e) }
        />
      </label>
      <label htmlFor="phone">
        Telefone:
        <input
          name="phone"
          type="text"
          id="phone"
          value={ newClient.phone }
          onChange={ (e) => handleChanges(e) }
        />
      </label>
      <label htmlFor="address">
        Endereço:
        <input
          name="address"
          type="text"
          id="address"
          value={ newClient.address }
          onChange={ (e) => handleChanges(e) }
        />
      </label>
      <label htmlFor="postalcode">
        Código postal:
        <input
          name="postalcode"
          type="text"
          id="postalcode"
          value={ newClient.postalcode }
          onChange={ (e) => handleChanges(e) }
        />
      </label>
      <label htmlFor="access_level">
        Nível de acesso:
        <input
          name="access_level"
          type="number"
          id="access_level"
          value={ newClient.access_level }
          onChange={ (e) => handleChanges(e) }
        />
      </label>
      <button
        type="submit"
      >
        Criar
      </button>
    </form>
  );
}

export default CreateClient;
