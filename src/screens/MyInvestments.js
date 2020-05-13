import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Button } from 'react-native'

 
const MyInvestments = ({navigation}) =>{ 
    return(
        <View style={styles.header}>
            <Text style={styles.appName}>CRYPTO-BOARD</Text>
            <Button title="Open drawer" onPress={() => navigation.openDrawer()} />
        </View>
    ) 
}

const styles = StyleSheet.create({
    header: {
        marginTop: 60
    },
    appName: {
        fontSize: 20
    }
});

export default MyInvestments;