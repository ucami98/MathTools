const http = require("http")
const registros = require("./helpers/files")
//const {readFile, writeFile, appendFile} = require("fs") //si quiero toda la libreria lo dejo como const fs=require("fs"), comosolo quiero unos campos lo pongo como esta
const areas = require("./helpers/areas")
const colors = require("colors")


const port = 8080
const ip = "localhost" //localhost = 127.0.0.1; dispositivos conectados a la misma red wifi, necesitamos ver la ip de nuestro en la LAN inalambrica (192.168.1.184)

http.createServer(function (request, response) {
    const incomingUrl = new URL(request.url, `http://${request.headers.host}`)
    response.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': "*" })

    switch (incomingUrl.pathname) {
        
        case '/cilindro':
            const r = (incomingUrl.searchParams.get('r'))
            const h = (incomingUrl.searchParams.get('h'))
            let area = areas.calcularAreaCilindro(r, h)
            if (area) {
                    let registrosJSON = JSON.parse(registros.leerRegistro("registroCilindro"))
                    console.log(registrosJSON)
                    registrosJSON.push({ area, "date": new Date() })
                    registros.guardarRegistro(JSON.stringify(registrosJSON), "registroCilindro")
                    response.write(JSON.stringify({ area }))
                } else {
                    response.write("error")
                }
            break;
        case '/esfera':
            const ra = (incomingUrl.searchParams.get('r'))
            let areaes =areas.calcularAreaEsfera(ra)
            if (areaes) {
                let registrosJSON = JSON.parse(registros.leerRegistro("registroEsfera"))
                console.log(registrosJSON)
                registrosJSON.push({ areaes, "date": new Date() })
                registros.guardarRegistro(JSON.stringify(registrosJSON), "registroEsfera")
                response.write(JSON.stringify({ areaes }))
            } else {
                response.write("error")
            }
        break;
        case '/cubo':
            const hc = (incomingUrl.searchParams.get('h'))
            let areacu =areas.calcularAreaCubo(hc)
            if (areacu) {
                let registrosJSON = JSON.parse(registros.leerRegistro("registroCubo"))
                console.log(registrosJSON)
                registrosJSON.push({ areacu, "date": new Date() })
                registros.guardarRegistro(JSON.stringify(registrosJSON), "registroCubo")
                response.write(JSON.stringify({ areacu }))
            } else {
                response.write("error")
            }
        break;

        //ejemplo de fileSystem para traer archivos desde otra ubicación    
        case '/fileSystem':

            appendFile("./files/test.txt", "!!!!Esto va despues del text añadido -- " +new Date() + "\n",(err)=>{
                if(err) throw err
                console.log("Se añadió al archivo")
            })

            /*writeFile("./files/test.txt", "text añadido",(err)=>{
                if(err) throw err
                console.log("Se guardó el archivo correctamente!")
            })
            readFile("./files/test.txt","utf-8",(err, data)=>{
                if(err) throw err
                console.log(data)
            });*/
            
        default:
            response.write("Esa ruta no existe")
            
    }

    response.end();
}).listen(port, ip, () => {
    console.log(`Se inicio el server en la direccion -> http://${ip}:${port}`)
 
})

