import React, { useState, useEffect} from 'react'
import {StyleSheet, View, TextInput, Text} from 'react-native' 
import _ from 'lodash'

import CoinDetailHeader from './CoinDetailHeader'
import Chart from './Chart'
import { AppContext } from '../AppProvider'

const CoinDetail = ({
    coinDetailItem, 
    closeDetail, 
    investment, 
    addInvestment, 
    updateInvestment,
    historicalPrices, 
    keyToCoin,
    currentPrice}) =>{
    
    const [coinAmount, setCoinAmount] = React.useState('');
    const [coinPrice, setPrice] = React.useState(0);
    const [investmentExist, setInvestmentExist] = React.useState(false);

    const checkInvestment = () =>{
        let coinValue = investment.find(item => item.id == keyToCoin)

        if(coinValue != undefined){
            if(investmentExist != true){
                setCoinAmount(`${coinValue.amount}`) 
                setInvestmentExist(true)
            }

            coinValue.amount != '' ? 
                setPrice(coinValue.value) :
                setPrice(0)
        }
    }

    useEffect(() => {
        if(investment != [] )
            checkInvestment()
    })


    const handleInput = (text) => {

        setCoinAmount(text)    

        if(investmentExist){
            updateInvestment(keyToCoin, text)
        }else{
            addInvestment(keyToCoin, coinDetailItem.CoinName, text)
        }
    }

    return(
        <AppContext.Consumer>
            {context => (
                <View style={styles.detailWrapper} >
                    <CoinDetailHeader 
                        coinName={coinDetailItem.CoinName} 
                        coinImgSrc={coinDetailItem.ImageUrl}
                        closeDetail={closeDetail}
                    />
                    <Text style={styles.yourCryptoTxt}>YOUR CRYPTOCURRENCY</Text>
                    <View style={styles.cryptoInput}>
                        <TextInput 
                            onChangeText={text => {
                                handleInput(text)
                                let price = (parseFloat(text) *parseFloat(currentPrice)).toFixed(2)
                                context.handleGlobalInvestment(keyToCoin, coinDetailItem.CoinName, text, price)
                            }}
                            value={coinAmount}
                            keyboardType={'numeric'}
                            style={styles.coinAmountInputStyle}
                        />
                    </View>
                    <Text style={styles.coinPriceStyle}>
                        $ {coinPrice}
                    </Text>
                    <Text style={styles.daysOption}>1D</Text>
                    
                    {historicalPrices[0] != undefined &&
                        <Chart prices={historicalPrices}/>
                    }
                </View>
            )}
        </AppContext.Consumer>
        
    )
}

const styles = StyleSheet.create({
    detailWrapper: {
        alignItems: 'center'
    },
    cryptoInput: {
        borderWidth: 1,
        borderRadius: 20,
        padding: 10,
        width: 200, 
        marginTop: 20
    },
    yourCryptoTxt: {
        fontSize: 20, 
        textAlign: 'center', 
        marginTop: 30
    },
    coinAmountInputStyle: {
        fontSize: 30,
        textAlign: 'center'
    },
    coinPriceStyle: {
        fontSize: 40,
        marginTop: 20,
        marginBottom: 70
    },
    daysOption: {
        color: "#21CE99",
        fontWeight: 'bold',
        marginBottom: 10
    }
})

export default CoinDetail 