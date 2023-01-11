import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import Timetable from './SourceFiles/Timetable';
import FabButton from './SourceFiles/fab';

export default class App extends Component {
  render() {
    return(
      <View style={{flex:1}}>
        <Timetable />
        <FabButton />
      </View>
    );
  }}