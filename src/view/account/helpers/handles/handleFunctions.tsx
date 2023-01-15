import React from 'react';
import api from '@/modules/api';
import { dateToString } from '../format/formatDate';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query'
import { accountToHttp } from '../view-map/toHttp';
import { IAccountList, IBank } from '../protocols/account-protocols';
import { keycloak } from "../../../../utils/auth";

export const handleSaveAccountBank = async (data) => {
    const { accountName, bank, balance, initialBalanceDate } = data.account;
    try {
        await api.post('http://localhost:3000/account/create', {
            name: accountName,
            category: 'conta_bancaria',
            bankId: bank,
            balance: Number(balance),
            situation: true,
            initialBalanceDate: new Date(initialBalanceDate).toISOString(),
            userId: keycloak.subject
        })
    } catch (error) {
        console.log(error);
    }
}

export const handleEditAccountBank = async (data) => {
    const { accountName, bank, balance, initialBalanceDate } = data.account;
    try {
        await api.put('http://localhost:3000/account/update', {
            id: data.id,
            name: accountName,
            bankId: bank,
            balance: Number(balance),
            initialBalanceDate: new Date(initialBalanceDate).toISOString(),
        })
    } catch (error) {
        console.log(error);
    }
}

export const handleSaveAccountBox = async (data) => {
  const { accountName, balance, initialBalanceDate } = data.account;
  try {
      await api.post('http://localhost:3000/account/create', {
          name: accountName,
          category: 'conta_caixa',
          balance: Number(balance),
          situation: true,
          initialBalanceDate: new Date(initialBalanceDate).toISOString(),
          userId: keycloak.subject
      })
  } catch (error) {
      console.log(error);
  }
}

export const handleEditAccountBox = async (data) => {
  const { accountName, balance, initialBalanceDate } = data.account;
  try {
      await api.put('http://localhost:3000/account/update', {
          id: data.id,
          name: accountName,
          balance: Number(balance),
          initialBalanceDate: new Date(initialBalanceDate).toISOString(),
      })
  } catch (error) {
      console.log(error);
  }
}

export const handleInactivateAccount = async (id) => {
  try {
      await api.put('http://localhost:3000/account/inactivate', {
          id
      })
  } catch (error) {
      console.log(error);
  }
}

export const handleOpenEditAccount = async (id: string, setCurrentAccount, setOpenBankingModalEditAccount, setOpenBankingModalEditAccountBox) => {
    try {
        const { setValue } = useForm();
        setCurrentAccount(id);
        const { data } = await api.get(`http://localhost:3000/account/${id}`);
        const { name, balance, bankId, initialBalanceDate, defaultAcc } = data.account;
        if(data.account.category === 'Conta Bancaria') {
            setValue('account', {
                accountName: name,
                bank: bankId,
                balance,
                initialBalanceDate: dateToString(initialBalanceDate),
                defaultAccount: defaultAcc
            })
            setOpenBankingModalEditAccount(true)
        } 
        if(data.account.category === 'Conta Caixa') {
            setValue('account', {
                accountName: name,
                balance
            })
            setOpenBankingModalEditAccountBox(true)
        } 
    } catch (error) {
        console.log(error)
    }
}

export const useAccounts = () => useQuery<IAccountList[]>('accounts', async () => {
    const { data } = await api.get(`http://localhost:3000/account/from/${keycloak.subject}`);
    return accountToHttp(data.accounts);
}, {
    staleTime: 1000 * 60 * 60 * 60,
})

export const useBanks = () => useQuery<{ text: string; value: string; icon: JSX.Element; }[]>('banks', async () => {
  const { data } = await api.get('http://localhost:3000/account/banks');
  return data.banks.map((item: IBank) => {
      return {
          text: item.fullName,
          value: item.id,
          icon: <img src={item.icon}></img>
      }
  });
});