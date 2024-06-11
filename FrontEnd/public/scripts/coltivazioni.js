

const user = JSON.parse(localStorage.getItem('user'));

//Lista delle Coltivazioni
const tabella = document.querySelector('#tabella');

fetch('http://localhost:8000/piantagioni/'+ user.id,{
    method:"GET",
    headers: {
        "Content-Type": "application/json",
        authorization: 'Bearer ' + localStorage.getItem('token')
    },
})
.then((res) =>{
    if (res.status == 401){
        localStorage.clear();
        window.location.href = '/OrtoPlan';
        throw new Error();
    }
    return res.json();
})
.then((data) =>{
    if (data.length == 0){
        tabella.classList.replace('lg:grid-cols-3','lg:grid-cols-1');
        tabella.classList.replace('grid-cols-3','grid-cols-1');
        let newdiv = document.createElement('div');
        newdiv.id = 'noElement';
        newdiv.className = 'w-full text-xl text-center text-gray-500';
        newdiv.innerHTML = ` Non ci sono Coltivazioni a tuo nome. `;
        tabella.appendChild(newdiv);
    }else{
        tabella.classList.replace('lg:grid-cols-1','lg:grid-cols-3');
        tabella.classList.replace('grid-cols-1','grid-cols-3');
        data.forEach(element =>{
            creaElemento(element);
        });
    };
})

function creaElemento(element){

    let plantDiv = document.createElement('div');
        plantDiv.className = '';
        plantDiv.innerHTML = `
        <a href='/OrtoPlan/giardino/coltivazioni/piantagione/${user.id}/${element.id}'>
            <div class='flex flex-col justify-between items-center border border-accent rounded-xl p-4 h-full bg-white shadow-2xl'>
                <h1 class='border-b border-b-accent pb-2 w-full text-center font-bold text-accent text-xl'>
                    ${element.nome}
                </h1>
                <h2 class='text-center w-full'>
                    Iniziata il <br class='lg:hidden'>
                    ${moment(element.datacreazione).format('DD/MM/YYYY')}
                </h2>
                <p>
                    Luogo: ${element.comuni.denominazione}
                </p>
                <p>
                    ${element.pianta.nome}
                </p>
            </div>
        </a>
        `;
        tabella.appendChild(plantDiv);
}

//lista delle citta e i cap
const cityInput = document.querySelector('#cityList');

fetch('http://localhost:8000/city',{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    },
})
.then((res) =>{
    return res.json();
})
.then((data) =>{
    data.forEach(city =>{
            const cityoption = document.createElement('option');
            cityoption.value = city.cap;
            cityoption.text =city.cap+' - '+city.denominazione;
            cityInput.appendChild(cityoption);
        });
});

//lista piante
const plantInput = document.querySelector('#plantList');
fetch('http://localhost:8000/plant',{
    method: 'GET',
    headers: {
        "Content-Type": "application/json",
    },
})
.then((res) => {
    return res.json();
})
.then((data) =>{
    data.forEach(plant =>{
        const plantoption = document.createElement('option');
        plantoption.value = plant.id;
        plantoption.text =plant.nome;
        plantInput.appendChild(plantoption);
    });
});


//creazione delle piantagioni

function openCreateModal() {
    createModal.showModal();
    createForm.reset();
};

const createForm = document.querySelector('#createForm');
const createModal = document.querySelector('#createModal');

createForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    });
      document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    });

    const nome = e.target[0].value;
    const descrizione = e.target[1].value;
    const datacreazione = moment().format();
    const cap = e.target[2].value;
    const idutente = user.id;
    const idpianta = +e.target[3].value;


    const validation = validate({
        nome,
        descrizione,
        cap
    },
    {
        nome:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
        },
        descrizione:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
        },
        cap:{
            presence: {
                allowEmpty:false,
                message: 'Campo Richiesto'
            },
        },
    },
    );
    if(validation){
        checkValidation(validation);
        return;
    };

    fetch('http://localhost:8000/piantagioni',{
        method:'POST',
        body: JSON.stringify({
            nome,
            descrizione,
            datacreazione,
            cap,
            idutente,
            idpianta,
        }),
        headers: {
            "Content-Type": "application/json",
            authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then((res) =>{
        if (res.status == 401){
            localStorage.clear();
            window.location.href = '/OrtoPlan';
            throw new Error();
        }
        return res.json();
    })
    .then((data) =>{
        if (data.isError){
          checkValidation(data.error);
          return
        }
        createModal.close();
        console.log(data);
            data.forEach(piantagione =>{
                document.querySelector('#noElement').remove();
                tabella.classList.replace('lg:grid-cols-1','lg:grid-cols-3');
                tabella.classList.replace('grid-cols-1','grid-cols-3');
                creaElemento(piantagione);
                
            });
    });

});


function checkValidation(validation) {
    Object.keys(validation).forEach((key) => {
      const el = document.querySelector(`input[name=${key}]`);
      setErr(el, validation[key]);
    });
  }
  
function setErr(el,messages){
el.classList.add('input-error');
messages.reverse().forEach(message =>{
    const p = document.createElement('p');
    p.textContent = message;
    p.classList.add('text-red-500','error-message','text-sm');
    el.parentNode.insertBefore(p,el.nextSibling);
})
}

function alertSuccess(){
document.querySelectorAll('#success').forEach(element =>{
    element.classList.remove('hidden');
});

return new Promise((resolve) =>{
    setTimeout(() =>{
    resolve(document.querySelectorAll('#success').forEach(element =>{
        element.classList.add('hidden');
    }))
    },10000);
});
};