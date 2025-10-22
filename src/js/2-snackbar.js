import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", submited)

function submited (event) {
event.preventDefault();

const state = form.state.value;
const delay = +form.delay.value;

if (delay > 0) {
const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (state === "fulfilled") {
            resolve("resolve");
        }else{
            reject("reject");
        }
        }, delay)
    })
    prom
    .then(() => {
            iziToast.success({
            message: ` Fulfilled promise in ${delay}ms`,
            position: 'topRight'
        });
    }).catch(() => {
        iziToast.error({
        message: ` Rejected promise in ${delay}ms`,
        position: 'topRight',
    });
    })
form.reset();
} else {
    iziToast.warning({
        message: `Please, write correct delay!`
    })
}




}



