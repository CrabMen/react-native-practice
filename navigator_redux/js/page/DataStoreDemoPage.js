import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, } from 'react-native';
import DataStore from '../expand/DataStore'


export default class DataStoreDemoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
        this.dataStore = new DataStore()
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data => {
                let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData
                })
            })
            .catch(error => {
                error && console.log(error.toString())
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>离线缓存框架设计</Text>

                <View style={styles.input_container}>
                    <TextInput
                        onChangeText={text => {
                            this.value = text;
                        }}
                        style={styles.input}
                    />

                    <Text onPress={() => this.loadData()}>获取</Text>
                </View>

                <Text style={{ padding: 15 }}>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        paddingVertical: 0,
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        margin: 15,
        color: '#333333'
    },
    input_container: {
        flexDirection: 'row',
        marginEnd:15,
        alignItems:'center'
    },
    text_button: {
        backgroundColor: '#123'
    },
});