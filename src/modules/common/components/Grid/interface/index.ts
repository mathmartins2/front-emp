import React from "react";

export interface IColumn {
    key: string | number,
    title: string,
    size: string,
    center?: boolean;
}

interface IOption {
    text: string,
    icon?: React.ReactElement,
    callback?: (value: string) => void
}

interface IButton {
    option: IOption[]
}

export interface IData {
    key: string | number;
    data: string[] | React.ReactNode[];
    value?: string | number;
}

export interface IGrid {
    config: IColumn[],
    rows?: IData[] | null;
    style?: React.CSSProperties,
    button?: IButton
}
