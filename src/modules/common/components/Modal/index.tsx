import React, { useRef } from 'react';

import styled from './style.module.scss';

import { ButtonCancelOutline, ButtonCancelSimple, ButtonSucess } from '../Button'
import gifAlert from '../../assets/img/modal/alert.gif';
import InputBasic, { InputDate, InputMoney } from '../InputBasic';
import SelectBasic from '../Select/Basic';
import { Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

interface IProps {
    children: React.ReactElement,
    close: () => void,
}

interface IPropsSelectAccount extends IProps {
    title: string,
    onclick?: () => void
}

export const ModalHistory = ({ children, close }: IProps) => {
    const modal = useRef<HTMLDivElement>(null)

    function closeModal(event: React.MouseEvent) {
        if (event.target === modal.current) {
            close()
        }
    }

    return (
        <div className={styled["modal"]} ref={modal} onClick={(e) => closeModal(e)}>
            <div className={styled["modal__box"]}>
                <div className={styled["box__header"]}>
                    <span className={styled["title--history"]}>Histórico</span>
                    <i className='fa fa-times' onClick={() => close()}></i>
                </div>
                <div className={styled["box__content"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export const ModalSelectAccount = ({ children, close, title }: IPropsSelectAccount) => {
    const modal = useRef<HTMLDivElement>(null)

    function closeModal(event: React.MouseEvent) {
        if (event.target === modal.current) {
            close()
        }
    }

    return (
        <div className={styled["modal"]} ref={modal} onClick={(e) => closeModal(e)}>
            <div className={styled["modal__box-sm"]}>
                <div className={styled["box__header"]}>
                    <span className={styled["title--history"]}>{title}</span>
                    <i className='fa fa-times' onClick={() => close()}></i>
                </div>
                <div className={styled["box__content"]}>
                    {children}
                </div>
            </div>
        </div>
    )
}

interface IPropsConfirmation {
    close: () => void,
    setOk: () => void,
    title: string,
    description?: string,
}

export const ModalConfirmation = ({ close, setOk, title, description }: IPropsConfirmation) => {
    const modal = useRef<HTMLDivElement>(null)

    function closeModal(event: React.MouseEvent) {
        if (event.target === modal.current) {
            close()
        }
    }

    return (
        <div className={styled["modal"]} ref={modal} onClick={(e) => closeModal(e)}>
            <div className={styled["modal__box--confirmation"]}>
                <div className={styled["header"]}>
                    <img src={gifAlert} alt='GIF de alerta' />
                </div>
                <p className={styled["title"]}>{title}</p>
                <p className={styled["description"]}>{description}</p>
                <div className={styled["footer"]}>
                    <ButtonCancelSimple onclick={() => close()}>Cancelar</ButtonCancelSimple>
                    <ButtonCancelOutline onclick={() => setOk()}>Inativar</ButtonCancelOutline>
                </div>
            </div>
        </div>
    )
}

export const ModalSelectAccountWithFooter = ({ children, close, title }: IPropsSelectAccount) => {
    const modal = useRef<HTMLDivElement>(null)

    function closeModal(event: React.MouseEvent) {
        if (event.target === modal.current) {
            close()
        }
    }

    return (
        <div className={styled["modal"]} ref={modal} onClick={(e) => closeModal(e)}>
            <div className={styled["modal__box-sm"]}>
                <div className={styled["box__header"]}>
                    <span className={styled["title--history"]}>{title}</span>
                    <i className='fa fa-times' onClick={() => close()}></i>
                </div>
                <div className={styled["box__content"]}>
                    {children}
                </div>
                <div className={styled["footer"]}>
                    <ButtonCancelSimple onclick={() => close()}>Voltar</ButtonCancelSimple>
                    <ButtonSucess submit onclick={() => undefined}>Salvar conta</ButtonSucess>
                </div>
            </div>
        </div>
    )
}

interface ModalAccountBankProps extends ModalAccountProps {
    getValues: UseFormGetValues<any>
    setValue: UseFormSetValue<any>
    selectBanksOptions: { text: string; value: string; icon: JSX.Element; }[] | undefined
}

interface ModalAccountProps {
    register: any
    control: Control<any, any>
    bankImg: string
}

export const ModalAccountBox = ({ register, control, bankImg }: ModalAccountProps) => {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <div className={styled["modal__box__paragraph"]}>
                    <p>Por esta conta você pode gerenciar as negociações de sua empresa em dinheiro físico</p>
                </div>
                <div className={styled["modal__box__img"]}>
                    <img src={bankImg} alt="" />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <InputBasic
                    title={'Nome da conta'}
                    register={register("account.accountName")}
                    required={true}
                    placeholder={'Ex: Conta Corrente'}
                    style={{ width: '70%' }}
                />
                <InputMoney
                    useformcontrol={control}
                    title={'Saldo inicial'}
                    register={register("account.balance")}
                    required={true}
                    placeholder={'Ex: Conta Corrente'}
                    style={{ width: '30%', marginLeft: '20px' }}
                />
            </div>
        </div >
    )
}

export const ModalAccountBank = ({ register, getValues, setValue, control, selectBanksOptions, bankImg }: ModalAccountBankProps) => {
    return (
        <div>
            <div className={styled["modal__bank"]}>
                <SelectBasic
                    title='Banco'
                    register={register("account.bank")}
                    setvalue={setValue}
                    getvalue={getValues}
                    required={true}
                    options={selectBanksOptions}
                    style={{ maxWidth: '65%', marginBottom: 20 }}
                />
                <div className={styled["modal__bank__img"]}>
                    <img src={bankImg} alt="bank img" />
                </div>
            </div>
            <div className={styled["modal__bank__inputs"]}>
                <InputBasic
                    title={'Nome da conta'}
                    register={register("account.accountName")}
                    required={true}
                    placeholder={'Ex: Conta Corrente'}
                    style={{ width: '70%' }}
                />
                <InputMoney
                    useformcontrol={control}
                    title={'Saldo inicial'}
                    register={register("account.balance")}
                    required={true}
                    placeholder={'Ex: Conta Corrente'}
                    style={{ width: '30%', marginLeft: '20px' }}
                />
            </div>
            <div>
                <InputDate
                    style={{ marginTop: '20px', maxWidth: '30%' }}
                    useformcontrol={control}
                    title={'Data do saldo inicial'}
                    register={register('account.initialBalanceDate')}
                    required={true}
                />
            </div>
            <div className={styled["modal__bank__default__checkbox"]}>
                <input {...register('account.defaultAccount')} type="checkbox" />
                <label>
                    Definir conta como <b>conta padrão</b>, onde você
                    realiza o maior número de pagamentos e recebimentos
                </label>
            </div>
        </div>
    )
}