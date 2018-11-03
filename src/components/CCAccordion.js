import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';

export default class CCAccordion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            expanded: 0
        };
    }

    _itemPressed(item){
        var index = this.props.dataArray.findIndex(other => _.isEqual(other, item));
        this.setState({
            expanded: index === this.state.expanded ? -1 : index
        });
    }

    _renderHeader(item, index){
        return (
            <View key={index}>
                <TouchableOpacity style={this.props.renderHeader ? null : styles.renderHeader}
                    onPress={() => this._itemPressed(item)}
                >
                {this.props.renderHeader
                    ? this.props.renderHeader(item, index === this.state.expanded)
                    : <Text>{item.title}</Text> 
                }
                </TouchableOpacity>
                {this.state.expanded === index 
                    ? this._renderContent(item)
                    : null
                }
            </View>
        );
    }

    _renderContent(item){
        return (item.content);
    }

    render () {
        return (
            <ScrollView 
                style={[styles.container, {}]}
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            >
                {this.props.dataArray.map( (item, index) => (
                    this._renderHeader(item, index)
                ))}
            </ScrollView>
        );
    }
}

/**
 * A list of the props and their types that this components accepts
 */
CCAccordion.propTypes = {
    dataArray: PropTypes.array,
    renderHeader: PropTypes.func,
};

/**
 * A list of the default values for props on this component
 */
CCAccordion.defaultProps = {
    dataArray: [],
    renderHeader: null,
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    headerContainer: {
        width: '100%',
        height: 50,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        borderTopWidth: 1,
        borderTopColor: 'black',
        backgroundColor: 'lightgrey',
        justifyContent: 'center',
    },
})