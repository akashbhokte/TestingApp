
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View, } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import axios from 'axios';
import { Card } from 'react-native-shadow-cards';
import { ActivityIndicator } from 'react-native-paper';

const Detail = ({ navigation, route }) => {
    const item = route.params.item
    const [episodeData, setEpisodeData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        item?.episode.map(async (i) => {
            const res = await axios.get(i);
            let Arr = {
                "name": res?.data?.name,
                "air_date": res?.data?.air_date,
                "episode": res?.data?.episode,
            }

            setEpisodeData(p => {
                return ([...p, Arr])
            });
        })
        setLoading(false);
    }, [])

    const ItemView = ({ item }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', marginVertical: '1%' }}>
                <Card style={{
                    width: '100%',
                    height: '97%',
                    backgroundColor: 'white',
                }}>

                    <View style={{ flex: 1, flexDirection: 'row', padding: '4%' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%' }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold', color: 'black' }}>Season {item?.episode.slice(1, 3)}</Text>
                            <View style={{ flex: 1, backgroundColor: '#eee', alignItems: 'center', padding: '15%', justifyContent: 'center', borderRadius: 5 }}>
                                <Text style={{ fontSize: 25 }}>{item?.episode.slice(4, 6)}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, paddingLeft: '3%', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>{item.name}</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{ color: 'black' }}>{item?.air_date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </Card>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'ghostwhite' }}>
            <View style={{ flex: 0.25, }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}
                    style={{ justifyContent: 'center', flex: 1 }}
                >
                    <FontAwesome name="angle-left" style={{ marginLeft: '5%' }} color={'black'} size={40} />

                </TouchableOpacity>

            </View>
            <View style={{ flex: 1, }}>
                <Image source={{
                    uri: item?.image,
                }}
                    style={{
                        flex: 1,
                        alignSelf: 'center',
                        width: '75%',
                        height: '100%',
                        resizeMode: 'contain',
                        borderRadius: 6
                    }}
                />
                <View style={{ backgroundColor: 'skyblue', width: '30%', alignSelf: 'center', padding: '1%', borderRadius: 30, marginTop: '-4%' }}>
                    <Text style={{ textAlign: 'center', fontSize: 18, }}> {item.species.toUpperCase()}</Text>

                </View>

            </View>
            <View style={{ flex: 2, }}>
                <View style={{ flex: 2, justifyContent: 'space-around' }}>

                    <Text style={{ fontSize: 22, textAlign: 'center', fontWeight: 'bold', color: 'black' }}>

                        {item.name}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row', width: '70%', alignSelf: 'center', justifyContent: 'space-evenly' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: '1%' }}>
                            <FontAwesome name="mars" size={15} />
                            <Text style={{ marginHorizontal: '5%', fontSize: 16, color: 'black' }}>{item?.gender}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', padding: '1%' }}>
                            <Fontisto name="earth" size={15} />

                            <Text style={{ marginHorizontal: '5%', fontSize: 16, color: 'black' }}>{item?.origin?.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 8, padding: '5%' }}>
                    <Divider style={{ width: '100%', height: 1, marginVertical: '4%', borderColor: 'black', alignSelf: 'center' }} />

                    <Text style={{ fontSize: 22, lineHeight: 45, fontWeight: 'bold', color: 'black' }}>Episodes</Text>

                    {
                        loading ? (
                            <ActivityIndicator />
                        ) :
                            (
                                <FlatList
                                    data={episodeData}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={ItemView}
                                />

                            )
                    }

                </View>
            </View >
        </View >
    )
}

export default Detail

