import * as React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Alert, TouchableHighlight, Text } from 'react-native';
import Timetable from './SourceFiles/Timetable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';
import { Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';

var t = require('tcomb-form-native');

const Stack = createNativeStackNavigator();
var Form = t.form.Form;

const form = "form "

const NewTimeForm = t.struct({
  title: t.String,
  location: t.String,
  startTime: t.Date,
  endTime: t.Date,
});

var options = {
  fields: {
    startTime: {
      mode: 'time',
      defaultValueText: 'Start Time'
    },
    endTime: {
      mode: 'time' ,
      defaultValueText: 'End Time'
    }
  }
};

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="AddTimeSlot" component={AddTimeSlotScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function FabButton({ nav }) {
  return (
    <View>
      <FAB
        icon={{ name: 'add', color: 'white' }}
        title='New'
        placement='right'
        size='large'
        onPress={() => nav.navigate('AddTimeSlot')}
      />
    </View>
  );
}

function CalendarScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Timetable />
      <FabButton nav={navigation} />
    </View>
  );
}

function AddTimeSlotScreen({ navigation }) {
  return (
    <View style={styles.input}>
      <Form
        type={NewTimeForm}
        options={options}
      />
    </View>
  );
}

function onButtonPress() {
  Alert.alert('Time slot added!');

}

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    padding: 10,
  },
});

export default App;