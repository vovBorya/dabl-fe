export interface ISnackbar {
    message: string;

    variant: 'success' | 'info' | 'error';

    autoHideDuration?: number
}

export interface ISnackbarState {
    snackbar: ISnackbar | null;
}
