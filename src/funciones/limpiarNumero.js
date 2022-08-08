const limpiarNumero=(numero)=>{
    if(numero!="" && !(typeof numero === 'undefined')){
        return numero.replace(/\./g,'');
    }else{
        return numero;
    }
}
export default limpiarNumero;