//https://viacep.com.br/
import axios from "axios";
import { IFindByCep } from './interface'

const apiCep = axios.create({
  baseURL: 'https://viacep.com.br/ws/'
});

export const findByCep = async (cep: string): Promise<IFindByCep> => {
    const cepFormated = cep.replace('.', '').replace('-', '');
    
    return await apiCep.get(`${cepFormated}/json`)
    .then(data => { 
        return {
            status: data.status,
            data: data.data,
        };
    })
    .catch(err => {
        return {
            status: err.status
        };
    })
}