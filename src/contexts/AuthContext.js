import createDataContext from '../contexts/createDataContext';
import auth from '@react-native-firebase/auth';

const authReducer = (state, action) => {
    switch (action.type) {
        case 'signin':
            return { ...state, user: action.payload, timestamp: Date.now()}
        case 'register':
            return { ...state, user: action.payload, timestamp: Date.now()}
        case 'signout':
            return { ...state, user: null, timestamp: Date.now()}
        default:
            return state
    }
}

const signIn = (dispatch) => {
    return async (email, password, callback) => {

        dispatch({type:'signin', payload: []});

        if (callback) {
            callback();
        }
    }
}

const register = (dispatch) => {
    return async (email, password, callback) => {

        dispatch({type:'register', payload: []});

        if (callback) {
            callback();
        }
    }
}



const signUp = (dispatch) => {
    return async (email, password, callback) => {

        auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                dispatch({type:'get_tickets', payload: []});
            })
            .catch(error => {
                if (error.code === 'auth/operation-not-allowed') {
                  console.log('Enable anonymous in your firebase console.');
                }
            
                console.error(error);
            });


        if (callback) {
            callback();
        }
    }
}


export const { Provider, Context } = createDataContext(
    authReducer,
    {signUp, signIn, register},
    { user: null}
)