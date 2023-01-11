import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import { FAB } from '@rneui/themed';

export default class FabButton extends Component {
    render() {
        return (
            <View>
                <FAB
                    icon={{ name: 'add', color: 'white'}}
                    title='New'
                    placement='right'
                    size='large'
                />
            </View>
        );
    }
}

