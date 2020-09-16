import React from 'react';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import API from '../../../services/auth.service';

import IconFacebook from '../../../assets/facebook.svg';

const Facebook = () => {
  const history = useHistory();
  const { userId } = useParams();

  // eslint-disable-next-line camelcase
  const responseFacebook = async ({ id: facebook_id, ...rest }) => {
    try {
      const { data } = await API.isFacebookAuth({ facebook_id });

      if (data && data.token && data.user) {
        localStorage.setItem('get_user', JSON.stringify(data.user));
        localStorage.setItem('jwt_token', data.token);
        return history.push('/painel');
      }

      return false;
    } catch ({ response: { status } }) {
      if (status === 403) {
        if (userId !== 'mediator' && userId !== 'admin') {
          localStorage.setItem('facebook_data', JSON.stringify(rest));
          return history.push(`/register/${userId}`);
        }

        return history.goBack();
      }

      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        showCloseButton: true,
        showConfirmButton: false,
        text: 'Durante a autenticação com o facebook ocorreu um erro. Favor tente novamente.',
      });
    }
  };

  const appId = process.env.REACT_APP_FACEBOOK_ID;

  const btnStyle = {
    backgroundColor: 'transparent',
    fontSize: '1.1rem',
  };

  const imgStyle = {
    objectFit: 'contain',
    height: '30px',
  };

  const textStyle = {
    marginLeft: '0.8rem',
  };

  return (
    <FacebookLogin
      appId={appId}
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <button style={btnStyle} type="button" onClick={renderProps.onClick}>
          <img src={IconFacebook} style={imgStyle} alt="Icon Facebook" />
          <span style={textStyle}>Conecte-se via Facebook</span>
        </button>
      )}
    />
  );
};

export default Facebook;
