import React from 'react';
import { ScrollView, StyleSheet, Text, View, Switch, Platform } from 'react-native';
import { Accordion, Content, Container } from 'native-base';
import { Icon } from 'react-native-elements';

import Colors from '../constants/Colors';
import CCNavOptions from '../components/CCNavOptions';
import CCAccordion from '../components/CCAccordion';
//edit components
import CCBackgroundImageSelector from '../components/EditProfile/CCBackgroundImageSelector';
import CCEditProfileAboutMe from '../components/EditProfile/CCEditProfileAboutMe';

export default class FriendsScreen extends React.Component {
  
  static navigationOptions = new CCNavOptions({
    title: 'Edit Profile'
  });

  constructor(props){
    super(props);

    this.state = {
      dataArray: [
        { title: "Background Image", canToggle: false, active: true, content: <CCBackgroundImageSelector/> },
        { title: "About Me", canToggle: true, active: false, content: <CCEditProfileAboutMe/> },
        { title: "Contact", canToggle: true, active: false, content: null },
      ]
    }
  }

  /**
   * Updates the active state of the data object with the given value.
   * @param {*} dataObject - the data object to be updasted
   * @param {*} value - the value to update its active state with
   */
  _tabActiveStateChanged(dataObject, value){
    //change the active state of the data object
    dataObject.active = value;
    //get a reference to the data array
    var dataArrayRef = this.state.dataArray;
    //get the index of the data object in the array
    var index = this.state.dataArray.map((e) => e.title).indexOf(dataObject.title);
    //update the data object in the array
    dataArrayRef[index] = dataObject;
    //update the data array in the state
    this.setState({
      dataArray: dataArrayRef 
    });
  }

  /**
   * Custom rendering for the header of the accordion view.
   * @param {*} dataObject - data obejct for the specific tab
   * @param {*} expanded - if the tab is expanded or not
   */
  _renderHeader(dataObject, expanded) {
    return (
      <View style={styles.headerContainer}>
        <View style={styles.leftHeaderContainer}>
          {dataObject.canToggle 
            ?<Switch value={dataObject.active} onValueChange={ (value) => this._tabActiveStateChanged(dataObject, value)}/>
            :null
          }   
          <Text style={{ fontWeight: "600" }}>
            {" "}{dataObject.title}
          </Text>
        </View>
        <View style={styles.rightHeaderContainer}>
          {dataObject.content != null 
            ? (expanded
                ? <Icon style={{ fontSize: 18}} name="expand-less" />
                : <Icon style={{ fontSize: 18 }} name="expand-more" />
              )
            : null}
        </View>
      </View>
    );
  }

  /**
   * Makes the content panels response for their own rendering.
   * @param {*} dataObject - the specific data obejct to be rendered from the data array
   */
  _renderContent(dataObject) {
    return dataObject.content;
  }

  render() {
    return (
      <View style={styles.container}>
          <CCAccordion
            dataArray={this.state.dataArray}
            renderHeader={(dataObject, expanded) => this._renderHeader(dataObject, expanded)}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flex: 1,
    flexDirection: "row", 
    alignItems: "center", 
    padding: 10, 
    backgroundColor: Colors.GS_Color_Contrast_2
  },
  leftHeaderContainer: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: "center" 
  },
  rightHeaderContainer: {
    justifyContent: 'flex-end'
  },
});
