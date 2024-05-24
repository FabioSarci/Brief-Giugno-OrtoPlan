const loginForm = document.querySelector('#loginForm');
const loginModal = document.querySelector('#loginModal');
let loginMod;

function openLoginModal() {
    loginMod = undefined;
    loginModal.showModal();
    loginForm.reset();
    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    })
    document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    })
  }


loginForm.addEventListener('submit', async(e) =>{
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    })
    document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    })

    const email = e.target.children[0].value;
    const password = e.target.children[1].value;

    console.log({email, password});

    const res = await fetch('http://localhost:8000/login',{
        body: JSON.stringify({
            email,
            password
        }),
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        }
    });

    if(res.status != 200){
        const el = document.querySelector('#p');
        const message = {errore : "Credenziali errate!"};
        setErr(el, JSON.stringify(message.errore));
        return;
    }

    const data = await res.json();

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', JSON.stringify(data.token));

    window.location.href = '/OrtoPlan/giardino';

});


function setErr(el,message){
        const p = document.createElement('p');
        p.textContent = message;
        p.classList.add('text-red-500','error-message');
        el.parentNode.insertBefore(p,el.nextSibling)
}