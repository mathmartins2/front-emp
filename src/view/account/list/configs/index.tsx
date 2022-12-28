export const gridConfig = [
  { key: 1, size: '50%', title: 'Nome da Conta' },
  { key: 2, size: '20%', title: 'Tipo' },
  { key: 3, size: '20%', title: 'Saldo Atual' },
  { key: 4, size: '10%', title: 'Situação', center: true },
]

export const gridButtonConfigs = {
  option: [
    { text: 'Editar', icon: <i className='fa fa-edit'></i>, callback: () => (1) },
    { text: 'Inativar', icon: <i className='fa fa-archive'></i>, callback: () => (1) },
  ]
}

export const selectOptions = [
  { text: 'Mostrar todos', value: 'mostrar', icon: <i className='fa fa-list'></i> },
  { text: 'Ativo', value: 'ativo', icon: <i className='fa fa-check-circle'></i> },
  { text: 'Inativo', value: 'inativo', icon: <i className='fa fa-times-circle'></i> }
];

export const selectBanksOptions = [
  { text: 'Banco Itau', value: 'itau', icon: <img src={'https://empreendeaqui.com.br/assets/images/icons-banco/itau.svg'} alt='Banco Itau' /> },
];