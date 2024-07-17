let socket = io();
if(navigator.geolocation){
    navigator.geolocation.watchPosition((position)=>{
        let{longitude,latitude}=position.coords;
        socket.emit("send-location" ,{longitude,latitude})
    },(error)=>{
        console.log(error)
    },
    {
        enableHighAccuracy:true,
        maximumAge:0,
        timeout:5000
    }
    )
}

let map=L.map("map").setView([0,0],16);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
    attribution:"Gaurav tracking system"
}).addTo(map)
let markers={};
socket.on("recieved-location",function(data){
    let{longitude,latitude,id}=data
    map.setView([longitude,latitude])
    if(markers[id]){
        markers[id].setLatLng(([latitude,longitude]))
    }
    else{
        markers[id]=L.marker([latitude,longitude]).addTo(map)
    }
})

socket.on("user-disconnected",function(id){
    if(markers[id]){
        map.removeLayer(markers[id])
        delete markers[id]
    }
})

