import React from "react"
import { ButtonInfo } from '@common/components/Button';

interface Iprops {
  setOpenBankingModalAccount: (value: boolean) => void
  img: string;
  account: string;
}

const BankCard = ({ setOpenBankingModalAccount, img, account }: Iprops) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '15px',
      padding: '20px',
      border: '1px solid #40d0f0',
      borderRadius: '10px',
    }}>
      <img style={{ margin: '20px', maxWidth: '100px' }} src={img} alt='itau' />
      <ButtonInfo onclick={() => setOpenBankingModalAccount(true)}>{account}</ButtonInfo>
    </div>
  )
}

export default BankCard