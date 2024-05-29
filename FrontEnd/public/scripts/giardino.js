console.log('user id:', userId);
const userr = JSON.parse(localStorage.getItem('user'));

fetch('http://localhost:8000/check/'+userId)
.then(res => res.json())
.then(user =>{
    console.log(user);
    const span = document.querySelector('#user')
    span.textContent = user.firstName +" "+ user.lastName;
    span.classList.remove('loading','loading-spinner','loading-sm');
});

function logout(){
    localStorage.clear();
    window.location.href = '/OrtoPlan';
}

function coltivazioni(){
    window.location.href = '/OrtoPlan/giardino/coltivazioni/' + userr.id;
}

function attivita(){
    window.location.href = '/OrtoPlan/giardino/attivita/' + userr.id; 
}

function previsioni(){
    window.location.href = '/OrtoPlan/giardino/previsioni/' + +userId; 
}