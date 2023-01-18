import * as React from 'react';
import { StyleSheet, SafeAreaView, View, TextInput, Alert } from 'react-native';
import Timetable from './SourceFiles/Timetable';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FAB } from '@rneui/themed';
import { Button } from '@rneui/base';

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
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Title"
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
      />
      <TextInput
        style={styles.input}
        placeholder="Start Time"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="End Time"
        keyboardType="numeric"
      />
      <Button
        title="Add"
        onPress={() => onButtonPress()}
      />
    </SafeAreaView>
  );
}

function onButtonPress() {
  Alert.alert('Time slot added!');
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default App;