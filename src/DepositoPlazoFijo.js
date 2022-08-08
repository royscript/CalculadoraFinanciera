import { useEffect, useState } from "react";
import { Button, Text,TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import formatoDecimal from "./funciones/formatoDecimal";

import formatoMoneda from "./funciones/formatoMoneda";
import limpiarNumero from "./funciones/limpiarNumero";
import round from "./funciones/round";
import estilosFormulario from "./style/estilosFormulario";
const DepositoPlazoFijo = ({ route })=>{
    const [valorFuturo, setValorFuturo] = useState('');
    const [valorPresente, setValorPresente] = useState('');
    const [interes, setInteres] = useState('');
    const [numeroCuotas, setNumeroCuotas] = useState('');
    const [formulaUtilizada, setFormulaUtilizada] = useState('');
    const [desarrollo, setDesarrollo] = useState('');
    const tipoEjercicio = route.params.tipo;
    const obtenerValorFuturo = ()=>{
        return parseInt(valorPresente * (1 + ((interes/100) * numeroCuotas)));
    }
    
    const obtenerValorPresente = ()=>{
        return parseInt(round( valorFuturo / ( 1 + ((interes/100) * numeroCuotas )),0));
    }
    const obtenerInteres = ()=>{
        return round(((((valorFuturo/valorPresente)-1) / numeroCuotas)*100),2);
    }
    const obtenerNumeroCuotas = ()=>{
        return Math.ceil(((valorFuturo/valorPresente)-1) / (interes/100));
    }
    const calcular = ()=>{
        //Validaciones
        var contadorElementosFaltantes = 0;
        valorFuturo.length===0?contadorElementosFaltantes++:null;
        valorPresente.length===0?contadorElementosFaltantes++:null;
        interes.length===0?contadorElementosFaltantes++:null;
        numeroCuotas.length===0?contadorElementosFaltantes++:null;
        if(contadorElementosFaltantes!==1){
            alert("Debe existir una sola incognita y usted tiene "+contadorElementosFaltantes+" campos en blanco.");
            return false;
        }
        //Limpiar variables
        setFormulaUtilizada('');
        setDesarrollo('');
        if(valorFuturo.length===0){//Obtener Valor Futuro
            setFormulaUtilizada(<>
                                    <Text style={estilosFormulario.negrita}> VF</Text> <Text>= VP * (1 + (i * n)) </Text>
                                </>);
            if(tipoEjercicio==='Tasa Interes Simple'){
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>VF</Text> <Text> = {formatoMoneda(valorPresente)} * (1 + ({formatoDecimal(interes)}% * {numeroCuotas})</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>VF</Text> <Text> = {formatoMoneda(obtenerValorFuturo())}</Text>
                </>);
            }else{
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>VF</Text> <Text> = {formatoMoneda(valorPresente)} * (1 + ({formatoDecimal(interes)}% * {numeroCuotas})</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>VF</Text> <Text> = {formatoMoneda(obtenerValorFuturo())}</Text>
                    <Text>{'\n'}</Text>
                    <Text>Usted podrá generar <Text style={estilosFormulario.negrita}>$ {formatoMoneda(obtenerValorFuturo())}</Text></Text>
                    <Text>{'\n'}</Text>
                    <Text>Se encuentra ganando <Text style={estilosFormulario.negrita}>$ {formatoMoneda(obtenerValorFuturo()-valorPresente)}</Text> en total</Text>
                </>);
            }
            
        }else if(valorPresente.length===0){//Obtener valor presente
            setFormulaUtilizada(<>
            <Text style={estilosFormulario.negrita}> VP</Text> = <Text>VF</Text>/<Text>(1 + (i * n)) </Text>
            </>);
             if(tipoEjercicio==='Tasa Interes Simple'){
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>VP</Text> <Text> = {formatoMoneda(valorFuturo)} / (1 + ({formatoDecimal(interes)}% * {numeroCuotas}))</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>VP</Text> <Text> = {formatoMoneda(obtenerValorPresente())}</Text>
                </>);
             }else{
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>VP</Text> <Text> = {formatoMoneda(valorFuturo)} / (1 + ({formatoDecimal(interes)}% * {numeroCuotas}))</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>VP</Text> <Text> = {formatoMoneda(obtenerValorPresente())}</Text>
                    <Text>{'\n'}</Text>
                    <Text>Debes tener <Text style={estilosFormulario.negrita}>$ {formatoMoneda(obtenerValorPresente())}</Text> para poder generar $ {formatoMoneda(valorFuturo)}.</Text>
                    <Text>{'\n'}</Text>
                    <Text>Se encuentra ganando <Text style={estilosFormulario.negrita}>$ {formatoMoneda(valorFuturo-obtenerValorPresente())}</Text> en total</Text>
                </>);
             }
            
        }else if(interes.length===0){//Obtener el interés
            setFormulaUtilizada(<>
                <Text style={estilosFormulario.negrita}> i</Text> <Text> = (((VF/VP)-1) / n)</Text>
            </>);
            if(tipoEjercicio==='Tasa Interes Simple'){
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>i</Text> <Text> = ((({formatoMoneda(valorFuturo)} / {formatoMoneda(valorPresente)})-1)/{numeroCuotas})</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>i</Text> <Text> = {obtenerInteres()}%</Text>
                </>);
            }else{
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>i</Text> <Text> = ((({formatoMoneda(valorFuturo)} / {formatoMoneda(valorPresente)})-1)/{numeroCuotas})</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>i</Text> <Text> = {obtenerInteres()}%</Text>
                    <Text>{'\n'}</Text>
                    <Text>Con un interés del <Text style={estilosFormulario.negrita}> {obtenerInteres()}% </Text> y un capital inicial de $ {formatoMoneda(valorPresente)} podrá generar $ {formatoMoneda(valorFuturo)}.</Text>
                    <Text>{'\n'}</Text>
                    <Text>Se encuentra ganando <Text style={estilosFormulario.negrita}>$ {formatoMoneda(valorFuturo-valorPresente)}</Text> en total</Text>
                </>);
            }
            
        }else if(numeroCuotas.length===0){
            setFormulaUtilizada(<>
                <Text style={estilosFormulario.negrita}> n</Text> <Text> = (((VF/VP)-1) / i)</Text>
            </>);
            if(tipoEjercicio==='Tasa Interes Simple'){
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>n</Text> <Text> = ((({formatoMoneda(valorFuturo)}/{formatoMoneda(valorPresente)})-1) / {interes})</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>n</Text> <Text> = {obtenerNumeroCuotas()}</Text>
                </>);
            }else{
                setDesarrollo(<>
                    <Text style={estilosFormulario.negrita}>n</Text> <Text> = ((({formatoMoneda(valorFuturo)}/{formatoMoneda(valorPresente)})-1) / {interes})</Text>
                    <Text>{'\n'}</Text>
                    <Text style={estilosFormulario.negrita}>n</Text> <Text> = {obtenerNumeroCuotas()}</Text>
                    <Text>{'\n'}</Text>
                    <Text>Con <Text style={estilosFormulario.negrita}> {obtenerNumeroCuotas()} cuota(s) </Text> y un capital inicial de $ {formatoMoneda(valorPresente)} podrá generar $ {formatoMoneda(valorFuturo)}.</Text>
                    <Text>{'\n'}</Text>
                    <Text>Se encuentra ganando <Text style={estilosFormulario.negrita}>$ {formatoMoneda(valorFuturo-valorPresente)}</Text> en total</Text>
                </>);
            }
            
        }
    }
    return (
       <ScrollView style={estilosFormulario.contenedor}>
        <Text>Complete los campos con numeros y deje en blanco el campo que desee averiguar.</Text>
        <Text style={estilosFormulario.label}>VALOR FUTURO (VF)</Text>
        <TextInput 
            style={estilosFormulario.input}
            keyboardType='numeric'
            onChangeText={(text)=> {
                setValorFuturo(limpiarNumero(text));
            }}
            value={formatoMoneda(valorFuturo)}
            maxLength={10}  //setting limit of input
        />
        <Text style={estilosFormulario.label}>VALOR PRESENTE (VP)</Text>
        <TextInput 
            style={estilosFormulario.input}
            keyboardType='numeric'
            onChangeText={(text)=> {
                setValorPresente(limpiarNumero(text));
            }}
            value={formatoMoneda(valorPresente)}
            maxLength={10}  //setting limit of input
        />
        <Text style={estilosFormulario.label}>INTERES en porcentaje (i)</Text>
        <TextInput 
            style={estilosFormulario.input}
            keyboardType='numeric'
            onChangeText={(text)=> {
                setInteres(text.replace(/\,/g,''));
            }}
            value={interes}
            maxLength={10}  //setting limit of input
        />
        <Text>% (recuerde debe ser anual o mensual al igual que n)</Text>
        <Text style={estilosFormulario.label}>NUMERO CUOTAS (n)</Text>
        <TextInput 
            style={estilosFormulario.input}
            keyboardType='numeric'
            onChangeText={(text)=> {
                setNumeroCuotas(limpiarNumero(text));
            }}
            value={formatoMoneda(numeroCuotas)}
            maxLength={10}  //setting limit of input
        />
        <Text>(recuerde debe ser anual o mensual al igual que el i)</Text>
        <Button title="Calcular" onPress={()=>calcular()}/>
        <Text></Text>
        <Text style={estilosFormulario.contenedorFormula}>{formulaUtilizada}</Text>
        <Text></Text>
        <Text style={estilosFormulario.contenedorDesarrollo}>{desarrollo}</Text>
       </ScrollView>
    )
}
export default DepositoPlazoFijo;