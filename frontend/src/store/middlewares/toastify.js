import { toast } from 'react-toastify';

export default store => next => action => {
    if(action.meta && action.meta.toast){
        const { type, message, orientation, autoClose } = action.meta.toast
        toast[type](message || '', {
            position: orientation || toast.POSITION.TOP_CENTER,
            autoClose: autoClose || 2500
        })
    }
    return next(action)
}