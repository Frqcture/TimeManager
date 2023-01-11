import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Alert,
} from 'react-native';
import TimeTableView, { genTimeBlock } from 'react-native-timetable';
import MyTimetable from './SourceFiles/Timetable';

export default class App extends Component {
  render() {
    return(
      <SafeAreaView>
        <View>
          <MyTimetable />
        </View>
      </SafeAreaView>
    );
  }}