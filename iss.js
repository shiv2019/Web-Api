
        /*
            Steps 
            / Initialize the map
            // [50, -0.1] are the latitude and longitude
            // 4 is the zoom
            // mapid is the id of the div where the map will appear
        */

    const mymap = L.map('mapid').setView([0, 0], 5);
            /*
            // Add a tile to the map = a background. Comes from OpenStreetmap
            */
            const attribution = ' &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors';
            const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            const tiles = L.tileLayer(tileUrl,  {attribution});
                    tiles.addTo(mymap)

     // making Marker with custom  Icon
        const myIcon = L.icon({
        iconUrl: 'iss.png',
        iconSize: [50, 35],
        iconAnchor: [25, 16]
    });
    const marker = L.marker([0, 0], {icon: myIcon }).addTo(mymap);

           

    const apiUrl = 'https://api.wheretheiss.at/v1/satellites/25544';

    let firstTime = true;
    async function getISS() {
        const response = await fetch(apiUrl); // response comes in stream
        const data = await response.json(); // converting response into json
        console.log('Latitude '+ data.latitude);
        console.log('Longitude '+ data.longitude);

        const latitude = data.latitude;
        const longitude = data.longitude;

        // L.marker([latitude, longitude]).addTo(mymap);
         marker.setLatLng([latitude,longitude ])
         if(firstTime){
            mymap.setView([latitude, longitude], 3);
            firstTime = false;
         }
       
        document.getElementById('lat').textContent=latitude.toFixed(2);
        document.getElementById('lon').textContent=longitude.toFixed(2);
    }

    getISS();

    // we are using setInterval because it will call getISS function every one seconds.
    // so we can get latitude and longitude updated
    // because as per where the iss api docs --> Currently requests are limited to roughly 1 per second 
    setInterval(getISS, 1000);
  