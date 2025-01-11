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