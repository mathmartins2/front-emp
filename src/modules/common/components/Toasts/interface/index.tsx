export interface IDisplayToast extends IToasts {
    visible: boolean
}

interface IToasts{
    type: 'sucess' | 'info' | 'error' | 'warning',
    info: string
};

export default IToasts
