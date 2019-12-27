import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

const KEY = 'save_key'
export default class AsynStorageDemoPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showText: ''
        }
    }

    doSave() {
        if (!this.value || this.value.length < 1) {
            return
        }
        // 用法一
        AsyncStorage.setItem(KEY, this.value, error => {
            error && console.log(error.toString());
        })
        // // 用法二
        // AsyncStorage.setItem(KEY, this.value)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     })
        // // 用法三
        // try {
        //     await AsyncStorage.setItem(KEY, this.value)
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

    getData() {
        // 用法一
        AsyncStorage.getItem(KEY, (error, value) => {
            this.setState({
                showText: value
            })
            console.log(value);
            error && console.log(error.toString());
        })
        // // 用法二
        // AsyncStorage.getItem(KEY)
        //     .then(value => {
        //         this.setState({
        //             showText: value
        //         })
        //         console.log(value);
        //     })
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     })
        // // 用法三
        // try {
        //     const value = await AsyncStorage.getItem(KEY)
        //     this.setState({
        //         showText: value
        //     })
        //     console.log(value);
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

    doRemove() {
        // 用法一
        AsyncStorage.removeItem(KEY, error => {
            error && console.log(error.toString());
        })
        // // 用法二
        // AsyncStorage.removeItem(KEY)
        //     .catch(error => {
        //         error && console.log(error.toString());
        //     })
        // // 用法三
        // try {
        //     await AsyncStorage.removeItem(KEY)
        // } catch (error) {
        //     error && console.log(error.toString());
        // }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>AsynStorage 使用</Text>

                <TextInput
                    onChangeText={text => {
                        this.value = text;
                    }}
                    style={styles.input}
                />

                <View style={styles.input_container}>
                    <Text onPress={() => this.doSave()}>存储</Text>
                    <Text onPress={() => this.doRemove()}>删除</Text>
                    <Text onPress={() => this.getData()}>获取</Text>
                </View>

                <Text style={{padding:15}}>
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
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        margin: 15,
        color: '#333333'
    },
    input_container: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 15,
    },
    text_button: {
        backgroundColor: '#123'
    },
});