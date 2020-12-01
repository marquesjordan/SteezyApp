import React from 'react';
import {View, Text} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default Header = ({
        message='Our Steezy', 
        icon='fist-raised'
    }) => {
    return (
        <View style={{paddingHorizontal: 20, marginVertical: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#F24405', textAlign: 'left', fontWeight: 'bold', fontSize: 22, fontFamily: 'Allerta-Stencil'}}>
                {message}
            </Text>
            <FontAwesome5 style={{fontSize: 30}} name={icon} />
        </View>
    )
}