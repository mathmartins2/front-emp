import React, { Suspense, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import Input, { InputMask } from '@common/components/InputBasic';
import {InputMaskSearch} from '@common/components/FieldText';
import { ButtonCancelSimple, ButtonSucess } from '@common/components/Button';
import SelectBasic from '@common/components/Select/Basic';
import StepsPill from '@common/components/StepsPill';

import { findByCep } from '@api/services/cep';
import { findCpnj } from '@api/services/cnpja';

import { IFormDataType } from './interface';

import styled from './style.module.scss';
import ButtonRadio from '@/modules/common/components/InputRadio';

const ViewCreatedCliente = () => {
    const navigate = useNavigate();

    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const { 
        register, 
        handleSubmit, 
        control, 
        setValue, 
        getValues, 
        watch, 
        formState: {isDirty, isValid} 
    } = useForm<IFormDataType>({
        defaultValues: {
            tipopessoa: 'fisica',
            simples: 'false'
        }
    });

    const watchTipoPessoa = watch('tipopessoa');

    useEffect(() => {
        setValue("cnpj", "", { shouldValidate: true });
    }, [watchTipoPessoa]);

    const watchCep = watch('cep');

    useEffect(() => {
        (async function fetchData() {
            if(watchCep && watchCep.replace('_', '').length === 10){
                const data = await findByCep(watchCep);
                
                if(data.status === 200){
                    const city = data.data;
                    setValue("pais", "Brasil", { shouldDirty: true });
                    city?.logradouro && setValue("endereco", city.logradouro, { shouldDirty: true });
                    city?.uf && setValue("estado", city.uf, { shouldDirty: true });
                    city?.localidade && setValue("cidade", city.localidade, { shouldDirty: true });
                    city?.bairro && setValue("bairro", city.bairro, { shouldDirty: true });
                    city?.complemento && setValue("complemento", city.complemento, { shouldDirty: true });
                }
            }
        })()
    }, [watchCep]);

    const watchCnpj = watch('cnpj');

    useEffect(() => {
        (async function fetchData() {
            if(watchCnpj && watchCnpj.replace('_', '').length === 18){
                const response = await findCpnj(watchCnpj);

                console.log(response);

                if(response.status === 200){
                    const address = response.data.address;
                    setValue("pais", address.country.name ?? '', { shouldDirty: true });
                    setValue("endereco", address.street ?? '', { shouldDirty: true });
                    setValue("estado", address.state ?? '', { shouldDirty: true });
                    setValue("cidade", address.city ?? '', { shouldDirty: true });
                    setValue("bairro", address.district ?? '', { shouldDirty: true });
                    setValue("complemento", address.details ?? '', { shouldDirty: true });
                    setValue("numero", address.number ?? '', { shouldDirty: true });
                    setValue("cep", address.zip.replace(/\D/g, "")
                        .replace(/(\d{2})(\d)/, "$1.$2")
                        .replace(/(\d{3})(\d)/, "$1-$2")
                        .replace(/(\d{3})(\d)/, "$1") ?? '', { shouldDirty: true });

                    const company = response.data.company;
                    setValue("nome", company.name, { shouldDirty: true });

                    const emails = response.data.emails;
                    if(emails.length > 0){
                        setValue("email", emails[0].address, { shouldDirty: true });
                    }

                    const phones = response.data.phones;
                    if(phones.length > 0){
                        setValue("telefone", `(${phones[0].area}) ${phones[0].number.substring(0, 4)}-${phones[0].number.substring(4, 9)}`, { shouldDirty: true });
                    }
                }
            }
        })()
    }, [watchCnpj]);

    const onSubmit = handleSubmit(data => {
        setButtonLoading(true);
        console.log(data)
    })

    const checkKeyDown = (e: any) => {
        if (e.code === 'Enter') e.preventDefault();
    };

    return (
        <Suspense fallback={<h1>carregando...</h1>}>
            <main className={styled["main"]}>
                <h1 className={styled["title__page"]}>Cadastrar cliente</h1>

                <form onSubmit={onSubmit} onKeyDown={(e) => checkKeyDown(e)}>
                    <StepsPill road='Dados do Cliente' step={1} />
                    <div className={styled["group_input"]}>
                        <SelectBasic title="Tipo de pessoa" setvalue={setValue} getvalue={getValues} register={register("tipopessoa", { required: true })} required={true}
                            options={[
                                {text: 'Física', value: 'fisica'},
                                {text: 'Juridíca', value: 'juridica'},
                            ]}
                            style={{width: 'calc(15% - 24px)', marginRight: '24px'}}
                        />

                        {
                            watchTipoPessoa === "fisica" ?

                            <InputMask 
                                title="CPF"
                                useformcontrol={control}
                                register={register("cnpj", { required: true })} 
                                style={{width: 'calc(30% - 24px)', marginRight: '24px'}} 
                                maskstring={[/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]}
                                required={true}
                                placeholder="___.___.___-__"
                            /> 

                            :

                            <InputMaskSearch
                                title={"CNPJ"}
                                register={register("cnpj", { required: true })}
                                setvalue={setValue}
                                useformcontrol={control}
                                maskstring={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/,/\d/, '-', /\d/, /\d/]}
                                placeholder={'__.___.___/____-__'}
                                required={true}
                                style={{width: 'calc(30% - 24px)', marginRight: '24px'}}
                            />

                        }

                        <Input title={watchTipoPessoa === "fisica" ? "Nome" : "Razão social"} register={register("nome")} required={false} style={{width: '55%'}} />
                    </div>

                    {
                        watchTipoPessoa === "juridica" && 
                        <>
                            <StepsPill road='Informações Fiscais' step={2} />
                            <div className={styled["group_input"]}>

                                <SelectBasic title="Indicador do IE" setvalue={setValue} getvalue={getValues} register={register("ie")}
                                    options={[
                                        {text: 'Não contribuinte', value: 'nao'},
                                        {text: 'Contribuinte', value: 'sim'},
                                        {text: 'Contribuinte isento', value: 'isento'},
                                    ]}
                                    style={{width: 'calc(20%)', marginRight: '24px'}}
                                />

                                <Input title="Inscrição Municipal" register={register("im")} style={{width: '20%', marginRight: '24px'}} />

                                <ButtonRadio 
                                    title="Optante pelo simples nacional" 
                                    options={[
                                        {titleOptions:"Sim", value: "true"}, 
                                        {titleOptions:"Não", value: "false"},
                                    ]} 
                                    register={register("simples")}
                                />
                            </div>  
                        </>
                    }

                    <StepsPill road='Endereço' step={watchTipoPessoa === "juridica" ? 3 : 2} />
                    <div className={styled["group_input"]}>

                        <InputMaskSearch
                            title="CEP"
                            register={register("cep")}
                            setvalue={setValue}
                            useformcontrol={control}
                            maskstring={[/\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                            style={{width: 'calc(25% - 24px)', marginRight: '24px'}}
                        />

                        <Input title="País" register={register("pais")} required={false} style={{width: 'calc(20% - 24px)', marginRight: 24}} />

                        <Input title="Endereço" register={register("endereco")} required={false} style={{width: 'calc(35% - 24px)', marginRight: 24}} />

                        <Input title="Estado" register={register("estado")} required={false} style={{width: '20%'}} />

                        <Input title="Cidade" register={register("cidade")} required={false} style={{width: 'calc(35% - 24px)', marginRight: 24}} />

                        <Input title="Bairro" register={register("bairro")} required={false} style={{width: 'calc(35% - 24px)', marginRight: 24}} />

                        <Input title="Número" register={register("numero")} required={false} style={{width: 'calc(15% - 24px)', marginRight: 24}} />

                        <Input title="Complemento" register={register("complemento")} required={false} style={{width: '15%'}} />

                    </div>

                    <StepsPill road='Contato' step={watchTipoPessoa === "juridica" ? 4 : 3} />
                    <div className={styled["group_input"]}>

                        <Input title="E-mail" register={register("email")} required={false} style={{width: '40%', marginRight: '24px'}} />

                        <InputMask 
                            title="Telefone Comercial" 
                            useformcontrol={control}
                            register={register("telefone")} 
                            style={{width: 'calc(30% - 24px)', marginRight: '24px'}} 
                            maskstring={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            placeholder="(__) ____-____"
                        />

                        <InputMask 
                            title="Celular" 
                            useformcontrol={control}
                            register={register("celular")} 
                            style={{width: 'calc(30% - 24px)'}} 
                            maskstring={['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                            placeholder="(__) _____-____"
                            iconright={<i className='fa fa-whatsapp'></i>}
                        />

                    </div>

                    <div className={styled["footer"]}>
                        <ButtonCancelSimple size="md" onclick={() => navigate(-1)}>Cancelar</ButtonCancelSimple>
                        <ButtonSucess 
                            submit={true}
                            size="md" 
                            onclick={() => null}
                            loading={buttonLoading}
                            disabled={!isValid || !isDirty}
                        >
                            Salvar
                        </ButtonSucess>
                    </div>
                </form>
            </main>
        </Suspense>
    )
}
export default ViewCreatedCliente

