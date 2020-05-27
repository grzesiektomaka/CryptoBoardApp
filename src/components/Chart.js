import React, { useState, useEffect} from 'react'
import {StyleSheet, View, TextInput, Text, Dimensions} from 'react-native'

import { LineChart } from "react-native-chart-kit"
import { Value } from 'react-native-reanimated'

const Chart = ({prices}) =>{
    const [priceAtMoment, setPriceAtMoment] = React.useState('');
    return(
        <>
            <Text style={styles.priceAtMoment}>{priceAtMoment}</Text>
            <LineChart
                data={{
                datasets: [
                    {
                    data: [
                        // Math.random() * 100,
                        // Math.random() * 100,
                        // Math.random() * 100,
                        // Math.random() * 100,
                        // Math.random() * 100,
                        // Math.random() * 100

                        prices[0].close,
                        prices[1].close,
                        prices[2].close,
                        prices[3].close,
                        prices[4].close,
                        prices[5].close,
                        prices[6].close,
                        prices[7].close,
                        prices[8].close,
                        prices[9].close,
                        prices[10].close,
                    ]
                    }
                ]
                }}
                withHorizontalLabels={false}
                withVerticalLabels={false}
                withInnerLines={false}
                withOuterLines={false}   
                onDataPointClick={item => setPriceAtMoment(item.value + " $")}        
                width={Dimensions.get("window").width * 1.4} // from react-native
                height={280}
                yAxisLabel="$"
                // yAxisSuffix="k"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                // backgroundColor: "#FFFFFF",  
                backgroundGradientFrom: "#FFFFFF",
                backgroundGradientTo: "#FFFFFF",
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(33, 206, 153, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(33, 206, 153, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#21CE99",
                
                }
                }}
                bezier
                style={{
                marginVertical: 8,
                borderRadius: 16,
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    priceAtMoment: {
        color: "#21CE99"
    }
});

export default Chart 