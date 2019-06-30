document.addEventListener('DOMContentLoaded', function () {


    let btnModal1 = document.querySelector('.open');
    btnModal1.addEventListener('click', () => {
        let modal1 = document.querySelector('.modal');
        modal1.classList.add('opened');
        document.body.classList.add('dimm');
    });

    let btnModal1Close = document.querySelector('.closeModal1');
    btnModal1Close.addEventListener('click', () => {
        let modal1 = document.querySelector('.modal');
        modal1.classList.remove('opened');
        document.body.classList.remove('dimm');
    });

















}, false);