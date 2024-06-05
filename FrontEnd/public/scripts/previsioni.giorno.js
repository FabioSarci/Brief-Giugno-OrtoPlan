const elemento = document.querySelector('#previsionigiorno');
let immagine = '';
let lat = '41.8919';
let lon = '12.5113';
const cityForm = document.querySelector('#cityForm');

cityForm.addEventListener('submit', (e) =>{
    e.preventDefault();

    document.querySelectorAll('.error-message').forEach(element =>{
        element.remove();
    })
      document.querySelectorAll('.input-error').forEach(element =>{
        element.classList.remove('input-error');
    });

    const nomecitta = e.target[0].value;

    const validation = validate({
        nomecitta
    },
    {
        nomecitta:{
            presence:{allowEmpty: false,
                message: 'Campo Richiesto'
            },
        }
    });
    if(validation){
        checkValidation(validation);
        return;
    };

    fetch('http://localhost:8000/city',{
        method: 'POST',
        body:JSON.stringify({
            nomecitta
        }),
        headers:{
            'Content-Type':'application/json',
        },
    })
    .then((res) =>{
        return res.json();
    })
    .then((data) =>{
        if(data.isError){
            checkValidation(data.error);
            return
        };
        lat = JSON.stringify(data.lat);
        lon = JSON.stringify(data.lon);
        meteo(lat,lon);
    });

});

meteo(lat,lon)

function meteo(lat,lon){

    let previsionigiornaliere = [];
    let orario = {};
    let indice = 0;

    const eliminadiv = document.querySelector('.splide__slide');
    document.querySelectorAll('.splide__slide').forEach(element =>{
        element.remove();
    });

    fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,is_day,precipitation,rain,snowfall,cloud_cover&hourly=temperature_2m,rain,snowfall,weather_code,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_80m,soil_temperature_6cm,uv_index&timezone=GMT',
    {method: 'GET'}
)
.then((res) => {
    return res.json();
})
.then((data) => {
    data.hourly.time.forEach(element => {
        orario = {
            ora: element,
            codice: data.hourly.weather_code[indice],
            gradi: data.hourly.temperature_2m[indice],
            uv: data.hourly.uv_index[indice],
            wind: data.hourly.wind_speed_80m[indice]
        };
        previsionigiornaliere.push(orario);
        indice += 1;
    });


    // Ottieni la data di oggi nel formato YYYY-MM-DD
    let today = moment().format('YYYY-MM-DD');

    previsionigiornaliere.forEach(element => {
        // Controlla se la data è uguale a oggi
        if (moment(element.ora).isSame(today, 'day')) {
            if(element.codice == 0){
                element.codice = 'Cielo sereno';
                immagine = 'Sole.svg';
            }else if(element.codice >= 1 && element.codice <=3){
                element.codice = 'Parzialmente Nuvoloso';
                immagine = 'Parzialmente-Nuvoloso.svg';
            }else if(element.codice >= 45 && element.codice <=48){
                element.codice = 'Nebbia e deposito di brina';
                immagine = 'Nebbia.svg';
            }else if(element.codice >= 51 && element.codice <=57){
                element.codice = 'Pioggia Leggera';
                immagine = 'Pioggia-Leggera.svg';
            }else if(element.codice >= 61 && element.codice <=67){
                element.codice = 'Pioggia';
                immagine = 'Pioggia-Leggera.svg';
            }else if(element.codice >= 71 && element.codice <=75){
                element.codice = 'Lieve Nevicata';
                immagine = 'Neve.svg';
            }else if(element.codice ==77){
                element.codice = 'Nevicata';
                immagine = 'Nevicata.svg';
            }else if(element.codice >= 80 && element.codice <=82){
                element.codice = 'Pioggia Moderata';
                immagine = 'Pioggia-Forte.svg';
            }else if(element.codice >= 85 && element.codice <=86){
                element.codice = 'Nevicata Modetara';
                immagine = 'Nevicata.svg';
            }else if(element.codice == 95 ){
                element.codice = 'Temporale';
                immagine = 'Temporale.svg';
            }else if(element.codice >= 96 && element.codice <=99){
                element.codice = 'Temporale Con Grandinate';
                immagine = 'Temporale-con-Pioggia.svg';
            }
            // Crea un nuovo div
            let newDiv = document.createElement('div');
            // Aggiungi le classi al div
            newDiv.className = 'splide__slide border-2 border-accent rounded-xl justify-center lg:max-w-72 max-w-80 p-2';
            // Aggiungi contenuto al div (opzionale)
            newDiv.innerHTML = `
                    <div class='flex lg:flex-col w-full gap-1 lg:gap-0'>
                        <div class='flex justify-between items-center lg:border-b lg:border-b-accent lg:pb-2 gap-1'>
                            <p class='lg:text-xl'>${moment(element.ora).format('LT')}</p>
                            <img src="/assets/meteo/${immagine}" alt="">
                        </div>
                        <div class='flex items-center'>
                            <p class='mt-1 lg:text-start text-sm'>${element.codice}</p>
                        </div>
                        <div class='flex justify-between items-center'>
                            <p class=' text-2xl'>${element.gradi}°C</p>
                            <p>Vento: ${element.wind} km/h</p>
                        </div>
                    </div>
            `;
            const orattuale = JSON.parse(moment().format('H'));
            elemento.appendChild(newDiv);
            new Splide( '#splide',
        {
            type: 'slide',
            rewind: true,
            rewindByDrag: true,
            gap: '1rem',
            start: orattuale,
            perMove: 1,
            focus:'center',
            pagination: false
        }
     ).mount();
        }
    });
});
};

    new Splide( '#splide2' ).mount();
    new Splide( '#splide3' ).mount();


function checkValidation(validation) {
    Object.keys(validation).forEach((key) => {
        const el = document.querySelector(`input[name=${key}]`);
        setErr(el, validation[key]);
    });
    };
    
    function setErr(el,messages){
    el.classList.add('input-error');
    messages.reverse().forEach(message =>{
        const p = document.createElement('p');
        p.textContent = message;
        p.classList.add('text-red-500','error-message');
        el.parentNode.insertBefore(p,el.nextSibling);
    });
    };