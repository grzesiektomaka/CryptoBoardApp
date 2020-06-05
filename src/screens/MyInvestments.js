import React from 'react'
import { StyleSheet, View, TouchableOpacity, FlatList, Text } from 'react-native'
import { AppContext } from '../AppProvider'

import Header from '../components/Header'
// import Loader from '../components/Loader'

 
const MyInvestments = ({navigation}) =>{ 
    return(
        <AppContext.Consumer> 
            {context => (
                <View style={styles.myInvestmentScreenWrapper}>
                    <Header navigation={navigation}/>
                    <Text style={styles.yourCryptoTxtStyle}>Your cryptocurrency</Text>
                    <Text style={styles.sumOfCrypto}>{context.sumOfCrypto} $</Text>
                    <FlatList
                        data={context.investment}
                        renderItem={({ item }) => (
                                <View style={styles.itemWrapper}>
                                    <Text style={styles.itemName}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.itemPrice}>
                                    {item.price} $ 
                                    </Text>
                                </View>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            )}
        </AppContext.Consumer>
    ) 
}

const styles = StyleSheet.create({
    myInvestmentScreenWrapper: {
        flex: 1,
    },
    yourCryptoTxtStyle: {
        alignSelf: 'center',
        fontSize: 20,
        marginTop: 25
    },
    sumOfCrypto: {
        alignSelf: 'center',
        fontSize: 30,
        marginTop: 10,
        marginBottom: 30
    },
    itemWrapper: {
        margin: 10,
        alignItems: 'center',
        borderRadius: 30,
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
    itemName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10
    },
    itemPrice: {
        fontSize: 25,
        marginVertical: 10,
        color: '#000000'
    }
});

export default MyInvestments;