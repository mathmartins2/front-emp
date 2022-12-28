import React from "react"
import { UseFormRegisterReturn } from "react-hook-form"

export interface IButtonRadio {
    title: string,
    options: {
        titleOptions: string,
        value: string,
        checked?: boolean,
    }[],
    style?: React.CSSProperties,
    register: UseFormRegisterReturn<any>,
}




