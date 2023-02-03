// import * as React from 'react';
import { StyleSheet, View, Alert, SafeAreaView, Button, TextInput, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from "react-hook-form"
import {useState, React,  Component } from 'react';
import TimeTableView, {genTimeBlock} from 'react-native-timetable';

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
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      Title: '',
      Location: '',
      StartTime: '',
      EndTime: '',
    }
  });
  const onSubmit = data => console.log(data);

  return (
    <View style={styles.Forms}>
      <Controller
        control={control}
        rules={{
         required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Title"
          />
        )}
        name="Title"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Location"
          />
        )}
        name="Location"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Start Time"
          />
        )}
        name="StartTime"
      />

      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="End Time"
          />
        )}
        name="EndTime"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

export class Timetable extends Component {
  constructor(props) {
    super(props);
    this.numberOfDays = 1;
    this.pivotDate = genTimeBlock(JSON.stringify(getDayOfWeek(getCurrentDate('-')), 0));
  }

  scrollViewRef = (ref) => {
    this.timetableRef = ref;
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style = {styles.container}>
          <TimeTableView
            scrollViewRef={this.scrollViewRef}
            events={events_data}
            pivotTime={8}
            pivotEndTime={20}
            //pivotDate={this.pivotDate}
            locale = 'en'
            formatDateHeader = 'ddd'
            nDays={this.numberOfDays}
            headerStyle = {styles.headerStyle}
          />
        </View>
      </SafeAreaView>
      
    );
  }

  // render() {
  //   return(
  //     <View>
  //       <Text>Hello World</Text>
  //     </View>
  //   )
  // }
}

function onButtonPress() {
  Alert.alert({Title});
  
}

function getDayOfWeek(date) {
  var dayOfWeek = new Date(date).getDay();
  return isNaN(dayOfWeek) ? null :
    ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][dayOfWeek];
}

//Function to get the current date
function getCurrentDate(separator=''){
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
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
  Forms: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
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
  },
  headerStyle: {
    backgroundColor: '#81E1B8'
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  input: {
    justifyContent: 'center',
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  }
});

const events_data = [
  {
    title: "Math",
    startTime: genTimeBlock("MON", 9),
    endTime: genTimeBlock("MON", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Math",
    startTime: genTimeBlock("WED", 9),
    endTime: genTimeBlock("WED", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
  {
    title: "Physics",
    startTime: genTimeBlock("MON", 11),
    endTime: genTimeBlock("MON", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Computer Science",
    startTime: genTimeBlock("WED", 11),
    endTime: genTimeBlock("WED", 11, 50),
    location: "Lab 404",
    extra_descriptions: ["Einstein"],
  },
  {
    title: "Mandarin",
    startTime: genTimeBlock("WED", 9),
    endTime: genTimeBlock("WED", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Chen"],
  },
  {
    title: "Japanese",
    startTime: genTimeBlock("FRI", 9),
    endTime: genTimeBlock("FRI", 10, 50),
    location: "Language Center",
    extra_descriptions: ["Nakamura"],
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("THU", 9),
    endTime: genTimeBlock("THU", 10, 50),
    location: "Activity Center",
  },
  {
    title: "Club Activity",
    startTime: genTimeBlock("FRI", 13, 30),
    endTime: genTimeBlock("FRI", 14, 50),
    location: "Activity Center",
  },
 ];

export default App;