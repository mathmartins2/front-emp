//https://cnpja.com/docs/api/quickstart/
import axios from "axios";
import { IFindCNPJ } from './interface'

const api = axios.create({
  baseURL: 'https://api.cnpja.com/office/',
  headers: {
    'Authorization': process.env.REACT_APP_KEY_CNPJA
  }
});

export const findCpnj = async (cnpj: string): Promise<IFindCNPJ> => {
    const cnpjFormated = cnpj.replace(/\D/g, '');
    
    return await api.get(`${cnpjFormated}`)
    .then(data => { 
        return {
            status: data.status,
            data: data.data
        }
    })
    .catch(err => {
        return {
            status: err.status,
        }
    })
}