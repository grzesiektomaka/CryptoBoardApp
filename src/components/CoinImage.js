import React from 'react'
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native'

 
const CoinImage = ({coin}) =>{ 

    return(
        <View style={styles.imgWrapper}>
                <Image
                    style={styles.coinImage}
                    source={{
                    uri: `http://cryptocompare.com/${coin.ImageUrl}`,
                    }}
                />
        </View>
    )
    
}

const styles = StyleSheet.create({
    imgWrapper: {
        alignItems: 'center',
        borderRadius: 30,
        padding: 26,
        borderColor: 'gray', 
        // borderWidth: 1,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#FFFFFF'
        
    },
    coinImage: {
        height: 100,
        width: 100
    }
});

export default CoinImage;
