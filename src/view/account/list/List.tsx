import {
    ButtonSucess,
    ModalAccountBank,
    ModalAccountBox,
    ModalSelectAccount,
    ModalSelectAccountWithFooter,
    SearchBar,
    gridConfig,
    selectOptions,
    useEffect,
    useForm,
    useState,
    useQueryClient,
    ModalConfirmation,
} from '../helpers/protocols/account-protocols'
import SelectBasic from '@common/components/Select/Basic';
import Grid from '@common/components/Grid';
import BankCard from '@common/components/BankCard';
import BankImg from '@assets/img/bank.png';
import BoxImg from '@assets/img/box.png';
import IconBank from '@assets/img/celular.svg';
import IconBox from '@assets/img/money.svg';
import styled from './style.module.scss';
import { handleSaveAccountBank, handleEditAccountBank, handleSaveAccountBox, handleEditAccountBox, handleInactivateAccount, handleOpenEditAccount, useAccounts, useBanks } from '../helpers/handles/handleFunctions';

const List = () => {
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

    const { data, isFetching } = useAccounts();
    const { data: banks } = useBanks();

    const filteredData = search.length > 0 ?
        data?.
            filter(data => data.data.includes(search)).
            filter(data => data.situation === situation || situation === 'mostrar')
        : [];

    const handleSaveAccount = async (data) => {
        if (openBankingModalAccount) {
            await handleSaveAccountBank(data);
        } else {
            await handleSaveAccountBox(data);
        }
        await queryClient.invalidateQueries(['accounts']);
        setOpenSelectModalAccount(false);
    }
    
    const handleEditAccount = async (data) => {
        if (data.category === 'conta_bancaria') {
            await handleEditAccountBank(data);
        } else {
            await handleEditAccountBox(data);
        }
        await queryClient.invalidateQueries(['accounts']);
        setOpenBankingModalEditAccount(false);
        setOpenBankingModalEditAccountBox(false);
    }
    
    const handleInactiveAccount = async (id) => {
        await handleInactivateAccount(id);
        await queryClient.invalidateQueries(['accounts']);
        setOpenModalInactivate(false);
    }

    const openInactivate = (accountId: string) => {
        setCurrentAccount(accountId)
        setOpenModalInactivate(true)
    }

    const openEditAccount = async (id: string) => {
        await  handleOpenEditAccount(id, setCurrentAccount, setOpenBankingModalEditAccount, setOpenBankingModalEditAccountBox);
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
                            title='Situa????o'
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
                            <p>Qual tipo de conta voc?? deseja criar?</p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <BankCard setOpenBankingModalAccount={setOpenBankingModalAccount} account={'Banc??ria'} img={BankImg} />
                            <BankCard setOpenBankingModalAccount={setOpenBankingModalAccountBox} account={'Caixa'} img={BoxImg} />
                        </div>
                    </div>
                </ModalSelectAccount>
            }
            <form onSubmit={handleSubmit(handleSaveAccount)}>
                {openBankingModalAccount && <ModalSelectAccountWithFooter title='Cadastrar Conta Banc??ria' onclick={() => handleSubmit(handleSaveAccount)} close={() => setOpenBankingModalAccount(false)}>
                    <ModalAccountBank register={register} setValue={setValue} getValues={getValues} control={control} bankImg={IconBank} selectBanksOptions={banks} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleEditAccount)}>
                {openBankingModalEditAccount && <ModalSelectAccountWithFooter title='Editar Conta Banc??ria' onclick={() => handleSubmit(handleEditAccount)} close={() => setOpenBankingModalEditAccount(false)}>
                    <ModalAccountBank register={register} setValue={setValue} getValues={getValues} control={control} bankImg={IconBank} selectBanksOptions={banks} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleSaveAccount)}>
                {openBankingModalAccountBox && <ModalSelectAccountWithFooter title='Cadastrar Conta Caixa' onclick={() => handleSubmit(handleSaveAccount)} close={() => setOpenBankingModalAccountBox(false)}>
                    <ModalAccountBox register={register} control={control} bankImg={IconBox} />
                </ModalSelectAccountWithFooter>}
            </form>
            <form onSubmit={handleSubmit(handleSaveAccount)}>
                {openBankingModalEditAccountBox && <ModalSelectAccountWithFooter title='Editar Conta Caixa' onclick={() => handleSubmit(handleSaveAccount)} close={() => setOpenBankingModalEditAccountBox(false)}>
                    <ModalAccountBox register={register} control={control} bankImg={IconBox} />
                </ModalSelectAccountWithFooter>}
            </form>
            {openModalInactivate && (
                <ModalConfirmation 
                    close={() => setOpenModalInactivate(false)} 
                    setOk={() => handleInactiveAccount(currentAccount)}
                    title="Inactivate Conta"
                    description="Tem certeza que deseja inativar essa Conta?"
                />
            )}
        </main>
    )
}

export default List