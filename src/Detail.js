
import React, { useState } from 'react'
import { FlatList, Image, Text, View, } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';


const Detail = ({ navigation, route }) => {
    const item = route.params.item


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
                <View style={{ backgroundColor: 'skyblue', width: '30%', alignSelf: 'center', padding: '1%', borderRadius: 30, marginTop: '-4%' }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, }}> {item.species.toUpperCase()}</Text>

                </View>

            </View>
            <View style={{ flex: 2, }}>
                <View style={{ flex: 1, }}>

                    <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold' }}>

                        {item.name}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', width: '50%', alignSelf: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                            <FontAwesome name="mars" size={15} />
                            <Text style={{ marginHorizontal: '5%', fontSize: 16 }}>{item?.gender}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: 2 }}>
                            <Fontisto name="earth" size={15} />

                            <Text style={{ marginHorizontal: '5%', fontSize: 16 }}>{item?.origin?.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 7, padding: '5%' }}>
                    <Divider style={{ width: '100%', height: 1, marginVertical: '4%', borderColor: 'black', alignSelf: 'center' }} />

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

