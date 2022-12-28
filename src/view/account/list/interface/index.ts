export interface IFormValue {
    situation: string;
    name: string;
}

export interface IAccountList {
    key: string;
    situation: string;
    data: string[];
}

export interface IAccount {
    id: string;
    name: string;
    category: string;
    balance: string;
    situation: string;
}