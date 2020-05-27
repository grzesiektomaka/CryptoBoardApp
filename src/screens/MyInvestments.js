import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Button } from 'react-native'

// import Loader from '../components/Loader'

 
const MyInvestments = ({navigation}) =>{ 
    return(
        <View style={styles.header}>
            {/* <Loader  /> */}
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