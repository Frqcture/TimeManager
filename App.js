import * as React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Alert, TouchableHighlight, Text } from 'react-native';
import Timetable from './SourceFiles/Timetable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';
import { Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';

var r = require('react-native');

const Stack = createNativeStackNavigator();

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

var Title, Location, Start, End = '';

function AddTimeSlotScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.containerText}
        placeholder='Title'
        selectedValue={Title}
      />
      <TextInput
        placeholder='Location'
        selectedValue={Location}
      />
      <TextInput
        placeholder='Start Time'
        selectedValue={Start}
        keyboardType='numeric'
      />
      <TextInput
        placeholder='End Time'
        selectedValue={End}
        keyboardType='numeric'
      />
      <TouchableHighlight style={styles.button} onPress={() => onButtonPress()} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight>
    </View>
  );
}


function onButtonPress() {
  Alert.alert('Time slot added!');
  var value = refs.form.getValue();
  if (value) { // if validation fails, value will be null
    console.log(value); // value here is an instance of Person
  }
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

var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  containerText: {
    justifyContent: 'center',
    height: 30,
    margin: 12,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

export default App;