import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Backbutton(props) {
  const { Redirect } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(Redirect);
  };

  return (
    <IconButton onClick={handleClick}>
      <ArrowBackIcon />
    </IconButton>
  );
}

Backbutton.propTypes = {
  Redirect: PropTypes.string.isRequired,
};
