import { useEffect, useState } from 'react';
import { ChevronLeftOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Button, Divider, Hidden, IconButton,
  List, ListItem, SwipeableDrawer, Toolbar, Typography } from '@mui/material';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  const [currentNav, setCurrentNav] = useState('Home');
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  function getFirstWordFromPathname() {
    const parts = pathname.split('/');
    const firstWord = parts[1];
    return firstWord;
  }

  const navigation = [
    {
      id: 'Clientes', path: '/clients',
    },
    {
      id: 'Perfil', path: '/profile',
    },
    {
      id: 'Criar Clientes', path: '/create-client',
    },
  ];

  useEffect(
    () => {
      const firstWord = getFirstWordFromPathname();
      navigation.forEach((item) => {
        if (item.path.toLowerCase() === `/${firstWord}`) {
          setCurrentNav(item.id);
        }
        if (firstWord === 'detalhes') {
          setCurrentNav('');
        }
      });
    },
    [pathname],
  );

  const handleNav = (path: string) => {
    navigate(path);
  };

  return (
    <AppBar color="default" position="static">
      <Toolbar>
        <Hidden smDown>
          <div className={ styles.logoContainer }>
            <PeopleAltOutlinedIcon />
          </div>
          <div style={ { flex: 1 } } />
          {navigation.map((item) => (
            <Button
              className={ `${styles.navButton} 
              ${currentNav === item.id ? styles.active : ''}` }
              key={ item.id }
              onClick={ () => handleNav(item.path) }
              color="inherit"
            >
              {item.id}
            </Button>
          ))}
        </Hidden>

        <Hidden smUp>
          <div>
            <PeopleAltOutlinedIcon />
          </div>
          <div style={ { flex: 1 } } />
          <Button color="inherit" onClick={ () => setOpen(true) }>
            <Typography marginRight="1rem">
              {currentNav}
            </Typography>
            <MenuOutlined />
          </Button>
        </Hidden>
      </Toolbar>

      <SwipeableDrawer
        anchor="left"
        open={ open }
        onOpen={ () => setOpen(true) }
        onClose={ () => setOpen(false) }
      >
        <div style={ { display: 'flex', justifyContent: 'flex-end' } }>
          <IconButton onClick={ () => setOpen(false) }>
            <ChevronLeftOutlined />
          </IconButton>
        </div>
        <Divider />
        <List
          sx={
          {
            width: 250,
          }
        }
        >
          {navigation.map((item) => (
            <ListItem key={ item.id }>
              <Button
                className={ `${styles.navButton} 
                ${currentNav === item.id ? styles.active : ''}` }
                onClick={ () => {
                  handleNav(item.path);
                  setOpen(false);
                } }
                color="inherit"
              >
                {item.id}
              </Button>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
}

export default Header;
