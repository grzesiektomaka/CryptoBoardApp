import React from 'react'
import {StyleSheet, FlatList, View} from 'react-native'
import CoinImage from './CoinImage'

// function 

const CoinGrid = ({coinList, coinsNames}) =>{

    return(
        <View style={styles.coinsGrid}>
            <FlatList
                numColumns={2}
                keyExtractor={(item) => coinList[item].Id}
                initialNumToRender={20}
                data={coinsNames}
                windowSize={10}
                maxToRenderPerBatch={2}
                renderItem={({ item }) => (
                    <CoinImage coin={coinList[item]}/>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    coinsGrid: {
        alignItems: 'center',
        // width: '100%'
    }
});

export default CoinGrid 