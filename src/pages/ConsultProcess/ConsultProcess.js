import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import Select from 'react-select';

import { useAlert } from 'react-alert';
import Backbutton from '../../components/BackButton/Backbutton';
import Navbar from '../../components/Navbar/Navbar';
import ProcessList from '../../components/ProcessList';

import ModalLoading from '../../components/ModalLoader/ModalLoader';

import Process from '../../services/process.service';

import './ConsultProcess.scss';
import '../../global.scss';

export default function ConsultProcess() {
  const [selectedValue, setSelectedValue] = useState(1);
  const [processes, setProcesses] = useState([]);
  const [loading, setLoading] = useState();

  const alert = useAlert();
  const { register, handleSubmit } = useForm();

  const customStyles = {
    control: () => ({
      height: '32px',
      border: '1px solid #555',
      display: '-webkit-flex',
    }),
  };

  const filterSeach = [
    {
      value: 1,
      label: 'Nome',
    },

    {
      value: 2,
      label: 'Número',
    },
  ];

  async function onSubmit({ filterContent }) {
    setLoading(true);
    const findElement = filterSeach.find((element) => element.value === selectedValue).label;
    const type = findElement === 'Nome' ? 'name' : 'code';
    try {
      const { data } = await Process.search({ type, value: filterContent });
      setProcesses(data);
      if (data.length === 0) {
        alert.info('Nenhuma demanda relacionada ao nome ou número foi encontrado.');
      }
    } catch (error) {
      alert.error('Erro na pesquisa da demanda');
    } finally {
      setLoading(false);
    }
  }

  /* eslint-disable */
  return (
    <div className="consultProcess-container">
      <ModalLoading loading={loading} />
      <header>
        <Navbar />
      </header>

      <main>
        <div className="title">
          <Backbutton Redirect="/" />
          <h1>Consultar Demanda</h1>
        </div>
        <div className="subtitle">
          <p>Pesquisar por:</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="seach">
            <div className="select-for">
              <Select
                styles={customStyles}
                value={filterSeach.find((obj) => obj.value === selectedValue)}
                options={filterSeach}
                onChange={(e) => setSelectedValue(e.value)}
              />
            </div>
            <div className="insert-params">
              <input
                type="text"
                placeholder={`Digite o ${filterSeach[selectedValue - 1].label.toLowerCase()}`}
                className="insert-params-input"
                name="filterContent"
                ref={register}
              />
            </div>
            <button type="submit">Pesquisar</button>
          </div>
        </form>
        <div className="process-progress">
          {processes.length !== 0 ? (
            processes.map((process) => <ProcessList key={process.id} process={process} />)
          ) : (
            <div className="not-found">
              <p>Nenhuma demanda encontrada...</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
