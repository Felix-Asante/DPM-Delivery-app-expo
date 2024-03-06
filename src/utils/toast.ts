import * as Burnt from 'burnt';

export function toastErrorMessage(message: string) {
  Burnt.toast({
    title: 'Something went wrong',
    preset: 'error',
    message,
    haptic: 'error',
    duration: 8,
    from: 'top',
  });
}
export function toastSuccessMessage(message: string) {
  Burnt.toast({
    title: message,
    preset: 'done',
    message,
    haptic: 'success',
    duration: 8,
    from: 'top',
  });
}
