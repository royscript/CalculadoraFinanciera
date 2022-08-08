import * as React from 'react';
import 'react-native-gesture-handler';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import DepositoPlazoFijo from './src/DepositoPlazoFijo';

function Inicio() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bienvenid@, seleccione una opcion del menú para poder realizar los calculos correspondientes.</Text>
    </View>
  );
}


const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Inicio">
        <Drawer.Screen name="Inicio" component={Inicio} />
        <Drawer.Screen name="Deposito Plazo Fijo" component={DepositoPlazoFijo} initialParams={{ tipo: 'Deposito Plazo Fijo' }}/>
        <Drawer.Screen name="Deposito a Plazo Renovable" component={DepositoPlazoFijo} initialParams={{ tipo: 'Tasa Interes Simple' }}/>
        <Drawer.Screen name="Tasa Interes Simple" component={DepositoPlazoFijo} initialParams={{ tipo: 'Tasa Interes Simple' }}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}