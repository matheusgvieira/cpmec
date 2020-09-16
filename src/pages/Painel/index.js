import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { useAlert } from 'react-alert';
import PropTypes from 'prop-types';
import SearchIcon from '@material-ui/icons/Search';
import FilterListIcon from '@material-ui/icons/FilterList';
import { setListProcess } from '../../store/actions/ProcessAction';

import Navbar from '../../components/Navbar/Navbar';
import Process from '../../components/Process/process';
import Dropdown from '../../components/Dropdown/index';
import ModalLoader from '../../components/ModalLoader/ModalLoader';
import avatar from '../../assets/avatar.png';
import Input from '../../components/Input/Input';

import apiProcess from '../../services/process.service';

import './Painel.scss';
import '../../global.scss';

function Painel(props) {
  const { setProcesses, listProcess } = props;
  const [process, setProcess] = useState(); // eslint-disable-line
  const [loading, setLoading] = useState(true);
  const [filter, setFilterProcess] = useState(false);
  const [stateFilter, setStateFilter] = useState(false);
  const User = JSON.parse(localStorage.getItem('get_user'));
  const history = useHistory();
  const alert = useAlert();
  const { handleSubmit, register } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await apiProcess.index();
        setProcesses(data);
        setLoading(false);
      } catch (error) {
        alert.error('Erro na listagem de processos');
      }
    };
    fetchData();
  }, [alert, listProcess, setProcesses]);

  const onSubmit = ({ filterValue }) => {
    /* eslint-disable */
    if (filterValue) {
      setProcess(
        listProcess
          .filter(
            (proc) =>
              proc.receiver.name === filterValue ||
              proc.sender.name === filterValue ||
              proc.code === filterValue,
          )
          .map((value) => <Process key={value.id} demand={value} />),
      );
      setFilterProcess(true);
    } else {
      setFilterProcess(false);
    }
    /* eslint-enable */
  };

  return (
    <div className="painel-container">
      <ModalLoader loading={loading} />
      <header>
        <Navbar />
      </header>
      <main>
        <div className="usuario">
          <div className="avatar">
            <img src={User.avatar ? User.avatar : avatar} alt="AvatarIcon" />
            <span>{User.name}</span>
          </div>
          <Dropdown type />
        </div>

        <div className="title">
          <h3>Suas demandas</h3>
          {!stateFilter && (
            <button type="button" onClick={() => setStateFilter(true)}>
              <FilterListIcon />
            </button>
          )}
          {stateFilter && (
            <form onSubmit={handleSubmit(onSubmit)} className="field-search">
              <Input
                type="text"
                placeholder="Pesquise por nome ou número"
                className="insert-params-input"
                name="filterValue"
                inputRef={register}
              />
              <button type="submit">
                <SearchIcon />
              </button>
            </form>
          )}
        </div>
        <div className="process-list">
          {filter
            ? process
            : listProcess && listProcess.map((value) => <Process key={value.id} demand={value} />)}
        </div>
        <div className="process-include">
          {(User.type_user === 'ADMINISTRATOR' || User.type_user === 'USUARIO') && (
            <button type="button" onClick={() => history.push('/cadastro-processo')}>
              Incluir Demanda
            </button>
          )}
        </div>
      </main>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    listProcess: state.process.listProcess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProcesses(newState) {
      const action = setListProcess(newState);
      dispatch(action);
    },
  };
}

Painel.propTypes = {
  setProcesses: PropTypes.func.isRequired,
  listProcess: PropTypes.array.isRequired, //eslint-disable-line
};
export default connect(mapStateToProps, mapDispatchToProps)(Painel);
