import React from 'react';
// import _ from 'lodash';
// import moment from 'moment';


export const AppContext = React.createContext(); 

  
export class AppProvider extends React.Component {  
    constructor(props){ 
        super(props);
        this.state = {
            investment: [],  
            sumOfCrypto: 0,
            handleGlobalInvestment: this.handleGlobalInvestment
        } 
    }

    sumOfCrypto = () =>{
        let newArray = [...this.state.investment]
        let tempSum = 0
        newArray.map(item => tempSum = (parseFloat(tempSum) + parseFloat(item.price)).toFixed(2))

        this.setState({
            sumOfCrypto: tempSum
        })
    }

    handleGlobalInvestment = (keyToCoin, coinName, value, price) =>{

        let index = -1

        let newArray = [...this.state.investment]
        index = newArray.map(function(e) { return e.id; }).indexOf(keyToCoin)

        console.log(index)

        if(index != -1){ 
            newArray[index] = {
                ...newArray[index],
                amount: value,
                price: price
            }

            console.log(price)
            this.setState({
                investment: newArray
            })

        }else{
            let newInvestment = { 
                id: keyToCoin,
                name: coinName,
                amount: value,
                price: price   
            } 
        
            this.setState({
                investment: [...this.state.investment, newInvestment]
            })
        }

        this.sumOfCrypto()
    }

    render(){
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
};