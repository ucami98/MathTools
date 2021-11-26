const fs= require("fs")

let guardarRegistro =(registro)=>{
fs.writeFile('./files/registro.json',registro,(err)=>{
    if(err) throw err;
    console.log('The "data to append" was appendedto file');
})
}

let leerRegistro =()=>{
    return fs.readFileSync('./files/registro.json')
fs.readFile('./files/registro.json',(err,data)=>{
    console.log(data)
    return data
})
}

module.exports = {
   guardarRegistro,
   leerRegistro
}

