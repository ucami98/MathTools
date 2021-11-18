const hacerPeticion = (param) => {
    let radio = document.getElementById("r").value;
    let altura = document.getElementById("h").value;
    let radioes = document.getElementById("ra").value;
    let alturacu = document.getElementById("hc").value;
    let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    
    let result = document.getElementById("result");

    if (radio && altura && param=="cilindro") {
        fetch(`http://localhost:8080/cilindro?r=${radio}&h=${altura}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                result.innerHTML = "El area de su cilindro es de "+parseFloat(data.area).toFixed(2)
                myModal.show()
            })
    }else if (radioes && param=="esfera") {
            fetch(`http://localhost:8080/esfera?r=${radioes}`)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    result.innerHTML = "El area de su esfera es de " + parseFloat(data.areaes).toFixed(2)
                    myModal.show()
                })
    }else   if (alturacu && param=="cubo") {
        fetch(`http://localhost:8080/cubo?h=${alturacu}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                result.innerHTML = "El area de su cubo es de " + parseFloat(data.areacu).toFixed(2)
                myModal.show()
            })
        }
}
