import React, { Component, useState } from 'react';
import {
  Text,

  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TextInput,
  Keyboard,
  Switch,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,

  Image,
} from 'react-native';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import * as Calendar from 'expo-calendar';
import * as Localization from 'expo-localization';
import Constants from 'expo-constants';
import DateTimePicker from 'react-native-modal-datetime-picker';
import uuid from 'react-native-uuid';
import { Context } from '../assets/Context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal';

const { width: vw } = Dimensions.get('window');
// moment().format('YYYY/MM/DD')

const styles = StyleSheet.create({
  viewTask: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: '#B5D1C7',
    position: 'absolute',
    right: 10,
    top: 710,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    zIndex: 1
  },
  createTaskButton: {
    width: 130,
    height: 45,
    alignSelf: 'center',
    position: 'absolute',
    borderRadius: 15,
    justifyContent: 'center',
    bottom: 30,

    elevation: 6
  },
  seperator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  notes: {
    color: '#9CAAC4',
    fontSize: 16,
    fontWeight: '600',
  },
  notesContent: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#979797',
    alignSelf: 'center',
    marginVertical: 20,
  },
  learn: {
    height: 23,
    width: 51,
    backgroundColor: '#F8D557',
    justifyContent: 'center',
    borderRadius: 5,
  },
  design: {
    height: 23,
    width: 59,
    backgroundColor: '#62CCFB',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  readBook: {
    height: 23,
    width: 83,
    backgroundColor: '#4CD565',
    justifyContent: 'center',
    borderRadius: 5,
    marginRight: 7,
  },
  title: {
    height: 25,
    borderColor: '#5DD976',
    borderLeftWidth: 1,
    paddingLeft: 8,
    fontSize: 19,
  },
  taskContainer: {
    height: 500,
    width: 30,
    alignSelf: 'center',
    borderRadius: 30,
    shadowColor: '#2E66E7',
    backgroundColor: '#313149',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    shadowRadius: 20,
    shadowOpacity: 0.2,
    elevation: 5,
    padding: 22,
  },
  calenderContainer: {
    marginTop: 50,
    width: 350,
    height: 310,
    alignSelf: 'center',
  },
  newTask: {
    alignSelf: 'center',
    fontSize: 20,
    width: 120,
    height: 25,
    textAlign: 'center',
  },
  backButton: {
    flexDirection: 'row',

    width: '100%',
    alignItems: 'center',
    backgroundColor: '#1C1C28'
  },
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#F5F5F5',
  },
});



