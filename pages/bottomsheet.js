import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';




import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';



export default class CurrentSheet extends React.Component {

  

  renderInner = () => (
    <View style={styles.panel}>
      <Text> KKK </Text>
      <Image source={require('../images/pinker.png')}/>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => this.bs.current.snapTo(0)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

    bs = React.createRef();
    fall = new Animated.Value(1);
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={require('../images/upcoming.png')}
                style={{ flex:1, width: null, height: null, resizeMode: 'cover'}} 
                >
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  
            
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
                <View style={{flex:2}}>
                     <Image source={require('../images/upcoming.png')}
                        style={{ flex:1, width: null, height: null, resizeMode: 'cover'}} />
                </View>
            <BottomSheet
                ref={this.bs}
                snapPoints={[566, 0]}
                renderContent={this.renderInner}
                renderHeader={this.renderHeader}
                initialSnap={0}
                callbackNode={this.fall}
                enabledGestureInteraction={true}
            />
            <Animated.View style={{margin: 20,
                opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
            }}>
                <View style={{alignItems: 'center'}}>
                <TouchableOpacity onPress={() => this.bs.current.snapTo(1)}>
                    <View
                    style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    
                    </View>
                </TouchableOpacity>
                
                </View>
        
            </Animated.View>
            </View>
        )}
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,

  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
   
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
});