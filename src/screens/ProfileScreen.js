import React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import { Text, Card, CardItem, Body } from 'native-base';
import { Avatar, Icon, Button } from 'react-native-elements';
import Colors from '../constants/Colors';
import CCNavOptions from '../components/CCNavOptions';

let ScreenSize = Dimensions.get('window')

export default class ProfileScreen extends React.Component {
  
  static navigationOptions = new CCNavOptions({
    title: 'Profile'
  });

  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={{uri: 'https://images.unsplash.com/photo-1521521075819-8dfb91b45d67?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=6aa77f9556a503903f0b9eb48290f210&auto=format&fit=crop&w=334&q=80'}}

          //'https://r1.ilikewallpaper.net/pic/201609/Curious_Cat_Sneaking_Up_iPhone_6_Wallpaper_640.jpg'}}
          style={{position: 'absolute', width: '100%', height: '100%', backgroundColor:"#fff"}} 
        />
        <ScrollView style={styles.scrollView}>
          <Card style={styles.cardContainer}>
            <CardItem style={styles.cardHeader}
              header 
              bordered
            >
              <Text style={{color:"white"}}>Gabriel Sanchez</Text>
            </CardItem>
            <CardItem style={[styles.cardItem, {paddingLeft:10}]}>
              <Avatar
                source={require('../assets/images/profilePic.jpg')}
                containerStyle={{borderRadius:5, overflow:'hidden'}}
                height={ScreenSize.width*0.35}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <View style={styles.userInfoBox}>
                <Text adjustsFontSizeToFit={true} numberOfLines={2}>Last Login: 11/17/2018</Text>
              </View>
            </CardItem>
          </Card>
          <Card style={styles.cardContainer}>
            <CardItem style={styles.cardHeader}
              header 
              bordered
            >
              <Text style={{color:"white"}}>About Me</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>My name is Gabriel Sanchez.. and this is some information about me. idk Maybe it's called fuck you?</Text>
              </Body>
            </CardItem>
          </Card>
          <Card style={styles.cardContainer}>
            <CardItem style={styles.cardHeader}
              header 
              bordered
            >
              <Text style={{color:"white"}}>Contact</Text>
            </CardItem>
              <Button
                containerViewStyle={styles.cardButton}
                textStyle={{color:Colors.GS_Color_Highlight_1}}
                backgroundColor={Colors.GS_Color_Contrast_1}
                icon={{name:'person-add', style:{color:Colors.GS_Color_Highlight_1}}}
                title="Add to Friends"
              />
              <Button
                containerViewStyle={styles.cardButton}
                textStyle={{color:Colors.GS_Color_Highlight_1}}
                backgroundColor={Colors.GS_Color_Contrast_1}
                icon={{name:'chat', style:{color:Colors.GS_Color_Highlight_1}}}
                title="Chat"
              />
          </Card>
          <Card style={styles.cardContainer}>
            <CardItem style={styles.cardHeader}
              header 
              bordered
            >
              <Text style={{color:"white"}}>Comments</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>Hi, From Jocelyn</Text>
              </Body>
            </CardItem>
          </Card>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.GS_Color_Contrast_1
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  userInfoBox: {
    flex: 1,
    flexDirection: 'column',
    padding: 5,
    marginLeft: 5,
    borderLeftWidth: 1,
    borderColor: Colors.GS_Color_Contrast_3,
    height: '100%'
  },
  cardContainer: {
    backgroundColor: Colors.GS_Color_Contrast_4 + "3f",
    marginLeft: 0,
  },
  cardHeader: {
    backgroundColor: Colors.GS_Color_Contrast_4 + "3f",
    paddingTop: 4,
    paddingBottom: 4,
  },
  cardButton: {
    marginLeft: 2,
    marginRight: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  cardItem: {
    backgroundColor: '#ffffff'
  },
  contentContainer: {
      flex: 1,
      paddingTop: 30,
      height: '100%',
  },
});
