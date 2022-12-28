import {
    ButtonSucess,
    IAccountList,
    ModalAccountBank,
    ModalAccountBox,
    ModalSelectAccount,
    ModalSelectAccountWithFooter,
    SearchBar,
    accountToHttp,
    gridButtonConfigs,
    gridConfig,
    selectBanksOptions,
    selectOptions,
    useEffect,
    useForm,
    useQuery,
    useState
} from '../helpers/protocols/account-protocols'
import SelectBasic from '@common/components/Select/Basic';
import Grid from '@common/components/Grid';
import api from '@/modules/api';
import BankCard from '@common/components/BankCard';
import BankImg from '@assets/img/bank.png';
import BoxImg from '@assets/img/box.png';
import styled from './style.module.scss';
import axios from 'axios';

const List = () => {
    const [openSelectModalAccount, setOpenSelectModalAccount] = useState<boolean>(false);
    const [openBankingModalAccount, setOpenBankingModalAccount] = useState<boolean>(false);
    const [openBankingModalAccountBox, setOpenBankingModalAccountBox] = useState<boolean>(false);
    const [situation, setSituation] = useState<string>('mostrar');
    const [search, setSearch] = useState<string>('');

    const { setValue, register, getValues, watch, control, handleSubmit } = useForm({});
    const watchSituation = watch("situation");

    useEffect(() => {
        setSituation(watchSituation);
    }, [watchSituation])

    const { data, isFetching } = useQuery<IAccountList[]>('accounts', async () => {
        const { data } = await axios.get('http://9bb8-170-238-214-222.ngrok.io/account/from/032250b8-1437-4dd3-8aff-76d64970cd3a');

        return accountToHttp(data);
    }, {
        staleTime: 1000 * 60, // 1 minute
    })

    const filteredData = search.length > 0 ?
        data?.
            filter(data => data.data.includes(search)).
            filter(data => data.situation === situation || situation === 'mostrar')
        : [];

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
                        onchange={(value) => setSearch(value)}
                        callback={console.log}
                        placeholder='Pesquisar por Nome, CPF...'
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
                    button={gridButtonConfigs}
                />
            ) : (
                <Grid
                    config={gridConfig}
                    rows={data}
                    button={gridButtonConfigs}
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
                    <ModalAccountBank register={register} setValue={setValue} getValues={getValues} control={control} bankImg={BankImg} selectBanksOptions={selectBanksOptions} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleSaveAccountBankBox)}>
                {openBankingModalAccountBox && <ModalSelectAccountWithFooter title='Cadastrar Conta Caixa' onclick={() => handleSubmit(handleSaveAccountBankBox)} close={() => setOpenBankingModalAccountBox(false)}>
                    <ModalAccountBox register={register} control={control} bankImg={BankImg} />
                </ModalSelectAccountWithFooter>}
            </form>
        </main>
    )
}

export default List