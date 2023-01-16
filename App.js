import * as React from 'react';
import { SafeAreaView, StyleSheet, View, Alert, Text } from 'react-native';
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
        <Stack.Screen name="Home" component={HomeScreen} />
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
        onPress={() => nav.navigate('Home')}
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

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

export default App;