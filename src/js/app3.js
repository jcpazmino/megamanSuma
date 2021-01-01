var c = document.getElementById("my_canvas");
var ctx = c.getContext("2d");
//******* declaración de variables */
    var path_imgs = "./src/imagenes/megaman/";
    var disparo = {   
        imagen: new Image(),  
        posIniX : 160, posIniY : 200, 
        ancho : 105, alto : 72,
        tamDisparo : 10,
        disparar : true
    };
    var styleNumeros = {//estilo para los números
        fillStyle: 'red',
        font: 'italic bold 50px Arial, sans-serif',
    };
    var numero = {
        valor: 0, posIniX: 650, posIniY: 90,
        max: 10, min: 0
    };
    var suma = {
        numero1: 0, numero2: 0, 
        resultado: 0, 
        cadena: "",
        posIniX: 200, posIniY: 90
    }
//********************************* */

var backgroundImage = new Image();
var cW = ctx.canvas.width; // ancho
var cH = ctx.canvas.height;// alto
var interval;

backgroundImage.src = path_imgs + "fondo.jpg";
disparo.imagen.src = path_imgs + "disparo.png";

//*** primero se carga la imagen y luego se dibuja */
backgroundImage.addEventListener('load', iniciaJuego, false);

function iniciaJuego() {
    ctx.drawImage(backgroundImage, 0, 0);   
    numero.valor=generaNumero();
    generaSuma();
    clearInterval(interval);
    interval = setInterval(function(){ render(); }, 10);
}

function render() { 
    ctx.drawImage(backgroundImage, 0, 0);   
    ctx.fillStyle =  styleNumeros.fillStyle;
    ctx.font = styleNumeros.font;
    ctx.fillText(suma.cadena, 200, 90);
    if(!disparo.disparar){//movimiento del disparo
        ctx.drawImage(disparo.imagen, disparo.posIniX, disparo.posIniY);
        disparo.posIniX += 10;
        if (disparo.posIniX > cW) {//verifica si el disparo salio del escenario, para permitir otro tiro
            disparo.posIniX = 160;
            disparo.disparar = true;
        }
        //verifica si hay colición con el numero
        if(disparo.posIniX + disparo.ancho >= numero.posIniX && disparo.posIniY + disparo.alto <= numero.posIniY ){
            clearInterval(interval);
            suma.cadena+="     "+numero.valor;       
            ctx.fillStyle =  styleNumeros.fillStyle;
            if(numero.valor == suma.resultado){suma.cadena+= "  Logrado!!!"; ctx.fillStyle = "green"}
            else suma.cadena+= "  errado!!!";
            ctx.font = styleNumeros.font;
            ctx.fillText(suma.cadena, suma.posIniX, suma.posIniY);
           

        }
    }//fin movimiento del disparo
    if(numero.posIniY<300){//movimiento del número
        numero.posIniY+=2;
        MuestraNumeros();
    }else{//si el número salio del escenario, genera uno nuevo
        numero.valor=generaNumero();
        numero.posIniY=90;
    }//fin movimiento del número
}

function MuestraNumeros(){
    ctx.fillStyle =  styleNumeros.fillStyle;
    ctx.font = styleNumeros.font;
    ctx.fillText(numero.valor, numero.posIniX, numero.posIniY); 
}

function generaSuma(){
    suma.numero1=generaNumero();
    suma.numero2=generaNumero();
    suma.resultado=suma.numero1+suma.numero2;
    suma.cadena=suma.numero1+" + "+suma.numero2+" = ?";
    if(suma.resultado>numero.max) numero.max=suma.resultado;
}
function generaNumero(){//genera un número aleatorio en el rango (min,max)
    return Math.ceil(Math.random() * (numero.max - numero.min)) + numero.min;
}

document.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }
    switch (event.code) {
        case "ArrowRight":
            if (disparo.disparar) {
                disparo.disparar = false;
            }
        break;
    }
})