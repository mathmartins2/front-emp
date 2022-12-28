import React, { Suspense, useState } from 'react';

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import Input, { InputMoney } from '@common/components/InputBasic';
import { ButtonCancelSimple, ButtonSucess } from '@common/components/Button';
import SelectWithSearch from '@common/components/Select/SelectWithSearch';
import SelectBasic from '@common/components/Select/Basic';
import ButtonRadio from '@common/components/InputRadio';
import StepsPill from '@common/components/StepsPill';

import { IFormDataType } from './interface';
import styled from './style.module.scss';

const ViewCreatedService = () => {
    const navigate = useNavigate();

    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    const { register, handleSubmit, control, setValue, getValues, watch, formState: {isDirty, isValid} } = useForm<IFormDataType>({   
        defaultValues: {
            codigomunicipal: '4359',
            impostoretido: 'false'
        }
    });

    const watchRetetido = watch('impostoretido', 'false');

    const onSubmit = handleSubmit(data => console.log(data))

    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <main className={styled["main"]}>

                <h1 className={styled["title__page"]}>Cadastrar serviço</h1>

                <form onSubmit={onSubmit}>
                    <StepsPill road='Dados do servico' step={1} />
                    <div className={styled["group_input"]}>
                        <Input title="Nome do serviço" register={register("name", { required: true })} required={true} style={{maxWidth: '55%', marginRight: 24}} />
                        <InputMoney title="Valor do serviço" useformcontrol={control} register={register("price", { required: true })} required={true} style={{maxWidth: '20%'}} />
                    </div>

                    <StepsPill road='Dados tributários' step={2} />
                    <div className={styled["group_input"]}>
                        <SelectWithSearch title="CNAE" name='cnae' setvalue={setValue} register={register("cnae", { required: true })} required={true}
                            options={[
                                {text: '6201-5/00 DESENHO DE PÁGINAS PARA A INTERNET - WEB DESIGN; SERVIÇOS DE', value: '6201-5/00'},
                                {text: '6201-5/01 WEB DESIGN', value: '6201-5/01'},
                                {text: '7410-2/01 DESIGN DE JÓIAS', value: '7410-2/01'},
                            ]} 
                        />

                        <SelectBasic title="Código do serviço municipal" setvalue={setValue} getvalue={getValues} register={register("codigomunicipal", { required: true })} required={true}
                            options={[
                                {text: '4359 Enfermagem, inclusive serviços auxiliares (regime especial – sociedade)', value: '4359'},
                                {text: '4383 Serviços farmacêuticos', value: '4383'},
                                {text: '4391 Fisioterapia', value: '4391'},
                            ]}
                            style={{width: 'calc(50% - 12px)', marginRight: '24px'}}
                        />

                        <SelectBasic title="Natureza da operação" setvalue={setValue} getvalue={getValues} register={register("natureza")}
                            options={[
                                {text: 'Tributação no município', value: '1'},
                                {text: 'Tributação fora do município', value: '2'},
                                {text: 'Isenção', value: '3'},
                                {text: 'Imune', value: '4'},
                                {text: 'Exigibilidade suspensa por decisão judicial', value: '5'},
                                {text: 'Exigibilidade suspensa por procedimento administrativo', value: '6'},
                            ]}
                            style={{width: 'calc(50% - 12px)'}}
                        />
                    </div>

                    <StepsPill road='Retenção de impostos' step={3} />
                    <div className={styled["group_input"]}>
                        <ButtonRadio 
                            title="Impostos retidos?" 
                            options={[
                                {titleOptions:"Sim", value: "true"}, 
                                {titleOptions:"Não", value: "false"},
                            ]} 
                            style={{marginRight: 24}} 
                            register={register("impostoretido")}
                        />

                        {
                            watchRetetido === 'true' && 
                                <>
                                    <Input title="ISS" required={false} register={register("iss")} iconright="%" style={{width: '100px', marginRight: 24}} />
                                    <Input title="INSS" required={false} register={register("inss")} iconright="%" style={{maxWidth: '100px'}} />
                                </>
                        }
                    </div>

                    <div className={styled["footer"]}>
                        <ButtonCancelSimple onclick={() => navigate(-1)}>Cancelar</ButtonCancelSimple>
                        <ButtonSucess 
                            submit={true}
                            style={{minWidth: 110}}
                            onclick={() => setButtonLoading(true)}
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
export default ViewCreatedService

