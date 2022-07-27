
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, View, } from 'react-native'
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
                    backgroundColor: 'ghostwhite',
                }}>

                    <View style={{ flex: 1, flexDirection: 'row', padding: '4%' }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%' }}>
                            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>Season {item?.episode.slice(1, 3)}</Text>
                            <View style={{ flex: 1, backgroundColor: '#eee', alignItems: 'center', padding: '15%', justifyContent: 'center', borderRadius: 5 }}>
                                <Text style={{ fontSize: 25 }}>{item?.episode.slice(4, 6)}</Text>
                            </View>
                        </View>
                        <View style={{ flex: 3, paddingLeft: '3%', }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                    <Text style={{}}>{item?.air_date}</Text>
                                </View>
                            </View>
                        </View>
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

