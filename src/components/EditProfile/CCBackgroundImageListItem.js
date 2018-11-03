import React from 'react';
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native';
import PropTypes from 'prop-types'
import { Text } from 'native-base';
import { Icon } from 'react-native-elements';

export default class CCBackgroundImageListItem extends React.Component {

    constructor(props){
        super(props);
    }

    _itemPressed(){
        if (this.props.onPress)
            this.props.onPress();
    }

    //only update the component when new props are passed in
    shouldComponentUpdate(nextProps){
        return this.props.name !== nextProps.name || this.props.url !== nextProps.url || this.props.selected !== nextProps.selected;
    }

    render () {
        return (
            <TouchableOpacity style={styles.itemContainer} onPress={() => this._itemPressed()}>
                <Image 
                    style={{width:"100%", height:"100%", overflow: 'hidden', borderRadius: 5}} 
                    source={{uri: this.props.url}}
                    resizeMethod="scale"
                />
                <View style={styles.itemOverlay}>
                    <View style={styles.textBox}>
                        <Text style={{color:"white", paddingHorizontal:5}}>{this.props.name}</Text>
                    </View>
                    {this.props.selected
                        ?   <View style={styles.checkBoxOverlay}>
                                <Icon 
                                    name="done" 
                                    size={50}
                                    color="#fff"
                                />
                            </View>
                        :   null
                    }
                </View>
            </TouchableOpacity>
        );
    }
}

/**
 * A list of the props and their types that this components accepts
 */
CCBackgroundImageListItem.propTypes = {
    onPress: PropTypes.func,
    url: PropTypes.string,
    name: PropTypes.string,
    selected: PropTypes.bool,
};

/**
 * A list of the default values for props on this component
 */
CCBackgroundImageListItem.defaultProps = {
    onPress: null,
    url: '',
    name: '',
    selected: false,
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
    checkBoxOverlay: {
        position: 'absolute',
        overflow: 'hidden',
        width: "100%",
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#00000066',
        borderRadius: 5,
    }
});