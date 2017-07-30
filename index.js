const request = require('request-promise');

const app_data = {
    "title": "Razer Chroma SDK RESTful Test Application",
    "description": "This is a REST interface test application",
    "author": {
        "name": "Chroma Developer",
        "contact": "www.razerzone.com"
    },
    "device_supported": [
        "keyboard",
        "mouse",
        "headset",
        "mousepad",
        "keypad",
        "chromalink"],
    "category": "application"
};
const cleanup = uri => {
    console.log('Cleaning up...');
    request({
        uri,
        method:'DELETE'
    });
}

var toBinaryRGB = (r,g,b) => ((r&255)<<16)+((g&255)<<8)+(b&255);

let uri = null;
let body = {
    "effect":"CHROMA_CUSTOM",
    "param":[
        [ 0xCA2420,0,0,0,0,0x0000FF,0,255,255,255,255,255,0,255,255,255,255,255,255,255,255,255 ],
        [ 0xCA2420,65280,65280,65280,0x2024CA,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280,65280 ],
        [ 16711680,65280,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680,16711680 ],
        [ 65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535,65535 ],
        [ 16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960,16776960 ],
        [ 16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935,16711935 ]
    ]
}



request({
    uri:'http://localhost:54235/razer/chromasdk',
    method:'POST',
    json:true,
    body:app_data
}).then(res=>{
    uri = res.uri;
    console.log(uri)
    setInterval(()=>request({
        uri: res.uri + '/keyboard',
        method:'PUT',
        body,
        json:true
    }).then(res=>console.log(res)),5000);
    // process.on('exit',()=>cleanup(res.uri));
    // process.on('SIGINT',()=>cleanup(res.uri))
})