import React from 'react';
// import _ from 'lodash';
// import moment from 'moment';


export const AppContext = React.createContext(); 

  
export class AppProvider extends React.Component {  
    constructor(props){ 
        super(props);
        this.state = {
            investment: [],  
            addInvestment: this.addInvestment
        } 
    }

    addInvestment = (text) =>{
        let newInvestment = { 
            id: id,
            name: name,
            amount: amount  
        }
    
        this.setState({
          investment: [...this.state.investment, newInvestment]
        })
    
        console.log(text)
    }

    render(){
        return(
            <AppContext.Provider value={this.state}>
                {this.props.children}
            </AppContext.Provider>
        )
    }
};