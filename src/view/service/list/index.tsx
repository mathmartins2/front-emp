import React, { Suspense, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";

import { ButtonSucess } from '@common/components/Button';
import SelectBasic from '@common/components/Select/Basic';
import {SearchBar} from '@common/components/FieldText';
import { ModalHistory, ModalConfirmation } from '@common/components/Modal';
import Grid from '@common/components/Grid';

import { IFormValue } from './interface';

import styled from './style.module.scss';

const ViewListService = () => {
    const navigate = useNavigate();

    const [openModalHistory, setOpenModalHistory] = useState<boolean>(false);
    const [openModalInativar, setOpenModalInativar] = useState<{open: boolean, value: string}>({open: false, value: ''});

    const setSearch = (value: string | number) => {
        console.log(value)
    }

    function openHistory(value: string){
        console.log('historico', value);
        setOpenModalHistory(true);
    }

    function openInativar(value: string){
        setOpenModalInativar({open: true, value: value});
    }

    function inativar(value: string){
        console.log(value);
        setOpenModalInativar({open: false, value: ''});
    }

    function openEdit(value: string){
        console.log(value);
        navigate('/servico/cadastro');
    }

    const { setValue, register, getValues, watch } = useForm<IFormValue>({ defaultValues: { situation: 'mostrar' }})

    const watchSituation = watch("situation");

    useEffect(() => {
        console.log(watchSituation);
    }, [watchSituation])

    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <main className={styled["main"]}>
                <h1 className={styled["title__page"]}>Serviços</h1>

                <div className={styled["group_input"]}>
                    <ButtonSucess onclick={()=> navigate('/servico/cadastro')} style={{marginRight: 24}}>Cadastrar serviço</ButtonSucess>
                    <div className={styled["group_input__right"]}>
                        
                        <form>
                            <SelectBasic 
                                title='Situação'
                                register={register("situation")}
                                setvalue={setValue}
                                getvalue={getValues}
                                options={[
                                    {text: 'Mostrar todos', value: 'mostrar', icon: <i className='fa fa-list'></i>},
                                    {text: 'Ativo', value: 'ativo', icon: <i className='fa fa-check-circle'></i>},
                                    {text: 'Inativo', value: 'inativo', icon: <i className='fa fa-times-circle'></i>}
                                ]}
                                style={{maxWidth: '250px', marginBottom: 20}}
                            />
                        </form>

                        <SearchBar 
                            name='search' 
                            placeholder='Pesquisar por código, valor...'
                            callback={setSearch}
                            style={{marginLeft: 44, width: '50%', maxWidth: 370, minWidth: 270}} 
                        />
                    </div>
                </div>

                <Grid 
                    config={[
                        {key: 1, size: '35%', title: 'Nome do serviço'}, 
                        {key: 2, size: '10%', title: 'Código'},
                        {key: 3, size: '30%', title: 'CNAE'},
                        {key: 4, size: '15%', title: 'Valor'},
                        {key: 5, size: '10%', title: 'Situação', center: true},
                    ]}
                    rows={[
                        {
                            key: 1,
                            data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='1' className='fa fa-check-circle'></i>],
                            value: '150'
                        },
                        {
                            key: 2,
                            data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='2' className='fa fa-check-circle'></i>],
                            value: '150'
                        }
                    ]}

                    button={{option: [
                        {text: 'Editar', icon: <i className='fa fa-edit'></i>, callback: openEdit}, 
                        {text: 'Histórico', icon: <i className='fa fa-history'></i>, callback: openHistory}, 
                        {text: 'Inativar', icon: <i className='fa fa-archive'></i>, callback: openInativar}
                    ]}}
                />

                {
                    openModalHistory &&
                    <ModalHistory close={() => setOpenModalHistory(false)}>
                        <Grid 
                            config={[
                                {key: 1, size: '35%', title: 'Nome do serviço'}, 
                                {key: 2, size: '10%', title: 'Código'},
                                {key: 3, size: '30%', title: 'CNAE'},
                                {key: 4, size: '15%', title: 'Valor'},
                                {key: 5, size: '10%', title: 'Situação', center: true},
                            ]}
                            rows={[
                                {
                                    key: 1,
                                    data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='1' className='fa fa-check-circle'></i>],
                                    value: '150'
                                },
                                {
                                    key: 2,
                                    data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='2' className='fa fa-check-circle'></i>],
                                    value: '150'
                                },
                                {
                                    key: 3,
                                    data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='3' className='fa fa-check-circle'></i>],
                                    value: '150'
                                },
                                {
                                    key: 4,
                                    data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='4' className='fa fa-check-circle'></i>],
                                    value: '150'
                                },
                                {
                                    key: 5,
                                    data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='5' className='fa fa-check-circle'></i>],
                                    value: '150'
                                },
                                {
                                    key: 6,
                                    data: ['Layout de site básico', 4444, '6789-5/55 LOREM IPSUM DOLOR LOREM IPSUM DOLOR', 'R$ 2.455,00', <i key='6' className='fa fa-check-circle'></i>],
                                    value: '150'
                                }
                            ]}

                            button={{option: [
                                {text: 'Editar', icon: <i className='fa fa-edit'></i>}, 
                                {text: 'Histórico', icon: <i className='fa fa-history'></i>, callback: openHistory}, 
                                {text: 'Inativar', icon: <i className='fa fa-archive'></i>}
                            ]}}
                        />
                    </ModalHistory>
                }
                {
                    openModalInativar.open &&
                    <ModalConfirmation 
                        close={() => setOpenModalInativar(old => ({open: false, value: old.value}))} 
                        setOk={() => inativar(openModalInativar.value)}
                        title="Inativar serviço"
                        description="Tem certeza que deseja inativar esse serviço?"
                    />
                }

            </main>
        </Suspense>
    )
}
export default ViewListService