export default class CreateTask extends Component {
  constructor() {
    super();
    this.state = {
      datesWhitelist: [
        {
          start: moment(),
          end: moment().add(365, 'days'), // total 4 days enabled
        },
      ],
      selectedDay: {
        [`${moment().format('YYYY')}-${moment().format('MM')}-${moment().format(
          'DD'
        )}`]: {
          selected: true,
          selectedColor: '#424C73',
        },
      },
      currentDate: `${moment().format('YYYY')}-${moment().format(
        'MM'
      )}-${moment().format('DD')}`,
      currentDay: moment().format(),
      taskText: '',
      notesText: '',
      keyboardHeight: 0,
      visibleHeight: Dimensions.get('window').height,
      isAlarmSet: false,
      isModalVisible: false,
      alarmTime: moment().format(),
      isDateTimePickerVisible: false,
      timeType: '',
      todoList: [],
      markedDot: [],
      creatTodo: {},
      selectedTask: null,
      createEventAsyncRes: '',
    }


  }
  toggleModal = () => {
    this.setState({ isModalVisible: true });
  };
  toggleOffModal = () => {
    this.setState({ isModalVisible: false });
    this.setState({ taskText: '' })
  };



  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide
    );
    this._handleDeletePreviousDayTask();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener?.remove();
    this.keyboardDidHideListener?.remove();
  }

  _handleDeletePreviousDayTask = async () => {
    const { currentDate } = this.state;
    try {
      const value = await AsyncStorage.getItem('TODO');

      if (value !== null) {
        const todoList = JSON.parse(value);
        const todayDate = `${moment().format('YYYY')}-${moment().format(
          'MM'
        )}-${moment().format('DD')}`;
        const checkDate = moment(todayDate);
        await todoList.filter(item => {
          const currDate = moment(item.date);
          const checkedDate = checkDate.diff(currDate, 'days');
          if (checkedDate > 0) {
            item.todoList.forEach(async listValue => {
              try {
                await Calendar.deleteEventAsync(
                  listValue.alarm.createEventAsyncRes.toString()
                );
              } catch (error) {
                console.log(error);
              }
            });
            return false;
          }
          return true;
        });

        // await AsyncStorage.setItem('TODO', JSON.stringify(updatedList));
        this._updateCurrentTask(currentDate);
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  _updateCurrentTask = async currentDate => {
    try {
      const value = await AsyncStorage.getItem('TODO');
      if (value !== null) {
        const todoList = JSON.parse(value);
        const markDot = todoList.map(item => item.markedDot);
        const todoLists = todoList.filter(item => {
          if (currentDate === item.date) {
            return true;
          }
          return false;
        });
        if (todoLists.length !== 0) {
          this.setState({
            markedDate: markDot,
            todoList: todoLists[0].todoList,
          });
        } else {
          this.setState({
            markedDate: markDot,
            todoList: [],
          });
        }
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    const { selectedTask } = this.state;
    const prevSelectedTask = { ...selectedTask };
    const selectedDatePicked = prevSelectedTask.alarm.time;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    prevSelectedTask.alarm.time = newModifiedDay;
    this.setState({
      selectedTask: prevSelectedTask,
    });

    this._hideDateTimePicker();
  };

  _keyboardDidShow = e => {
    this.setState({
      keyboardHeight: e.endCoordinates.height,
      visibleHeight:
        Dimensions.get('window').height - e.endCoordinates.height - 30,
    });
  };

  _keyboardDidHide = () => {
    this.setState({
      visibleHeight: Dimensions.get('window').height,
    });
  };

  handleAlarmSet = () => {
    const { isAlarmSet } = this.state;
    this.setState({
      isAlarmSet: !isAlarmSet,
    });
  };

  synchronizeCalendar = async value => {
    const { route } = this.props;
    const { createNewCalendar } = route.params;
    const calendarId = await createNewCalendar();
    try {
      const createEventAsyncRes = await this._addEventsToCalendar(calendarId);
      this.setState(
        {
          createEventAsyncRes,
        },
        () => {
          this._handleCreateEventData(value);
        }
      );
    } catch (e) {
      Alert.alert(e.message);
    }
  };

  _addEventsToCalendar = async calendarId => {
    const { taskText, notesText, alarmTime } = this.state;
    const event = {
      title: taskText,
      notes: notesText,
      startDate: moment(alarmTime)
        .add(0, 'm')
        .toDate(),
      endDate: moment(alarmTime)
        .add(60, 'm')
        .toDate(),
      timeZone: Localization.timezone,
    };

    try {
      const createEventAsyncRes = await Calendar.createEventAsync(
        calendarId.toString(),
        event
      );

      return createEventAsyncRes;
    } catch (error) {
      console.log(error);
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleCreateEventData = async value => {

    const {
      state: {
        currentDay,
        taskText,
        notesText,
        isAlarmSet,
        alarmTime,
        createEventAsyncRes,
      },
      props: { route },
    } = this;
    const { updateCurrentTask, currentDate } = route.params;
    const creatTodo = {
      key: uuid(),
      date: `${moment(currentDay).format('YYYY')}-${moment(currentDay).format(
        'MM'
      )}-${moment(currentDay).format('DD')}`,
      todoList: [
        {
          key: uuid(),
          title: taskText,
          notes: notesText,
          alarm: {
            time: alarmTime,
            isOn: isAlarmSet,
            createEventAsyncRes,
          },
          color: `rgb(${Math.floor(
            Math.random() * Math.floor(256)
          )},${Math.floor(Math.random() * Math.floor(256))},${Math.floor(
            Math.random() * Math.floor(256)
          )})`,
        },
      ],
      markedDot: {
        date: currentDay,
        dots: [
          {
            key: uuid(),
            color: '#424C73',
            selectedDotColor: '#424C73',
          },
        ],
      },
    };

    await value.updateTodo(creatTodo);
    await updateCurrentTask(currentDate);

  };

  _handleDatePicked = date => {
    const { currentDay } = this.state;
    const selectedDatePicked = currentDay;
    const hour = moment(date).hour();
    const minute = moment(date).minute();
    const newModifiedDay = moment(selectedDatePicked)
      .hour(hour)
      .minute(minute);

    this.setState({
      alarmTime: newModifiedDay,
    });

    this._hideDateTimePicker();
  };

  _updateAlarm = async () => {
    const { selectedTask } = this.state;
    const calendarId = await this._createNewCalendar();
    const event = {
      title: selectedTask.title,
      notes: selectedTask.notes,
      startDate: moment(selectedTask.alarm.time)
        .add(0, 'm')
        .toDate(),
      endDate: moment(selectedTask.alarm.time)
        .add(5, 'm')
        .toDate(),
      timeZone: Localization.timezone,
    };

    if (selectedTask.alarm.createEventAsyncRes === '') {
      try {
        const createEventAsyncRes = await Calendar.createEventAsync(
          calendarId.toString(),
          event
        );
        const updateTask = { ...selectedTask };
        updateTask.alarm.createEventAsyncRes = createEventAsyncRes;
        this.setState({
          selectedTask: updateTask,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await Calendar.updateEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString(),
          event
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  _deleteAlarm = async () => {
    const { selectedTask } = this.state;
    console.log(selectedTask.alarm);

    try {
      await Calendar.deleteEventAsync(selectedTask.alarm.createEventAsyncRes);

      const updateTask = { ...selectedTask };
      updateTask.alarm.createEventAsyncRes = '';
      this.setState({
        selectedTask: updateTask,
      });
    } catch (error) {
      console.log(error);
    }
  };

  _getEvent = async () => {
    const { selectedTask } = this.state;

    if (selectedTask.alarm.createEventAsyncRes) {
      try {
        await Calendar.getEventAsync(
          selectedTask.alarm.createEventAsyncRes.toString()
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  _findCalendars = async () => {
    const calendars = await Calendar.getCalendarsAsync();

    return calendars;
  };

  _createNewCalendar = async () => {
    const calendars = await this._findCalendars();
    const newCalendar = {
      title: 'test',
      entityType: Calendar.EntityTypes.EVENT,
      color: '#2196F3',
      sourceId:
        Platform.OS === 'ios'
          ? calendars.find(cal => cal.source && cal.source.name === 'Default')
            .source.id
          : undefined,
      source:
        Platform.OS === 'android'
          ? {
            name: calendars.find(
              cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
            ).source.name,
            isLocalAccount: true,
          }
          : undefined,
      name: 'test',
      accessLevel: Calendar.CalendarAccessLevel.OWNER,
      ownerAccount:
        Platform.OS === 'android'
          ? calendars.find(
            cal => cal.accessLevel === Calendar.CalendarAccessLevel.OWNER
          ).ownerAccount
          : undefined,
    };

    let calendarId = null;

    try {
      calendarId = await Calendar.createCalendarAsync(newCalendar);
    } catch (e) {
      Alert.alert(e.message);
    }

    return calendarId;
  };

  render() {

    const {
      state: {
        selectedDay,
        currentDay,
        taskText,
        visibleHeight,
        notesText,
        isAlarmSet,
        alarmTime,
        isDateTimePickerVisible,
        todoList,
        markedDate


      },
      props: { navigation },
    } = this;


    return (
      <Context.Consumer>

        {value => (
          <>

            <TouchableOpacity
              style={styles.viewTask}
              onPress={() => { this.toggleModal(true) }}>
              <Image
                source={require('../assets/plus.png')}
                style={{
                  height: 30,
                  width: 30,
                }}
              />

            </TouchableOpacity>
            <DateTimePicker
              isVisible={isDateTimePickerVisible}
              onConfirm={this._handleDatePicked}
              onCancel={this._hideDateTimePicker}
              mode="time"
            />

            <View style={styles.container}>
              <View
                style={{
                  height: visibleHeight,
                }}
              >
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 100,
                  }}
                >

                  <View style={styles.calenderContainer}>
                    <CalendarList
                      style={{
                        marginTop: 25,
                        width: 350,
                        height: 310,
                      }}
                      current={currentDay}
                      minDate={moment().format()}
                      horizontal
                      pastScrollRange={0}
                      pagingEnabled
                      calendarWidth={350}
                      onDayPress={day => {
                        this.setState({
                          selectedDay: {
                            [day.dateString]: {
                              selected: true,
                              selectedColor: '#A1C7BE',
                            },
                          },
                          currentDay: day.dateString,
                          alarmTime: day.dateString,
                        });
                      }}
                      monthFormat="yyyy MMMM"
                      hideArrows
                      markingType="simple"
                      theme={{
                        selectedDayBackgroundColor: '#A1C7BE',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#0357FB',
                        backgroundColor: '#F5F5F5',
                        calendarBackground: '#F5F5F5',
                        textDisabledColor: '#d9dbe0',
                      }}
                      markedDates={selectedDay}
                    />
                  </View>

                </ScrollView>
              </View>
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 20,
                }}
              >
                {todoList.map(item => (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(
                        {
                          selectedTask: item,
                          isModalVisible: true,
                        },
                        () => {
                          this._getEvent();
                        }
                      );
                    }}
                    key={item.key}
                    style={styles.taskListContent}
                  >
                    <View
                      style={{
                        marginLeft: 13,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <View
                          style={{
                            height: 12,
                            width: 12,
                            borderRadius: 6,
                            backgroundColor: item.color,
                            marginRight: 8,
                          }}
                        />
                        <Text
                          style={{
                            color: '#554A4C',
                            fontSize: 20,
                            fontWeight: '700',
                          }}
                        >
                          {item.title}
                        </Text>
                      </View>
                      <View>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginLeft: 20,
                          }}
                        >
                          <Text
                            style={{
                              color: '#BBBBBB',
                              fontSize: 14,
                              marginRight: 5,
                            }}
                          >{`${moment(item.alarm.time).format(
                            'YYYY'
                          )}/${moment(item.alarm.time).format('MM')}/${moment(
                            item.alarm.time
                          ).format('DD')}`}</Text>
                          <Text
                            style={{
                              color: '#BBBBBB',
                              fontSize: 14,
                            }}
                          >
                            {item.notes}
                          </Text>
                        </View>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 80,
                        width: 5,
                        backgroundColor: item.color,
                        borderRadius: 5,
                      }}
                    />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>


            <Modal
              animationType={"slide"}
              transparent={true}
              visible={this.state.isModalVisible}
              onSwipeComplete={this.toggleModal}

              onRequestClose={() => { console.log("Modal has been closed.") }}>
              <View style={{ height: '75%', width: '95%', borderRadius: 30, alignSelf: 'center', backgroundColor: 'white', paddingTop: 50, paddingLeft: 5, paddingRight: 5, elevation: 10 }}>
                <View >
                  <Text style={styles.notes}>Tags</Text>


                  <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                    <TouchableOpacity
                      style={{
                        marginRight: 5,
                        width: 110,
                        height: 35,
                        borderRadius: 10,
                        justifyContent: 'center',

                        backgroundColor: '#13C879',
                        elevation: 10
                      }}
                      onPress={() => this.setState({ taskText: 'Homework' })}
                      value={taskText}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white'
                        }}
                      >
                        Homework
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginRight: 5,
                        width: 100,
                        height: 35,
                        borderRadius: 10,
                        justifyContent: 'center',

                        backgroundColor: '#F6A226',
                        elevation: 10
                      }}
                      onPress={() => this.setState({ taskText: 'Project' })}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white'
                        }}
                      >
                        Project
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 3,
                        width: 100,
                        height: 35,
                        borderRadius: 10,
                        justifyContent: 'center',
                        backgroundColor: '#AC2A41',
                        elevation: 10
                      }}
                      onPress={() => this.setState({ taskText: 'Test' })}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white'
                        }}
                      >
                        Test
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 10 }}>
                    <TouchableOpacity
                      style={{
                        marginRight: 5,
                        width: 110,
                        height: 35,
                        borderRadius: 10,
                        justifyContent: 'center',

                        backgroundColor: '#5D514F',
                        elevation: 10
                      }}
                      onPress={() => this.setState({ taskText: 'Class' })}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white'
                        }}
                      >
                        Class
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        marginRight: 5,
                        width: 100,
                        height: 35,
                        borderRadius: 10,
                        justifyContent: 'center',

                        backgroundColor: '#6ACCAF',
                        elevation: 10
                      }}
                      onPress={() => this.setState({ taskText: 'Study' })}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white'
                        }}
                      >
                        Study
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{
                        padding: 3,
                        width: 100,
                        height: 35,
                        borderRadius: 10,
                        justifyContent: 'center',
                        backgroundColor: '#B65B4D',
                        elevation: 10
                      }}
                      onPress={() => this.setState({ taskText: 'Event' })}
                    >
                      <Text
                        style={{
                          fontSize: 13,
                          fontWeight: 'bold',
                          textAlign: 'center',
                          color: 'white'
                        }}
                      >
                        Event
                      </Text>
                    </TouchableOpacity>
                  </View>


                  <View style={styles.notesContent} />
                  <View>
                    <Text style={styles.notes}>Notes</Text>

                    <TextInput
                      style={{
                        height: 25,
                        fontSize: 19,
                        marginTop: 10,
                      }}
                      onChangeText={text =>
                        this.setState({ notesText: text })
                      }
                      value={notesText}
                      placeholder="Enter notes about the task."
                    />

                  </View>

                  <View style={styles.seperator} />

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          color: '#9CAAC4',
                          fontSize: 16,
                          fontWeight: '600',
                        }}
                      >
                        Time
                      </Text>
                      <TouchableOpacity
                        onPress={() => this._showDateTimePicker()}
                        style={{
                          height: 25,
                          marginTop: 3,
                        }}
                      >
                        <Text style={{ fontSize: 19, color: 'grey' }}>
                          {moment(alarmTime).format('h:mm A')}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <Switch
                      value={isAlarmSet}
                      onValueChange={this.handleAlarmSet}
                    />
                  </View>

                </View>
                <TouchableOpacity
                  disabled={taskText === ''}
                  style={[
                    styles.createTaskButton,
                    {
                      backgroundColor:
                        taskText === ''
                          ? 'rgba(46, 102, 231,0)'
                          : '#3E4972',
                      elevation:
                        taskText === ''
                          ? 0
                          : 7,
                    },
                  ]}
                  onPress={async () => {
                    if (isAlarmSet) {
                      await this.synchronizeCalendar(value);
                    }
                    if (!isAlarmSet) {
                      this._handleCreateEventData(value);
                    }
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: 'center',
                      color: taskText === ''
                        ? 'rgba(46, 102, 231,0)'
                        : 'white',
                    }}
                  >
                    Add task
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.toggleOffModal()}
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 20
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      textAlign: 'center',
                      color: '#9CAAC4'

                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </>
        )}
      </Context.Consumer>
    );
  }
}