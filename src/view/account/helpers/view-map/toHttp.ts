import { IAccount } from '../../list/interface';

export const accountToHttp = (item: IAccount[]) => {
  return item.map((item: IAccount) => ({
    key: item.id,
    situation: item.situation,
    data: [
      item.name,
      item.category,
      item.balance,
    ]
  }))
}