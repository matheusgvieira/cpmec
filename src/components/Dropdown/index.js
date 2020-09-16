import React from 'react';
import { useHistory } from 'react-router-dom';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import PropTypes from 'prop-types';

import './dropdown.scss';

function SimpleMenu({ type, id }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const User = JSON.parse(localStorage.getItem('get_user'));
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(event) => setAnchorEl(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {type ? (
          <div>
            <MenuItem onClick={() => history.push('/meu-perfil')}>Perfil</MenuItem>
            <MenuItem onClick={() => history.push('/minha-conta')}>Minha Conta</MenuItem>
            {User.type_user === 'ADMINISTRATOR' && (
              <MenuItem onClick={() => history.push('/insert-user')}>Inserir Usuário</MenuItem>
            )}
            <MenuItem onClick={handleLogout}>Sair</MenuItem>
          </div>
        ) : (
          <div>
            {(User.type_user === 'USUARIO' || User.type_user === 'ADMINISTRATOR') && (
              <MenuItem onClick={() => history.push(`/cadastro-processo/${id}`)}>Editar</MenuItem>
            )}
            {(User.type_user === 'MEDIADOR' || User.type_user === 'ADMINISTRATOR') && (
              <MenuItem onClick={() => history.push(`/adicionar-informacoes/${id}`)}>
                Atualizar
              </MenuItem>
            )}
            {User.type_user === 'ADMINISTRATOR' && (
              <MenuItem onClick={() => history.push(`/assign-mediator/${id}`)}>
                Designar Mediador
              </MenuItem>
            )}
          </div>
        )}
      </Menu>
    </div>
  );
}
SimpleMenu.propTypes = {
  type: PropTypes.bool.isRequired,
  id: PropTypes.number.isRequired,
};

export default SimpleMenu;
