import { useEffect, useState } from 'react';
import {
    ModalAccountBank,
    ModalAccountBox,
    ModalSelectAccount,
    ModalSelectAccountWithFooter
} from '@common/components/Modal';
import {
    gridButtonConfigs,
    gridConfig,
    selectBanksOptions,
    selectOptions
} from './configs';
import { useForm } from 'react-hook-form';
import { ButtonSucess } from '@common/components/Button';
import { SearchBar } from '@common/components/FieldText';
import { IAccount, IAccountList } from './interface';
import SelectBasic from '@common/components/Select/Basic';
import Grid from '@common/components/Grid';
import api from '@/modules/api';
import BankCard from '@common/components/BankCard';
import BankImg from '@assets/img/bank.png';
import boxImg from '@assets/img/box.png';
import styled from './style.module.scss';

const ViewListClient = () => {
    const [openSelectModalAccount, setOpenSelectModalAccount] = useState<boolean>(false);
    const [openBankingModalAccount, setOpenBankingModalAccount] = useState<boolean>(false);
    const [openBankingModalAccountBox, setOpenBankingModalAccountBox] = useState<boolean>(false);
    const [account, setAccount] = useState<IAccountList[]>([]);
    const [accountData, setAccountData] = useState<IAccountList[]>([]);
    const [accountName, setAccountName] = useState<string>('');
    const [situation, setSituation] = useState<string>('mostrar');

    const { setValue, register, getValues, watch, control, handleSubmit } = useForm({});
    const watchSituation = watch("situation");

    useEffect(() => {
        setSituation(watchSituation);
    }, [watchSituation])

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get('/account/from/032250b8-1437-4dd3-8aff-76d64970cd3a');
                const accountData = data.accounts.map((item: IAccount) => {
                    return {
                        key: item.id,
                        situation: item.situation,
                        data: [
                            'https://empreendeaqui.com.br/assets/images/icons-banco/itau.svg',
                            item.name,
                            item.category,
                            item.balance,
                            item.situation === 'ativo'
                                ? <i key='1' className='fa fa-check-circle'></i>
                                : <i key='2' className='fa fa-times-circle'></i>]
                    }
                });
                setAccount(accountData);
                setAccountData(accountData);
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    const handleSeach = () => {
        if (accountName === '' && situation === 'mostrar') {
            setAccountData(account);
        } else if (accountName === '' && situation !== 'mostrar') {
            const newData = account.filter((item) => item.situation === situation);
            setAccountData(newData);
        } else if (accountName !== '' && situation === 'mostrar') {
            const newData = account.filter((item) => item.data.includes(accountName));
            setAccountData(newData);
        } else if (accountName !== '' && situation !== 'mostrar') {
            const newData = account.filter((item) =>
                item.data.includes(accountName) && item.situation === situation);
            setAccountData(newData);
        }
    }

    const handleSaveAccountBank = async (data: any) => {
        const { accountName, bank, balance } = data;
        if (!accountName) {
            alert('Nome da conta é obrigatório');
            return;
        }
        if (!bank) {
            alert('Banco é obrigatório');
            return;
        }
        if (!balance) {
            alert('Saldo é obrigatório');
            return;
        }
        if (balance < 0) {
            alert('Saldo não pode ser negativo');
            return;
        }
        try {
            await api.post('/account', {
                name: accountName,
                category: openBankingModalAccount ? 'conta_bancaria' : 'conta_caixa',
                bankId: bank,
                balance: balance,
                situation: true,
                user_id: '032250b8-1437-4dd3-8aff-76d64970cd3a'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleSaveAccountBankBox = async (data: any) => {
        const { accountName, balance } = data;
        if (!accountName) {
            alert('Nome da conta é obrigatório');
            return;
        }
        if (!balance) {
            alert('Saldo é obrigatório');
            return;
        }
        if (balance < 0) {
            alert('Saldo não pode ser negativo');
            return;
        }
        try {
            await api.post('/account', {
                name: accountName,
                category: openBankingModalAccount ? 'conta_bancaria' : 'conta_caixa',
                bankId: '032250b8-1437-4dd3-8aff-76d64970cd3a',
                balance: balance,
                situation: true,
                user_id: '032250b8-1437-4dd3-8aff-76d64970cd3a'
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main className={styled["main"]}>
            <h1 className={styled["title__page"]}>Contas</h1>
            <div className={styled["group_input"]}>
                <ButtonSucess onclick={() => setOpenSelectModalAccount(true)}>Cadastrar Conta</ButtonSucess>
                <div className={styled["group_input__right"]}>
                    <form>
                        <SelectBasic
                            title='Situação'
                            register={register("situation")}
                            setvalue={setValue}
                            getvalue={getValues}
                            options={selectOptions}
                            style={{ maxWidth: '250px', marginBottom: 20 }}
                        />
                    </form>
                    <SearchBar
                        name='search'
                        onchange={(value) => setAccountName(value)}
                        callback={handleSeach}
                        placeholder='Pesquisar por Nome, CPF...'
                        style={{ marginLeft: 44, width: '50%', maxWidth: 370, minWidth: 270 }}
                    />
                </div>
            </div>
            {accountData && accountData.length > 0 ? (
                <Grid
                    config={gridConfig}
                    rows={accountData}
                    button={gridButtonConfigs}
                />
            ) : (
                <Grid
                    config={gridConfig}
                    rows={[]}
                />
            )}
            {openSelectModalAccount &&
                <ModalSelectAccount title='Cadastrar Conta' close={() => setOpenSelectModalAccount(false)}>
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p>Qual tipo de conta você deseja criar?</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BankCard setOpenBankingModalAccount={setOpenBankingModalAccount} account={'Bancária'} img={BankImg} />
                            <BankCard setOpenBankingModalAccount={setOpenBankingModalAccountBox} account={'Caixa'} img={boxImg} />
                        </div>
                    </div>
                </ModalSelectAccount>
            }
            <form onSubmit={handleSubmit(handleSaveAccountBank)}>
                {openBankingModalAccount && <ModalSelectAccountWithFooter title='Cadastrar Conta Bancária' onclick={() => handleSubmit(handleSaveAccountBank)} close={() => setOpenBankingModalAccount(false)}>
                    <ModalAccountBank register={register} setValue={setValue} getValues={getValues} control={control} bankImg={BankImg} selectBanksOptions={selectBanksOptions} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleSaveAccountBankBox)}>
                {openBankingModalAccountBox && <ModalSelectAccountWithFooter title='Cadastrar Conta Caixa' onclick={() => handleSubmit(handleSaveAccountBankBox)} close={() => setOpenBankingModalAccountBox(false)}>
                    <ModalAccountBox register={register} control={control} bankImg={BankImg} />
                </ModalSelectAccountWithFooter>}
            </form>
        </main >
    )
}

export default ViewListClient