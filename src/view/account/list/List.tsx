import {
    ButtonSucess,
    IAccountList,
    ModalAccountBank,
    ModalAccountBox,
    ModalSelectAccount,
    ModalSelectAccountWithFooter,
    SearchBar,
    accountToHttp,
    gridConfig,
    selectOptions,
    useEffect,
    useForm,
    useQuery,
    useState,
    useQueryClient,
    ModalConfirmation,
    IBank,
    dateToIso,
    dateToString
} from '../helpers/protocols/account-protocols'
import SelectBasic from '@common/components/Select/Basic';
import Grid from '@common/components/Grid';
import api from '@/modules/api';
import BankCard from '@common/components/BankCard';
import BankImg from '@assets/img/bank.png';
import BoxImg from '@assets/img/box.png';
import IconBank from '@assets/img/celular.svg';
import IconBox from '@assets/img/money.svg';
import styled from './style.module.scss';
import { useKeycloak } from '@react-keycloak/web';

const List = () => {
    const result =  useKeycloak();
    console.log(result)
    const queryClient = useQueryClient();
    const [openSelectModalAccount, setOpenSelectModalAccount] = useState<boolean>(false);
    const [openBankingModalAccount, setOpenBankingModalAccount] = useState<boolean>(false);
    const [openBankingModalEditAccount, setOpenBankingModalEditAccount] = useState<boolean>(false);
    const [openBankingModalAccountBox, setOpenBankingModalAccountBox] = useState<boolean>(false);
    const [openBankingModalEditAccountBox, setOpenBankingModalEditAccountBox] = useState<boolean>(false);
    const [openModalInactivate, setOpenModalInactivate] = useState<boolean>(false);
    const [currentAccount, setCurrentAccount] = useState<string>("");
    const [situation, setSituation] = useState<string>('mostrar');
    const [search, setSearch] = useState<string>('');
    const { setValue, register, getValues, watch, control, handleSubmit } = useForm({});
    const watchSituation = watch("situation");

    useEffect(() => {
        setSituation(watchSituation);
    }, [watchSituation])

    const { data, isFetching } = useQuery<IAccountList[]>('accounts', async () => {
        const { data } = await api.get('http://localhost:3000/account/from/032250b8-1437-4dd3-8aff-76d64970cd3a');

        return accountToHttp(data.accounts);
    }, {
        staleTime: 1000 * 60 * 60 * 60,
    })

    const { data: banks } = useQuery('banks', async () => {
        const { data } = await api.get('http://localhost:3000/account/banks');
        return data.banks.map((item: IBank) => {
            return {
                text: item.fullName,
                value: item.id,
                icon: <img src={item.icon}></img>
            }
        });
    })

    const filteredData = search.length > 0 ?
        data?.
            filter(data => data.data.includes(search)).
            filter(data => data.situation === situation || situation === 'mostrar')
        : [];

    const handleSaveAccountBank = async (data) => {
        const { accountName, bank, balance, initialBalanceDate } = data.account;
        try {
            await api.post('http://localhost:3000/account/create', {
                name: accountName,
                category: openBankingModalAccount ? 'conta_bancaria' : 'conta_caixa',
                bankId: bank,
                balance: Number(balance),
                situation: true,
                initialBalanceDate: new Date(initialBalanceDate).toISOString(),
                userId: '032250b8-1437-4dd3-8aff-76d64970cd3a'
            })
            await queryClient.invalidateQueries(['accounts'])
            setOpenSelectModalAccount(false)
            setOpenBankingModalAccount(false)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const handleSaveAccountBankBox = async (data) => {
        const { accountName, balance,  } = data.account;
        try {
            await api.post('http://localhost:3000/account/create', {
                name: accountName,
                category: openBankingModalAccount ? 'conta_bancaria' : 'conta_caixa',
                balance: Number(balance),
                situation: true,
                userId: '032250b8-1437-4dd3-8aff-76d64970cd3a'
            })
            await queryClient.invalidateQueries(['accounts'])
            setOpenSelectModalAccount(false)
            setOpenBankingModalAccountBox(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDisableAccount = async () => {
        try {
            await api.put(`http://localhost:3000/account/disable/${currentAccount}`)
            await queryClient.invalidateQueries(['accounts'])
            setOpenModalInactivate(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditAccount = async (data) => {
        const { accountName, bank, balance, initialBalanceDate } = data.account;
        try {
            await api.post('http://localhost:3000/account/update', {
                id: currentAccount,
                accountName,
                balance: Number(balance),
                bank,
                initialBalanceDate: dateToIso(initialBalanceDate)
            })
            await queryClient.invalidateQueries(['accounts'])
            setOpenBankingModalEditAccount(false)
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleEditAccountBankBox = async (data) => {
        const { accountName, balance } = data.account;
        try {
            await api.post('http://localhost:3000/account/update', {
                id: currentAccount,
                accountName,
                balance: Number(balance)
            })
            await queryClient.invalidateQueries(['accounts'])
            setOpenBankingModalEditAccountBox(false)
        } catch (error) {
            console.log(error)
        }
    }

    const openInactivate = (accountId: string) => {
        setCurrentAccount(accountId)
        setOpenModalInactivate(true)
    }

    const openEditAccount = async (id: string) => {
        try {
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

    const buttonConfig = {
        option: [
            { text: 'Editar', icon: <i className='fa fa-edit'></i>, callback: openEditAccount },
            { text: 'Inativar', icon: <i className='fa fa-archive'></i>, callback: openInactivate },
        ]
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
                        onchange={(value) => setSearch(value)}
                        callback={console.log}
                        placeholder='Pesquisar por Nome, Tipo...'
                        style={{ marginLeft: 44, width: '50%', maxWidth: 370, minWidth: 270 }}
                    />
                </div>
            </div>
            {isFetching ? (
                <div>Carregando...</div>
            ) : (search.length ? (
                <Grid
                    config={gridConfig}
                    rows={filteredData}
                    button={buttonConfig}
                />
            ) : (
                <Grid
                    config={gridConfig}
                    rows={data}
                    button={buttonConfig}
                />
            ))}
            {openSelectModalAccount &&
                <ModalSelectAccount title='Cadastrar Conta' close={() => setOpenSelectModalAccount(false)}>
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <p>Qual tipo de conta você deseja criar?</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BankCard setOpenBankingModalAccount={setOpenBankingModalAccount} account={'Bancária'} img={BankImg} />
                            <BankCard setOpenBankingModalAccount={setOpenBankingModalAccountBox} account={'Caixa'} img={BoxImg} />
                        </div>
                    </div>
                </ModalSelectAccount>
            }
            <form onSubmit={handleSubmit(handleSaveAccountBank)}>
                {openBankingModalAccount && <ModalSelectAccountWithFooter title='Cadastrar Conta Bancária' onclick={() => handleSubmit(handleSaveAccountBank)} close={() => setOpenBankingModalAccount(false)}>
                    <ModalAccountBank register={register} setValue={setValue} getValues={getValues} control={control} bankImg={IconBank} selectBanksOptions={banks} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleEditAccount)}>
                {openBankingModalEditAccount && <ModalSelectAccountWithFooter title='Editar Conta Bancária' onclick={() => handleSubmit(handleEditAccount)} close={() => setOpenBankingModalEditAccount(false)}>
                    <ModalAccountBank register={register} setValue={setValue} getValues={getValues} control={control} bankImg={IconBank} selectBanksOptions={banks} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleSaveAccountBankBox)}>
                {openBankingModalAccountBox && <ModalSelectAccountWithFooter title='Cadastrar Conta Caixa' onclick={() => handleSubmit(handleSaveAccountBankBox)} close={() => setOpenBankingModalAccountBox(false)}>
                    <ModalAccountBox register={register} control={control} bankImg={IconBox} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleEditAccountBankBox)}>
                {openBankingModalEditAccountBox && <ModalSelectAccountWithFooter title='Editar Conta Caixa' onclick={() => handleSubmit(handleEditAccountBankBox)} close={() => setOpenBankingModalEditAccountBox(false)}>
                    <ModalAccountBox register={register} control={control} bankImg={IconBox} />
                </ModalSelectAccountWithFooter>}
            </form>
            {openModalInactivate && (
                <ModalConfirmation 
                    close={() => setOpenModalInactivate(false)} 
                    setOk={() => handleDisableAccount()}
                    title="Inactivate Conta"
                    description="Tem certeza que deseja inativar essa Conta?"
                />
            )}
        </main>
    )
}

export default List