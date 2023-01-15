export const gridConfig = [
  { key: 2, size: '4.5%', title: '', center: true },
  { key: 1, size: '50%', title: 'Nome da Conta' },
  { key: 3, size: '20%', title: 'Tipo' },
  { key: 4, size: '20%', title: 'Saldo Atual' },
  { key: 5, size: '10%', title: 'Situação', center: true },
]

export const gridButtonConfigs = {
  option: [
    { text: 'Editar', icon: <i className='fa fa-edit'></i>, callback: () => (1) },
    { text: 'Inativar', icon: <i className='fa fa-archive'></i>, callback: () => console.log() },
  ]
}

export const selectOptions = [
  { text: 'Mostrar todos', value: 'mostrar', icon: <i className='fa fa-list'></i> },
  { text: 'Ativo', value: 'ativo', icon: <i className='fa fa-check-circle'></i> },
  { text: 'Inativo', value: 'inativo', icon: <i className='fa fa-times-circle'></i> }
];

export const selectBanksOptions = [
  { text: 'Banco Itau', value: '1', icon: <img src={'https://empreendeaqui.com.br/assets/images/icons-banco/itau.svg'} alt='Banco Itau' /> },
];

export const buttonConfig = ({openEditAccount, openInactivate}) => ({
  option: [
    { text: 'Editar', icon: <i className='fa fa-edit'></i>, callback: openEditAccount },
    { text: 'Inativar', icon: <i className='fa fa-archive'></i>, callback: openInactivate },
]
})