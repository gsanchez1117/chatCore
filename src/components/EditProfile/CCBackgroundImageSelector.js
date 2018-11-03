import React from 'react';
import { StyleSheet, View, FlatList, Dimensions, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
import { Text } from 'native-base';
import { SearchBar } from 'react-native-elements';
import CCUnsplash from '../../services/unsplash';
import _ from 'lodash';

import CCBackgroundImageListItem from './CCBackgroundImageListItem'; 

const {height} = Dimensions.get('window');

export default class CCBackgroundImageSelector extends React.Component {

    constructor(props){
        super(props);
        
        //initial state
        this.state = {
            data: [],
            currentPage: 0,
            pageSize: 30,
            order_by: 'popular',
            searchDelay: 1000,
            searchText: '',
            endReached: false,
        };

        //fetch the inital data set
        this._loadMoreData();

    }

    /**
     * Called whenever data needs to be loaded. Decides how to load the data.
     */
    _loadMoreData() {
        //dont ask for more data if we have reached the end of the list
        if (this.state.endReached){ return; }
        
        var self = this;
        var nextPage = this.state.currentPage + 1;

        //uses the default listPhotos functionality
        if (_.trim(this.state.searchText) === ''){

            setTimeout(() => {
                CCUnsplash.photos.listPhotos(nextPage, this.state.pageSize, this.state.order_by)
                .then(response => response.json())
                .then(response => {
                    self.setState({
                        data: self.state.data.concat(response),
                        currentPage: nextPage,
                        endReached: (response.length == 0)
                    });
                });
            }, this.state.searchDelay);

        //runs a user defined search for photos
        }else{

            setTimeout(() => {
                CCUnsplash.search.photos(this.state.searchText, nextPage, this.state.pageSize)
                .then(response => response.json())
                .then(response => {
                    self.setState({
                        data: self.state.data.concat(response.results),
                        currentPage: nextPage,
                        endReached: (response.results.length == 0)
                    });
                });
            }, this.state.searchDelay);

        }

    }

    /**
     * Called each time a list item needs to be rendered
     * @param {*} item - the corresponding data item for the list item
     */
    _renderItem(item) {
        var firstName = item.user.first_name ? item.user.first_name : '';
        var lastName = item.user.last_name ? item.user.last_name : '';
        var selected = item.hasOwnProperty('selected') ? item.selected : false;
        return (
            <CCBackgroundImageListItem
                onPress={() => this._itemPressed(item)}
                url={item.urls.thumb}
                name={firstName + ' ' + lastName}
                selected={selected}
            />
        );
    }

    /**
     * Called whenever a list item is pressed.
     * @param {*} item - the data item that corresponds to the pressed list item. 
     */
    _itemPressed(item) {
        
        //unselect all other items
        this.state.data.forEach(element => {
            if (element.hasOwnProperty('selected')){
                element.selected = false;
            }
        });
        
        //select the passed in item
        item['selected'] = true;
        
        //force an update on the objects data 
        this.setState({
            data: this.state.data
        });

        //notify any listeners of the item that was selected
        if (this.props.onItemSelected)
            this.props.onItemSelected(item);
    }

    /**
     * called whenever the search button is pressed or a clear is pressed.
     */
    _searchSubmitPressed() {
        this.setState({
            currentPage: 0,
            data: [],     
            endReached: false,     
        }, () => {
            this._loadMoreData();
        });
    }

    /**
     * Called whenever the search or clear buttons are pressed on the search bar
     * @param {*} value - search text new value if search is pressed. undefined if clear is pressed
     */
    _searchTextChanged(value){
        this.setState({
            searchText: value ? value : ''          
        }, () => {
            //clear button was pressed
            if (!value){
                //act as if the search button was pressed with a blank entry
                this._searchSubmitPressed();
            }
        });
    }

    render () {
        return (
            <View style={{height:height*0.5}}>
                <View style={styles.creditBox}>
                    <Text style={{color: 'grey'}}>Photos By Unsplash</Text>
                </View>
                <SearchBar
                    platform="ios"
                    placeholder="Photos"
                    onChangeText={(value) => this._searchTextChanged(value)}
                    value={this.state.searchText}
                    onClearText={() => this._searchTextChanged()}
                    onSubmitEditing={() => this._searchSubmitPressed()}
                    returnKeyType="search"
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
                        this.state.endReached 
                        ? <Text style={{textAlign:"center"}}>End of list</Text>
                        : <ActivityIndicator size="large" />
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
    /**
     * Called whenever a user clicks on a specific item. The item is passed back.
     */
    onItemSelected: PropTypes.func
};

/**
 * A list of the default values for props on this component
 */
CCBackgroundImageSelector.defaultProps = {
    onItemSelected: null
};

const styles = StyleSheet.create({
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