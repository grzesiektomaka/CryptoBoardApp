
import React, { Component } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native';
import { AppProvider } from './src/AppProvider'
import FindCryptos from './src/screens/FindCryptos';
import MyInvestments from './src/screens/MyInvestments';


const Drawer = createDrawerNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(255, 255, 255)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',  
    border: 'rgb(199, 199, 204)',
  },
};
 
class App extends Component{

  render() {

    return (
      <AppProvider>
        <NavigationContainer theme={MyTheme}> 
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen 
              name="Find Cryptos" 
              component={FindCryptos}
            />
            <Drawer.Screen 
              name="My investments"  
              component={MyInvestments} 
            />
          </Drawer.Navigator>
        </NavigationContainer>
      </AppProvider>
    );
  }
}

export default App
