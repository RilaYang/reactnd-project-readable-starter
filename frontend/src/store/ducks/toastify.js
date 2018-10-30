// Action Types

export const Types = {
  TOAST_SUCCESS: 'toast/TOAST_SUCCESS',
  TOAST_ERROR: 'toast/TOAST_ERROR',
  TOAST_WARN: 'toast/TOAST_WARN',
  TOAST_INFO: 'toast/TOAST_INFO',
}

// Reducer
export default function reducer(state = {}, action) {
    return state
}

// Action Creators

export const toastSuccess = ({message, orientation}) => ({
    type: Types.TOAST_SUCCESS,
    meta:{
        toast: {
            message,
            orientation,
            type: 'success'
        }
    }
  })
  
  export const toastInfo = ({message, orientation}) => ({
    type: Types.TOAST_SUCCESS,
    meta:{
        toast: {
            message,
            orientation,
            type: 'info'
        }
    }
  })

  export const toastWarn = ({message, orientation}) => ({
    type: Types.TOAST_SUCCESS,
    meta:{
        toast: {
            message,
            orientation,
            type: 'warn'
        }
    }
  })

  export const toastError = ({message, orientation}) => ({
    type: Types.TOAST_SUCCESS,
    meta:{
        toast: {
            message,
            orientation,
            type: 'info'
        }
    }
  })


// Async Action Creators

// Selector