// import * as React from 'react';
import {useState} from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Alert, TouchableHighlight, Text } from 'react-native';
import Timetable from './SourceFiles/Timetable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';
import { Button } from '@rneui/base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm} from "react-hook-form"

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

function AddTimeSlotScreen({ navigation }) {
  const [Title, setText] = useState('');
  const [Location, Start, End] = useState('');
  const {register,handleSubmit} = useForm();
  const onSubmit = data => console.log(data);
  return (
    <View style={styles.container}>
      {/* <TextInput
        style={styles.containerText}
        placeholder='Title'
        onChangeText={Title => setText(Title)}
        defaultValue={Title}
      />
      <TextInput
        style={styles.containerText}
        placeholder='Location'
        defaultValue={Location}
        onChangeText={Location => setText(Location)}
      />
      <TextInput
        style={styles.containerText}
        placeholder='Start Time'
        defaultValue={Start}
        onChangeText={Start => setText(Start)}
        keyboardType='numeric'
      />
      <TextInput
        style={styles.containerText}
        placeholder='End Time'
        defaultValue={End}
        onChangeText={End => setText(End)}
        keyboardType='numeric'
      />
      <TouchableHighlight style={styles.button} onPress={() => Alert.alert(Location)} underlayColor='#99d9f4'>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableHighlight> */}
      <form onSubmit={handleSubmit(onSubmit)}> 
        <input {...register("Title")} placeholder="Title" />
      </form>
    </View>
  );
}




function onButtonPress() {
  Alert.alert({Title});
  
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
    paddingLeft: 5,
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