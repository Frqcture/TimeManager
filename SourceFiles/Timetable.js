import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text
} from 'react-native';
import {TimeTableView, genTimeBlock, genDateBlock } from 'react-native-timetable';


const events_data = [
  {
    title: "Math",
    startTime: genTimeBlock("MON", 9),
    endTime: genTimeBlock("MON", 10, 50),
    location: "Classroom 403",
    extra_descriptions: ["Kim", "Lee"],
  },
//   {
//     title: "Math",
//     startTime: genTimeBlock("WED", 9),
//     endTime: genTimeBlock("WED", 10, 50),
//     location: "Classroom 403",
//     extra_descriptions: ["Kim", "Lee"],
//   },
//   {
//     title: "Physics",
//     startTime: genTimeBlock("MON", 11),
//     endTime: genTimeBlock("MON", 11, 50),
//     location: "Lab 404",
//     extra_descriptions: ["Einstein"],
//   },
//   {
//     title: "Computer Science",
//     startTime: genTimeBlock("WED", 11),
//     endTime: genTimeBlock("WED", 11, 50),
//     location: "Lab 404",
//     extra_descriptions: ["Einstein"],
//   },
//   {
//     title: "Mandarin",
//     startTime: genTimeBlock("WED", 9),
//     endTime: genTimeBlock("WED", 10, 50),
//     location: "Language Center",
//     extra_descriptions: ["Chen"],
//   },
//   {
//     title: "Japanese",
//     startTime: genTimeBlock("FRI", 9),
//     endTime: genTimeBlock("FRI", 10, 50),
//     location: "Language Center",
//     extra_descriptions: ["Nakamura"],
//   },
//   {
//     title: "Club Activity",
//     startTime: genTimeBlock("THU", 9),
//     endTime: genTimeBlock("THU", 10, 50),
//     location: "Activity Center",
//   },
//   {
//     title: "Club Activity",
//     startTime: genTimeBlock("FRI", 13, 30),
//     endTime: genTimeBlock("FRI", 14, 50),
//     location: "Activity Center",
//   },
 ];

//Write a function to return the current day of the week
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

//Make a new empty react component called Timetable
export default class Timetable extends Component {
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
  //     </View>
  //   )
  // }
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#81E1B8'
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
});