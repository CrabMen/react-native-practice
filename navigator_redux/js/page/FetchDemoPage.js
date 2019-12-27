import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

export default class FetchDemoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
    }

    loadData() {
        // https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => response.text())
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
    }


    loadData2() {
        // https://api.github.com/search/repositories?q=java
        let url = `https://api.github.com/search/repositories?q=${this.searchKey}`
        fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.text()
                }
                throw new Error('Network response was not ok')
            })
            .then(responseText => {
                this.setState({
                    showText: responseText
                })
            })
            .catch(e => {
                this.setState({
                    showText: e.toString()
                })
            })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Fetch 使用</Text>

                <View style={styles.input_container}>
                    <TextInput
                        onChangeText={text => {
                            this.searchKey = text;
                        }}
                        style={styles.input}
                    />

                    <Text
                        onPress={() => this.loadData2()}
                        style={styles.button}
                    >获取</Text>
                </View>

                <Text>{this.state.showText}</Text>
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
        height: 30,
        flex: 1,
        borderColor: 'black',
        borderWidth: 1,
        margin: 15,
        color: '#333333'
    },
    input_container: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    button: {
        paddingEnd: 15,
    },
});