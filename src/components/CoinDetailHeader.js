import React from 'react'
import {StyleSheet, Image, View, Text} from 'react-native'

import returnBtn from '../../assets/returnBtn.png'
import { TouchableOpacity } from 'react-native-gesture-handler'


const CoinDetailHeader = ({coinName, coinImgSrc, closeDetail}) =>{

    return(
        <View style={styles.coinDetailHeaderWrapper}>  
            <TouchableOpacity onPress={closeDetail}>
                <Image source={returnBtn}/> 
            </TouchableOpacity>
            <Text style={styles.coinNameStyle}>{coinName}</Text>
            <Image
                    style={styles.coinDetailImage}
                    source={{
                    uri: `http://cryptocompare.com/${coinImgSrc}`,
                    }}
                />
        </View>
    )
}

const styles = StyleSheet.create({
    coinDetailHeaderWrapper: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%'
    }, 
    coinDetailImage: {
        width: 50,
        height: 50
    },
    coinNameStyle: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default CoinDetailHeader