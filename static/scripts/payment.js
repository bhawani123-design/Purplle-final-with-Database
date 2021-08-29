let checkEmpty1 = document.getElementById('checkEmpty1')
let checkEmpty2 = document.getElementById('checkEmpty2')
let checkEmpty3 = document.getElementById('checkEmpty3')
let checkEmpty4 = document.getElementById('checkEmpty4')

let gotoThanks = document.getElementById("uniqueH3");
let gotoThanks2 = document.getElementById("uniqueH32");


let load = document.getElementById('loader1');
gotoThanks.addEventListener("click", goToThanks);
gotoThanks2.addEventListener("click", goToThanks);

function goToThanks() {
        load.setAttribute('id', 'loader');
        setTimeout(function () {
            load.removeAttribute('id', 'loader');
            alert('Product purchased successfully')
            window.location.href = "/thankyou"
        }, 5000);

}
