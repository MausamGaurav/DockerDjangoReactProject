let API_SERVER_VAL = '';
let MEDIA_SERVER_VAL = '';
let FRONTEND_SERVER_VAL = ''; 

switch (process.env.NODE_ENV) {
    case 'development':
        API_SERVER_VAL = 'http://localhost:8000';
        MEDIA_SERVER_VAL = 'http://localhost:8000';
        FRONTEND_SERVER_VAL = 'http://localhost:3000';
        break;
    case 'production':
        API_SERVER_VAL = process.env.REACT_APP_API_SERVER;
        MEDIA_SERVER_VAL = process.env.REACT_APP_API_SERVER;
        FRONTEND_SERVER_VAL = process.env.REACT_APP_API_SERVER;
        break;
    default:
        API_SERVER_VAL = 'http://localhost:8000';
        MEDIA_SERVER_VAL = 'http://localhost:8000';
        FRONTEND_SERVER_VAL = 'http://localhost:3000';
        break;
}

export const API_SERVER = API_SERVER_VAL;
export const MEDIA_SERVER = MEDIA_SERVER_VAL;
export const FRONTEND_SERVER = FRONTEND_SERVER_VAL;

export const SESSION_DURATION = 5*3600*1000;