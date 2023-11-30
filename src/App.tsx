import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/login';
import ListClients from './pages/clients/clients';
import Layout from './componentes/layout';
import ClientDetails from './pages/clientDetails/clientDetails';
import Profile from './pages/profile/profile';
import CreateClient from './pages/createClient/createClient';
import EditClient from './pages/editClient/editClient';

function App() {
  return (

    <Routes>
      <Route path="/" element={ <Login /> } />
      <Route path="/login" element={ <Login /> } />
      <Route element={ <Layout /> }>
        <Route path="/clients" element={ <ListClients /> } />
        <Route path="/clients/:id" element={ <ClientDetails /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/create-client" element={ <CreateClient /> } />
        <Route path="/clients/edit/:id" element={ <EditClient /> } />
      </Route>
    </Routes>
  );
}

export default App;
