const loginForm = document.querySelector('#loginForm');
const loginModal = document.querySelector('#loginModal');
let loginMod;
const user = JSON.parse(localStorage.getItem('user'));

function openLoginModal() {
    loginMod = undefined;
    if(localStorage.getItem('user')){
        window.location.href = '/OrtoPlan/giardino/'+ user.id;
    }
    else{
        loginModal.showModal();
    loginForm.reset();
    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    })
    document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    })
    }
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

    if(res.status == 422){
        const el = document.querySelector('#p');
        const message = {errore : "Credenziali errate!"};
        setErr(el, JSON.stringify(message.errore));
        return;
    }

    const data = await res.json();

    

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    window.location.href = '/OrtoPlan/giardino/'+ +data.user.id;

});


function setErr(el,message){
        const p = document.createElement('p');
        p.textContent = message;
        p.classList.add('text-red-500','error-message','text-sm','text-sm');
        el.parentNode.insertBefore(p,el.nextSibling)
}

