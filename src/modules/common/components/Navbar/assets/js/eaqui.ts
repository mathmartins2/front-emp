import cora from '../img/cora.svg';
import google from '../img/google.svg';
import contabilize from '../img/logo-nuvem.svg';
import hero from '../img/E-aqui-company-hero.svg';
import inova from '../img/cardsinova.svg';

interface IEaqui {
    title?: string,
    price: string,
    cent?: string,
    img: string,
    type: string,
    onclick?: () => void,
    identify?: string,
}

export const eaqui_fixed: IEaqui[] = [
    {
        type: 'parceiro',
        title: 'Conta PJ',
        price: 'Grátis',
        img: cora,
        onclick: () => window.location.href="https://lp.cora.com.br/afiliados/contabilize-aqui/",
    },
    {
        identify: 'google',
        type: 'parceiro',
        price: '10% de desconto',
        img: google,
        onclick: () => null,
    },
  ]
  
export const eaqui: IEaqui[] = shuffle([
    {
        type: 'contabilize',
        title: 'Parcelamento de impostos',
        price: 'R$ 223,',
        cent: '84',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Reprocesso Societário',
        price: 'R$ 223,',
        cent: '84',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Encerramento CNPJ',
        price: 'R$ 1.347,',
        cent: '80',
        img: contabilize,
        onclick: () => window.location.href="'https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Alteração Contratual Simples',
        price: 'R$ 336,',
        cent: '13',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Entrega Obrigações',
        price: 'R$ 223,',
        cent: '84',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'parceiro',
        title: 'Endereço Fiscal',
        price: 'R$ 77,',
        cent: '90',
        img: hero,
        onclick: () => window.location.href="https://www.companyhero.com/parceiros/contabilizeaqui",
    },
    {
        type: 'contabilize',
        title: 'Balanço de Abertura',
        price: 'R$ 167,',
        cent: '70',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Pesquisa Convenção Coletiva',
        price: 'R$ 223,',
        cent: '84',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'PER/DCOMP',
        price: 'R$ 223,',
        cent: '84',
        img: contabilize,
        onclick: () => window.location.href="'https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'parceiro',
        title: 'Certificado Digital A1',
        price: 'R$ 170,',
        cent: '00',
        img: inova,
        onclick: () => window.location.href="https://cardsinova.gfsis.com.br/gestaofacil/publico/RealizarPedido?local=9&indicacao=16813&idProduto=24&videoconferencia=sim&presencial=nao&renovacaoonline=nao&ocultarSelecaoProduto=nao&ocultarValidacao=sim",
    },
    {
        type: 'contabilize',
        title: 'Solicitação Simples Nacional',
        price: 'R$ 223,',
        cent: '84',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Certidão Negativa',
        price: 'R$ 61,',
        cent: '03',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Alteração Contratual',
        price: 'R$ 560,',
        cent: '70',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'CEPOM',
        price: 'R$ 336,',
        cent: '13',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Alteração Contratual Dupla',
        price: 'R$ 1.122,',
        cent: '12',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'parceiro',
        title: 'E-CPF A1',
        price: 'R$ 120,',
        cent: '00',
        img: inova,
        onclick: () => window.location.href="https://cardsinova.gfsis.com.br/gestaofacil/publico/RealizarPedido?local=9&indicacao=16813&idProduto=12&videoconferencia=sim&presencial=nao&renovacaoonline=nao&ocultarSelecaoProduto=nao&ocultarValidacao=sim",
    },
    {
        type: 'contabilize',
        title: 'Declaração de Faturamento Assinada',
        price: 'R$ 61,',
        cent: '03',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Encerramento MEI',
        price: 'R$ 336,',
        cent: '13',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
    {
        type: 'contabilize',
        title: 'Migrar MEI - ME',
        price: 'R$ 223,',
        cent: '84',
        img: contabilize,
        onclick: () => window.location.href="https://api.whatsapp.com/send/?phone=5519998449995&text=Ol%C3%A1!+Gostaria+de+mais+informa%C3%A7%C3%B5es+sobre+este+servi%C3%A7o+avulso%21&type=phone_number&app_absent=0",
    },
  ]);

  function shuffle(array: IEaqui[]) {
    const newArray = [...array]
    const length = newArray.length
  
    for (let start = 0; start < length; start++) {
      const randomPosition = Math.floor((newArray.length - start) * Math.random())
      const randomItem = newArray.splice(randomPosition, 1)
  
      newArray.push(...randomItem)
    }
  
    return newArray
  }