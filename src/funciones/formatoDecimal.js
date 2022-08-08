const formatoDecimal = (numero)=>{
    if(numero!="" && !(typeof numero === 'undefined')){
        return parseFloat(numero).toFixed(2);
    }
    return numero;
}
export default formatoDecimal;