const formatoMoneda = (numero)=>{
    if(numero!="" && !(typeof numero === 'undefined')){
        var num = numero.toString().replace(/\./g,'');
        if(!isNaN(num)){
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/,'');
        numero = num;
        }
        
        else{ console.log('Solo se permiten numeros');
        numero = numero.replace(/[^\d\.]*/g,'');
        }
        return numero;
    }else{
        return numero;
    }
}
export default formatoMoneda;