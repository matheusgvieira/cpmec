export const dataType = [
  {
    value: 0,
    label: 'Tipo de atualização',
    isdisabled: true,
  },
  {
    value: 1,
    label: 'Informativo',
  },
  {
    value: 2,
    label: 'Importante',
  },
  {
    value: 3,
    label: 'Instrutivo',
  },
  {
    value: 4,
    label: 'Resposta',
  },
  {
    value: 5,
    label: 'Pergunta',
  },
  {
    value: 6,
    label: 'Encerramento',
  },
  {
    value: 7,
    label: 'Início',
  },
];

export const dataStatusType = [
  {
    value: 0,
    label: 'Status da demanda',
    isdisabled: true,
  },
  {
    value: 1,
    label: 'Em andamento',
  },
  {
    value: 2,
    label: 'Criado',
  },
  {
    value: 3,
    label: 'Cancelado',
  },
  {
    value: 4,
    label: 'Fechado',
  },
  {
    value: 5,
    label: 'Bloqueado',
  },
  {
    value: 6,
    label: 'Indevido',
  },
  {
    value: 7,
    label: 'Aguardando atuação do mediador',
  },
];

export const customStyles = {
  control: () => ({
    height: '32px',
    border: '1px solid #858583',
    display: 'flex',
    alignItems: 'center',
  }),
};
