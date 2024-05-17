import { ToastContainer, toast, Bounce } from 'react-toastify';
const successMessage = (text="Success") => {
    toast(text, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
    });
}
export default successMessage