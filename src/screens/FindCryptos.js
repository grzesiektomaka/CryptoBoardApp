import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { withNavigation } from 'react-navigation'
import Header from '../components/Header'
import CoinGrid from '../components/CoinGrid'
import CoinDetail from '../components/CoinDetail'
import Loader from '../components/Loader'
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
          detailItem: '',
          tempPrice: null,
          pricesDataset: [],
          investment: []  
        };

        this.timeout =  null;
        this.fetchCoins = this.fetchCoins.bind(this);
        this.updateCurrentList = this.updateCurrentList.bind(this);
        this.fetchPrice = this.fetchPrice.bind(this);
        this.fetchHistorical = this.fetchHistorical.bind(this);
        this.onChangeText = this.onChangeText.bind(this)
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

    async fetchPrice(name){
        try{
            let coinPriceData = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USD`)
            let coinPrice = coinPriceData.data.USD.toFixed(6) 
            this.setState({
                tempPrice: coinPrice
            })
            
        }catch(e){
            console.log(e)
        }
    }

    async fetchHistorical(name){
        try{
            let coinPriceDataset = 
            await axios.get(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${name}&tsym=USD&limit=10`)
            let coinPrices = coinPriceDataset.data.Data.Data
            this.setState({
                pricesDataset: coinPrices
            })
            
        }catch(e){
            console.log(e)
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

    handleInput = _.debounce((text) => {
        this.setState({
            currentCoinList: null
        })

        if(!text){
            this.setFilteredCoins(null)
            this.updateCurrentList()
            return;
        }
        this.handlerFilter(text)
    }, 600)

    onChangeText = (text) =>{
        this.setState({
            inputValue: text
        })

        this.handleInput(text)
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

    openDetail = (itemName) => {
        this.fetchPrice(itemName)
        this.fetchHistorical(itemName)


        this.setState({
            detailItem: itemName
        })

    }

    closeDetail = () =>{
        this.setState({
            detailItem: ''
        })
    }

    addInvestment = (id , name, amount) =>{

        let newInvestment = {
            id: id,
            name: name,
            amount: amount,
            price: this.state.tempPrice,
            value:  (parseFloat(amount) *parseFloat(this.state.tempPrice)).toFixed(2)
        }

    
        this.setState({
          investment: [...this.state.investment, newInvestment]
        })
    }

    updateInvestment = (keyToCoin, amount) =>{
        let newArray = [...this.state.investment]
        let i = newArray.map(function(e) { return e.id; }).indexOf(keyToCoin)
        newArray[i] = {
            ...newArray[i],
            amount: amount,
            price: this.state.tempPrice,
            value: (parseFloat(amount) *parseFloat(this.state.tempPrice)).toFixed(2)
        }

        this.setState({
            investment: newArray
        })
    }

    render(){ 
 
        const {
            currentCoinList, 
            coinsNames, 
            detailItem, 
            investment, 
            pricesDataset} = this.state

 
        return ( 
            <View>
                {detailItem == '' && 
                    <>
                        <Header navigation={this.props.navigation}/>
                        <TextInput
                            style={styles.findCryptoInput}
                            onChangeText={text => this.onChangeText(text)}
                            value={this.state.inputValue}
                            placeholder={'Find cryptocurrency'} 
                        />
                    </>
                }
                {currentCoinList != null ?
                    detailItem == '' ?  
                            <CoinGrid 
                                coinList={currentCoinList} 
                                coinsNames={coinsNames}
                                openDetail={this.openDetail}
                            />
                    : 
                        <CoinDetail 
                            coinDetailItem={currentCoinList[detailItem]}
                            closeDetail={this.closeDetail}
                            investment={investment}
                            addInvestment={this.addInvestment}
                            updateInvestment={this.updateInvestment}
                            historicalPrices={pricesDataset}
                            keyToCoin = {detailItem}
                            currentPrice = {this.state.tempPrice}
                        />
                :
                    <Loader />
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