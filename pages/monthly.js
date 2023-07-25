import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

 
export default class Monthly extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedStartDate: null,
    };
    this.onDateChange = this.onDateChange.bind(this);
  }
 
  onDateChange(date) {
    this.setState({
      selectedStartDate: date,
    });
  }
  render() {
    const { selectedStartDate } = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View style={styles.container}>
        <CalendarPicker
            todayBackgroundColor="#E0DFCB"
            selectedDayTextColor="#FFFFFF"
            selectedDayColor="#7BA695"
            onDateChange={this.onDateChange}
        />
 
        <View>
          <Text>     SELECTED DATE:{ startDate }</Text>
        </View>
      </View>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white',
    borderRadius:25,
    elevation:1
    
    
  },
});