import { IAccount } from '../../list/interface';

export const accountToHttp = (accounts: IAccount[]) => {
  return accounts.map((item: IAccount) => ({
    key: item.id,
    situation: item.situation,
    value: item.id,
    data: [
      item?.bankIcon ,
      item.name,
      item.category,
      item.balance,
      item.situation === 'ativo' ? "<i className='fa fa-check-circle'></i>" : "<i className='fa fa-times-circle'></i>",
    ]
  }))
}