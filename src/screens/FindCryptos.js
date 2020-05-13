import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import CoinGrid from '../components/CoinGrid'
import _ from 'lodash'
import fuzzy from 'fuzzy'
import axios from 'axios'

const CRYPTOCOMPARE_API_URI = 'https://www.cryptocompare.com/api/data/coinlist/';

class FindCryptos extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          inputValue: '',
          filteredCoins: null,
          cryptoCompareOk: false,
          coinList: [],
          currentCoinList: null,
          coinsNames: null,
        };

        this.fetchCoins = this.fetchCoins.bind(this);
        this.updateCurrentList = this.updateCurrentList.bind(this);
    }

    async componentDidMount() {

        await this.fetchCoins();
        // setInterval(this.fetchCoins, 4000);

    }

    async fetchCoins() {
        try {
            const coinList = await axios.get(CRYPTOCOMPARE_API_URI);
            this.setState({
            coinList: coinList.data.Data,
            currentCoinList: coinList.data.Data,
            coinsNames: Object.keys(coinList.data.Data), 
            cryptoCompareOk: true,
            });
          } catch (e) {
            console.log(e);
          }
    }

    handlerFilter = _.debounce((inputValue) => {
        let coins = this.state.coinList
        let coinSymbols = Object.keys(coins);
        let coinNames = coinSymbols.map(sym => coins[sym].CoinName);
        let allStringsToSearch = coinSymbols.concat(coinNames);
        let fuzzyResults = fuzzy
            .filter(inputValue, allStringsToSearch, {})
            .map(result => result.string)
    
        let filteredCoins = _.pickBy(coins, (result, symKey) => {
            let coinName = result.CoinName;
            return (_.includes(fuzzyResults, symKey) || _.includes(fuzzyResults, coinName));
        });
    
        this.setFilteredCoins(filteredCoins)
    
    }, 500);

    setFilteredCoins = (filteredCoins) => {
        this.setState({
            filteredCoins: filteredCoins
        })
        this.updateCurrentList()
    }

    onChangeText = (text) =>{
        this.setState({
            inputValue: text,
            currentCoinList: null
        })
        if(!text){
            this.setFilteredCoins(null)
            this.updateCurrentList()
            return;
        }
        this.handlerFilter(text)

    }

    updateCurrentList = () =>{
        if(this.state.filteredCoins != null){
            this.setState({
                currentCoinList: this.state.filteredCoins,
                coinsNames: Object.keys(this.state.filteredCoins) 
            })
        }else{
            this.setState({
                currentCoinList: this.state.coinList,
                coinsNames: Object.keys(this.state.coinList) 
            })
        }
    }

    render(){ 

        const {currentCoinList, coinsNames} = this.state

        return ( 
            <View>
                <Header navigation={this.props.navigation}/>
                <TextInput
                    style={styles.findCryptoInput}
                    onChangeText={text => this.onChangeText(text)}
                    value={this.state.inputValue}
                    placeholder={'Find cryptocurrency'} 
                />
                {currentCoinList != null ?
                    <CoinGrid coinList={currentCoinList} coinsNames={coinsNames}/>
                    :
                    <Text>Loading...</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    findCryptoInput: {
        height: 50, 
        marginHorizontal: 35,
        marginTop: 25,
        borderRadius: 20,
        paddingHorizontal: 20,
        backgroundColor: '#FFFFFF',
        marginBottom: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
});

export default withNavigation(FindCryptos)