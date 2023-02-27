import { StyleSheet, View, Alert, SafeAreaView, Button, TextInput, Text } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useCallback} from 'react';
import TimeTableView, {genTimeBlock} from 'react-native-timetable';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { isSearchBarAvailableForCurrentPlatform } from 'react-native-screens';

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
  const [data, setData] = useState('initial data');

  useFocusEffect(
    React.useCallback(() => {
      setData('updated data');

      return () => {
        //console.log('You left me!!')
      };
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <Timetable />
      <FabButton nav={navigation} />
    </View>
  );
}

function AddTimeSlotScreen({ navigation }) {
  const [Title, setTitle] = useState('');
  const [Location, setLocation] = useState('');
  const [EndTime, setEndTime] = useState('');

  const [Day, setDay] = useState('');

  const [StartHour, setStartHour] = useState(1);
  const [StartMinute, setStartMinute] = useState(1);

  const [EndHour, setEndHour] = useState(1);
  const [EndMinute, setEndMinute] = useState(1);

  const [StartDate, setStartDate] = useState(new Date());
  const [StartShow, setStartShow] = useState(false);

  const [EndDate, setEndDate] = useState(new Date());
  const [EndShow, setEndShow] = useState(false);

  const onStartTimeChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;
    setStartShow(Platform.OS === 'ios');
    setStartDate(currentDate);

    let tempDate = new Date(currentDate);

    let day = tempDate.getDay();
    let dayName = 0;
    if(day == 1){
      dayName = "MON";
    } else if(day == 2){
      dayName = "TUE";
    } else if(day == 3){
      dayName = "WED";
    } else if(day == 4){
      dayName = "THU";
    } else if(day == 5){
      dayName = "FRI";
    } else if(day == 6){
      dayName = "SAT";
    } else if(day == 7){
      dayName = "SUN";
    }

    let hour = tempDate.getHours();
    let mins = tempDate.getMinutes();

    setDay(dayName)
    setStartHour(hour)
    setStartMinute(mins)
  };

  const onEndTimeChange = (event, selectedDate) => {

    const currentDate = selectedDate || date;
    setEndShow(Platform.OS === 'ios');
    setEndDate(currentDate);

    let tempDate = new Date(currentDate);

    let hour = tempDate.getHours();
    let mins = tempDate.getMinutes();

    setEndHour(hour)
    setEndMinute(mins)
  };

  const onChangeTitle = (selectedTitle) => {
    let newTitle = selectedTitle;
    setTitle(newTitle);
  };

  const onChangeLocation = (selectedLocation) => {
    let newLocation = selectedLocation;
    setLocation(newLocation);
  };

  const onChangeEndTime = (selectedEndTime) => {
    let newEndTime = selectedEndTime;
    setEndTime(newEndTime);
  };

  const onButtonPress = () => {
    let data = {
      title: Title,
      startTime: genTimeBlock(Day, StartHour, StartMinute),
      endTime: genTimeBlock(Day, EndHour, EndMinute),
      location: Location,
    };

    events_data.push(data);
    events_data = {...events_data, data};
  };

  return(
  <View style={styles.Forms}>
    <TextInput
      style={styles.input}
      onChangeText={onChangeTitle}
      placeholder="Title"
    />
    <TextInput
      style={styles.input}
      onChangeText={onChangeLocation}
      placeholder="Location"
    />

    <RNDateTimePicker
      value={StartDate}
      mode={'time'}
      onChange={onStartTimeChange}
      display="default"
      is24Hour={true}
      testID="startTimePicker"
    />
    
    <RNDateTimePicker
      value={EndDate}
      mode={'time'}
      onChange={onEndTimeChange}
      display="default"
      is24Hour={true}
      testID="endTimePicker"
    />

    <Button title="Add Time Slot" onPress={onButtonPress} />
  </View>
  );
}

const Timetable = () => {
  const [events, setEvents] = useState(events_data);

  const updateEvents = () => {
    // setEvents([
    //   ...events,
    //   {
    //     startTime: genTimeBlock("WED", 14, 0),
    //     endTime: genTimeBlock("WED", 15, 0),
    //     title: 'Event 3',
    //     location: 'Wednesday'
    //   }
    // ]);
    setEvents(events_data);
  };

  const [tableData, setTableData] = useState(events_data);
  const [data, setData] = useState('initial data');

  useFocusEffect(
    React.useCallback(() => {
      //setTableData(events_data);
      updateEvents();
      //setEvents(events_data);
      console.log('Accessed timetable!')

      return () => {
        //console.log('You left me!!')
      };
    }, [])
  );

  return (
    <SafeAreaView style={{flex: 1}}>
        <View style = {styles.container}>
          <TimeTableView
            //scrollViewRef={this.scrollViewRef}
            events={events}
            pivotTime={8}
            pivotEndTime={20}
            //pivotDate={this.pivotDate}
            locale = 'en'
            formatDateHeader = 'ddd'
            nDays={5}
            headerStyle = {styles.headerStyle}
            onEventPress = {() => {console.log(events_data)}}
          />
        </View>
      </SafeAreaView>
  );
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

removeValue = async () => {
  try {
    await AsyncStorage.removeItem('@MyApp_key')
  } catch(e) {
    // remove error
  }

  console.log('Done.')
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

let events_data = [
  // {
  //   title: "Math",
  //   startTime: genTimeBlock("MON", 9),
  //   endTime: genTimeBlock("MON", 10, 50),
  //   location: "Classroom 403",
  //   extra_descriptions: ["Kim", "Lee"],
  // },
  // {
  //   title: "Math",
  //   startTime: genTimeBlock("WED", 9),
  //   endTime: genTimeBlock("WED", 10, 50),
  //   location: "Classroom 403",
  //   extra_descriptions: ["Kim", "Lee"],
  // },
  // {
  //   title: "Physics",
  //   startTime: genTimeBlock("MON", 11),
  //   endTime: genTimeBlock("MON", 11, 50),
  //   location: "Lab 404",
  //   extra_descriptions: ["Einstein"],
  // },
  // {
  //   title: "Computer Science",
  //   startTime: genTimeBlock("WED", 11),
  //   endTime: genTimeBlock("WED", 11, 50),
  //   location: "Lab 404",
  //   extra_descriptions: ["Einstein"],
  // },
  // {
  //   title: "Mandarin",
  //   startTime: genTimeBlock("WED", 9),
  //   endTime: genTimeBlock("WED", 10, 50),
  //   location: "Language Center",
  //   extra_descriptions: ["Chen"],
  // },
  // {
  //   title: "Japanese",
  //   startTime: genTimeBlock("FRI", 9),
  //   endTime: genTimeBlock("FRI", 10, 50),
  //   location: "Language Center",
  //   extra_descriptions: ["Nakamura"],
  // },
  // {
  //   title: "Club Activity",
  //   startTime: genTimeBlock("THU", 9),
  //   endTime: genTimeBlock("THU", 10, 50),
  //   location: "Activity Center",
  // },
  {
    title: "Club Activity",
    startTime: genTimeBlock("FRI", 13, 30),
    endTime: genTimeBlock("FRI", 14, 50),
    location: "Activity Center",
  },
 ]; 

//let events_data = [];

export default App;