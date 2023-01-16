import * as React from 'react';
import { SafeAreaView, View, TextInput } from 'react-native';
import Timetable from './SourceFiles/Timetable';
// import FabButton from './SourceFiles/fab';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';

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

function FabButton({nav}) {
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

function CalendarScreen({navigation}) {
  return (
    <View style={{ flex: 1 }}>
      <Timetable />
      <FabButton nav={navigation}/>
    </View>
  );
}

function AddTimeSlotScreen({navigation}) {
  return (
    <SafeAreaView>
      <TextInput
        value={String}
        placeholder="Title"
      />
      <TextInput
        value={String}
        placeholder="Location"
      />
      <TextInput
        value={Number}
        placeholder="Start Time"
        keyboardType="numeric"
      />
      <TextInput
        value={Number}
        placeholder="End Time"
        keyboardType="numeric"
      />
    </SafeAreaView>
  );
  } 

export default App;