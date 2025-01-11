export type RootStackParamList = {
    Home: undefined;
    List: undefined;
    Profile: undefined;
    Login: undefined;
};

export type AuthState = {
    auth: {
        token: string | null;
    }
};

export type Headers = {
    "Content-Type"?: 'application/json' | 'application/x-www-form-urlencoded' | 'multipart/form-data';
    "Authorization"?: string;
    "Accept"?: string;
    "Access-Control-Allow-Origin"?: string;
    "Access-Control-Allow-Credentials"?: string;
    "Access-Control-Allow-Methods"?: string;
    "Access-Control-Allow-Headers"?: string;
};