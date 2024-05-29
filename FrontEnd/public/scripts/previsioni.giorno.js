const elemento = document.querySelector('#previsionigiorno');
let lat = '41.8919';
let lon = '12.5113';

fetch('https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+'&current=temperature_2m,is_day,precipitation,rain,snowfall,cloud_cover&hourly=temperature_2m,rain,snowfall,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,wind_speed_80m,soil_temperature_6cm,uv_index&timezone=GMT',
    {method: 'GET'}
)
.then((res) =>{
    return res.json();
})
.then((data) =>{
    console.log(data);
})