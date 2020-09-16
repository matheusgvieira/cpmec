import React from 'react';
import { GoogleLogin } from 'react-google-login';
import Swal from 'sweetalert2';
import { useParams, useHistory } from 'react-router-dom';
import API from '../../../services/auth.service';
import IconGoogle from '../../../assets/icon/ic_google.svg';
import './SocialAuth.scss';
import '../../../global.scss';

export default function GoogleAuth() {
  const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;
  const { userId } = useParams();
  const history = useHistory();

  const handlerClick = async (event) => {
    const { profileObj } = event;

    if (profileObj) {
      try {
        const { data } = await API.isGoogleAuth({ google_id: profileObj.googleId });

        if (data && data.token && data.user) {
          localStorage.setItem('get_user', JSON.stringify(data.user));
          localStorage.setItem('jwt_token', data.token);
          return history.push('/painel');
        }
      } catch ({ response: { status } }) {
        if (status === 403) {
          if (userId !== 'mediator' && userId !== 'admin') {
            localStorage.setItem('google_data', JSON.stringify(profileObj));
            return history.push(`/register/${userId}`);
          }

          return history.goBack();
        }

        return Swal.fire({
          icon: 'error',
          title: 'Oops...',
          showCloseButton: true,
          showConfirmButton: false,
          text: 'Durante a autenticação com o google ocorreu um erro. Favor tente novamente.',
        });
      }
    }

    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      showCloseButton: true,
      showConfirmButton: false,
      text: 'Durante a autenticação com o google ocorreu um erro. Favor tente novamente.',
    });
  };

  return (
    <GoogleLogin
      clientId={REACT_APP_GOOGLE_CLIENT_ID}
      render={(renderProps) => (
        <button
          className="btn-auth-google"
          type="button"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <p>Conecte-se via Google</p>
          <img src={IconGoogle} alt="Icon Google" className="icon-google" />
        </button>
      )}
      buttonText="Login"
      onSuccess={handlerClick}
      cookiePolicy="single_host_origin"
    />
  );
}
