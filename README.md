# RazerChroma JS

> Pure JavaScript bindings to Razer Chroma devices using the Razer's RESTful API

This library provides a simple wrapper for the Razer RESTful API to let you get up and running with it as quickly as possible. In order to use it, you can require the Chroma class using:

## Installation

```bash
npm i razerchroma -s
```

Simple :thumbsup:

## Usage

A simple example is included at `example/example.js`. This should start an instance, light up your keyboard in a :rainbow: rad rainbow :rainbow: and then cleanup after 5 seconds.

### Importing the library

```javascript
var Chroma = require('razerchroma');
```

### Initializing a new instance

The `application` object defines the application, it should follow the schema described [in the official documentation](https://assets.razerzone.com/dev_portal/REST/html/md__r_e_s_t_external_01_8init.html)

```javascript
let chroma;
Chroma.initialize(application)
    .then(config =>{
        chroma = new Chroma(config)
    })
```

### Setting state

`set({device,method='PUT',body})`

By default, the set method will send using a PUT command, if you would like to POST and use the response the method will return a promise from the request

The device must be a device on the list from the application configuration.

The body should match the JSON schema described [here](https://assets.razerzone.com/dev_portal/REST/html/md__r_e_s_t_external_03_8keyboard.html), generally following the shape `{effect,param}`
```javascript
// Defaults to a PUT call
chroma.set({
    device: 'keyboard',
    body: some_rad_light_pattern
})

// We can do a POST call and get an effect id
chroma.set({
    device: 'keyboard',
    method:'POST',
    body: some_rad_light_pattern
}).then(response=>console.log(response.id))
```

### Cleanup

Although the connection will timeout by default after 15 seconds, we should clean up whenever we are done with the Chroma connection (when our app closes). 

```javascript
chroma.cleanup()
```

Easy.