export interface ISnackbar {
    message: string;

    variant: 'success' | 'info' | 'error';

    autoHideDuration?: number
}

export interface ISnackbarState {
    snackbars: Array<ISnackbar>;
}