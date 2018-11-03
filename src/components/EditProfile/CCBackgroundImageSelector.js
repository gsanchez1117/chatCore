import React from 'react';
import { StyleSheet, View, FlatList, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types'
import { Text, Container, Content } from 'native-base';
import { SearchBar } from 'react-native-elements';
import CCUnsplash from '../../services/unsplash';

const {height} = Dimensions.get('window');

export default class CCBackgroundImageSelector extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            data: [],
            currentPage: 0,
        };

        var self = this;

        var self = this;
        setTimeout(() => {
            CCUnsplash.photos.listPhotos(0, 12, "latest")
            .then(response => response.json())
            .then(response => {
                self.setState({
                    data: response,
                });
            });
        }, 1000);

    }

    _renderItem(item) {
        return (
            <View style={styles.itemContainer}>
                <Image 
                    style={{width:"100%", height:"100%", overflow: 'hidden', borderRadius: 5}} 
                    source={{uri: item.urls.thumb}}
                    resizeMethod="scale"
                />
                <View style={styles.itemOverlay}>
                    <View style={styles.textBox}>
                        <Text style={{color:"white"}}>{item.user.first_name + " " + item.user.last_name}</Text>
                    </View>
                </View>
            </View>
        );
    }

    _loadMoreData() {
        var self = this;
        setTimeout(() => {
            var nextPage = this.state.currentPage + 1;
            CCUnsplash.photos.listPhotos(nextPage, 12, "latest")
            .then(response => response.json())
            .then(response => {
                self.setState({
                    data: self.state.data.concat(response),
                    currentPage: nextPage,
                });
            });
        }, 1000);
    }
    _searchTextChanged() {
        var self = this;
        setTimeout(() => {
            CCUnsplash.search.photos("dogs", this.state.currentPage, 12)
            .then(response => response.json())
            .then(response => {
                self.setState({
                    data: self.state.data.concat(response),
                    
                });
            });
        }, 1000);
    }

    render () {
        return (
            <View style={{height:height*0.5}}>
                <View style={styles.creditBox}>
                    <Text style={{color: 'grey'}}>Photos By Unsplash</Text>
                </View>
                <SearchBar
                    lightTheme
                    platform="ios"
                    placeholder="Photos"
                    onChangeText={(value) => this._searchTextChanged(value)}
                />
                <FlatList 
                    ref={ (c) => this.myList = c }
                    numColumns={2}
                    data={this.state.data}
                    renderItem={({item}) => this._renderItem(item)}
                    onEndReached={() => {this._loadMoreData()}}
                    onEndReachedThreshold={0}
                    keyExtractor={(item, index) => item.id + index.toString()}
                    nestedScrollEnabled={true}
                    ListFooterComponent={
                        <ActivityIndicator size="large" />
                    }
                />
            </View>
        );
    }
}

/**
 * A list of the props and their types that this components accepts
 */
CCBackgroundImageSelector.propTypes = {
    enableScrolling: PropTypes.bool,
    onScrollBegan: PropTypes.func,
    onScrollEnded: PropTypes.func,
};

/**
 * A list of the default values for props on this component
 */
CCBackgroundImageSelector.defaultProps = {
    enableScrolling: true,
    onScrollBegan: null,
    onScrollEnded: null,
};

const styles = StyleSheet.create({
    itemContainer: {
        overflow: 'hidden',
        flex:1,
        aspectRatio:1.3,
        padding:10,
        borderRadius: 5,
    },
    itemOverlay: {
        position: 'absolute',
        overflow: 'hidden',
        margin: 10,
        width: "100%",
        height: '100%',
        justifyContent: 'flex-end',
    },
    textBox: {
        width: '100%', 
        height: "25%", 
        borderBottomStartRadius: 5,
        borderBottomEndRadius: 5,
        backgroundColor: '#00000099', 
        alignItems: 'center',
        justifyContent: 'center'
    },
    creditBox: {
        width: "100%", 
        height: 40, 
        borderBottomWidth: 1, 
        borderTopWidth: 1,
        borderBottomColor: 'black',
        borderTopColor: 'grey',
        justifyContent: 'center',
        paddingLeft: 10
    }
});