import Swal from 'sweetalert2';

function ErrorAlert(message: string) {
  Swal.fire({
    title: 'Erro!',
    text: message,
    icon: 'error',
    timer: 1800,
    showCancelButton: false,
    showConfirmButton: false,
  });
}

function SuccessAlert(message: string) {
  Swal.fire({
    title: 'Sucesso!',
    text: message,
    icon: 'success',
    timer: 1800,
    showCancelButton: false,
    showConfirmButton: false,
  });
}

export { ErrorAlert, SuccessAlert };
