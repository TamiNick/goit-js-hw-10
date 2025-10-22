import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
form.addEventListener("submit", submited)

function submited (event) {
event.preventDefault();

const state = form.state.value;
const delay = form.delay.value;


const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (state === "fulfilled") {
            resolve("ok");
        }else{
            reject("neok");
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
        position: 'topRight'
    });
    })
form.reset();
}



