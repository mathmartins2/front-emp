import React, { Suspense } from 'react';
import styled from './style.module.scss';

import imgMobile from '@assets/img/servico/Group.svg';

const ViewMobileService = () => {
    const host = window.location.host;

    return (
        <Suspense fallback={<h1>loading...</h1>}>
            <main className={styled["main_mobile"]}>
                <div className={styled["header"]}>
                    <i 
                        className='fa fa-arrow-left'
                        onClick={() => window.location.href=`${host}/Dashboard/Resumo/Index`}
                    ></i>
                </div>
                <h1 className={styled["title__page"]}>Serviços</h1>
                <p className={styled["description"]}>Oops!</p>
                <p className={styled["description"]}>A aba de serviços está disponível apenas para <b>uso no computador</b> por enquanto :(</p>
                <div className={styled["content"]}>
                    <img src={imgMobile} alt='Icone emoji triste' />
                    <p 
                        className={styled["content__link"]}
                        onClick={() => window.location.href=`${host}/Dashboard/Resumo/Index`}
                    >
                        Voltar ao site
                    </p>
                </div>
            </main>
        </Suspense>
    )
}
export default ViewMobileService;

