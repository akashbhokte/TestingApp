
import React, { useState } from 'react'
import { FlatList, Image, Text, View, } from 'react-native'


const Detail = ({ navigation, route }) => {
    const item = route.params.item

    console.log("item===", item)

    const ItemView = ({ item }) => {
        return (
            <View style={{ flex: 1 }}>
                <Card style={{
                    width: '95%',
                    height: '97%',
                    margin: 10,
                    // padding: 10,
                    backgroundColor: 'ghostwhite'
                }}>

                    <View style={{ flex: 1, flexDirection: 'row', padding: '2%' }}>

                    </View>
                </Card>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, }}>
            <View style={{ flex: 1, }}>
                <Image source={{
                    uri: item?.image,
                }}
                    style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain'
                    }}
                />
            </View>
            <View style={{ flex: 3, }}>
                <View style={{ flex: 1, }}>

                    <Text style={{ fontSize: 22, textAlign: 'center' }}>
                        {item.name}
                    </Text>
                </View>
                <View style={{ flex: 9, }}>
                    <Text style={{ fontSize: 22, }}>Episodes</Text>

                    <FlatList
                        // data={ }
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={ItemView}
                    />
                </View>
            </View >
        </View >
    )
}

export default Detail

