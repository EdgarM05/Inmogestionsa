
function calculateMortgage(event) {

    event.preventDefault();
    let cuota = document.forms["fmortgage"]["fcuota"].value;
    let valorTotal = document.forms["fmortgage"]["fvalortotal"].value;
    let tasaInteres = document.forms["fmortgage"]["ftinteres"].value;
    let plazo = document.forms["fmortgage"]["fplazo"].value;
    const MONTHS_ON_YEAR = 12;

    const mortgage = {
        totalPrestamo: 0,
        totalIntereses: 0,
        cuotaMensual: 0,
        valorTotalInmueble: 0
    }

    mortgage.totalPrestamo = valorTotal - cuota;
    mortgage.totalIntereses = (mortgage.totalPrestamo * tasaInteres) / 100;
    mortgage.cuotaMensual = (mortgage.totalPrestamo + mortgage.totalIntereses) / (plazo * MONTHS_ON_YEAR);
    mortgage.valorTotalInmueble = valorTotal;

    // alert("El total del Prestamo es " + mortgage.totalPrestamo + ", el total de intereses es " + mortgage.totalIntereses + " y la cuota mensual es de " + mortgage.cuotaMensual);

    /*
    if (cuota == "" || valorTotal == "" || tasaInteres == "" || plazo == "") {
        alert('Favor de rellenar todos los campos');
        return false;
    }else{
        alert("La cuota es de " + cuota + " el valor total es de " + valorTotal + " la tasa de interés es de " + tasaInteres + " y el plazo es de " + plazo);
    }
    */

    outputMortgage(mortgage);
}

function outputMortgage(finalMortgage) {
    document.getElementById("omontoprestamo").innerHTML = valueToDollar(finalMortgage.totalPrestamo);
    document.getElementById("ocuota").innerHTML = valueToDollar(finalMortgage.cuotaMensual);
    var totalPrestamoPorcentaje = 0;
    totalPrestamoPorcentaje = finalMortgage.totalPrestamo * 100 / finalMortgage.valorTotalInmueble;
    alert(totalPrestamoPorcentaje);
    if (totalPrestamoPorcentaje > 90) {
        document.getElementById("omontoprestamo").className += " alertaPorcentaje";
    } else {
        document.getElementById("omontoprestamo").className = "form-control";
    }
}

function resetForm() {
    document.forms["fmortgage"].reset();
}

function valueToDollar(value) {
    const dollarformatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
    return dollarformatter.format(value);
}

let x = 5;
let y = 2;
let z = x % y;
document.getElementById('demo').innerHTML = z;