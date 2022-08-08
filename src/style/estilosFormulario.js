import { StyleSheet } from "react-native"
const estilosFormulario = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    label : {
      fontWeight : "bold"
    },
    contenedor : {
      margin : 10
    },
    //Formulario
    contenedorFormula : {
      backgroundColor : 'white',
      height : 40,
      alignSelf : 'center',//Achica el cuadro al tamaño del texto
      textAlignVertical : 'center',
      textAlign : 'center'
    },
    contenedorDesarrollo : {
      textAlign : 'center'
    },
    negrita : {
      fontWeight : 'bold'
    },
    rojo : {
      color : 'red'
    },
    supScripting : {
      fontSize: 5,
      lineHeight : 18
    },
    subScripting : {
      lineHeight: 37
    }
});
export default estilosFormulario;