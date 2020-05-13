import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import Icon from '@expo/vector-icons/Ionicons';

 
const Header = ({navigation}) =>{ 

    return(
        <View style={styles.header}>
            <Icon
                style={{ paddingLeft: 10 }}
                onPress={() => navigation.openDrawer()}
                name="md-menu"
                size={30}
            />
            <Text style={styles.appName}>CRYPTO-BOARD</Text>
        </View>
    ) 
}

const styles = StyleSheet.create({
    header: {
        marginTop: 40,
        flexDirection: 'row',
        marginLeft: 25
    },
    appName: {
        fontSize: 20,
        marginTop: 3,
        marginBottom: 15,
        marginLeft: 50
    }
});

export default Header;
