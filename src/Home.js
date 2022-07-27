import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Searchbar } from 'react-native-paper'
import axios from 'axios';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { Card } from 'react-native-shadow-cards';

const Home = ({ navigation }) => {

    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [sortBy, setSortBy] = useState('male');

    useEffect(() => {
        getData();

    }, [sortBy])


    async function getData() {
        const res = await axios.get('https://rickandmortyapi.com/api/character');
        // console.log('response.....', res?.data?.results);

        let maleArray = res?.data?.results.filter((i) => i.gender == "Male");
        let femaleArray = res?.data?.results.filter((i) => i.gender == "Female");

        if (sortBy == 'male') {
            setFilteredDataSource([...maleArray, ...femaleArray]);
            setMasterDataSource([...maleArray, ...femaleArray]);
        }
        else if (sortBy == 'female') {
            setFilteredDataSource([...femaleArray, ...maleArray]);
            setMasterDataSource([...femaleArray, ...maleArray]);
        }
    }

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = masterDataSource.filter(
                function (item) {
                    const itemData = item.name
                        ? item.name.toUpperCase()
                        : ''.toUpperCase();
                    const textData = text.toUpperCase();
                    return itemData.indexOf(textData) > -1;
                });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {
            setFilteredDataSource(masterDataSource);
            setSearch(text);
        }
    };

    const ItemView = ({ item }) => {
        return (
            <View style={{ flex: 1, alignItems: 'center', padding: '1%' }}>
                <Card style={{
                    width: '95%',
                    height: '97%',
                    backgroundColor: 'ghostwhite',
                    padding: '2%'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', { item: item })}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginHorizontal: '2%' }}>
                                <Image
                                    source={{
                                        uri: item?.image,
                                    }}
                                    style={{ height: '100%', width: '100%', flex: 1, borderRadius: 5, resizeMode: 'contain' }}
                                />
                                <View style={{ backgroundColor: 'skyblue', width: '90%', borderRadius: 10, marginTop: '-10%', alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 12, }}> {item.species.toUpperCase()}</Text>

                                </View>
                            </View>
                            <View style={{ flex: 3, marginLeft: '2%', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                        <FontAwesome name="mars" size={15} color={'black'} />
                                        <Text style={{ marginHorizontal: '4%', color: 'black' }}>{item?.gender}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', }}>
                                        <Fontisto name="earth" size={15} color={'black'} />

                                        <Text style={{ marginHorizontal: '4%', color: 'black' }}>{item?.origin?.name}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ flex: 1, }}>
                                    <Text style={{ fontWeight: 'bold' }}>episodes</Text>
                                </View>
                                <View style={{ flex: 1, backgroundColor: '#eee', alignItems: 'center', width: '80%', justifyContent: 'center', borderRadius: 5 }}>
                                    <Text style={{ fontSize: 25 }}>{item?.episode.length}</Text>
                                </View>

                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    };

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    style={{ borderRadius: 6, margin: '4%', borderWidth: 0.5 }}

                />

            </View>
            <View style={{ flex: 0.5, flexDirection: 'row', width: '60%', justifyContent: 'space-around', padding: '2%' }}>
                <TouchableOpacity
                    onPress={() => { setSortBy('male') }}
                    style={{ flexDirection: 'row', padding: '2%', borderWidth: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'space-around', width: '40%' }}>
                    <FontAwesome name="mars" size={15} color={'black'} />
                    <Text style={{ color: 'black' }}>Male</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { setSortBy('female') }}
                    style={{ flexDirection: 'row', padding: '2%', borderWidth: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'space-around', width: '40%' }}>
                    <FontAwesome name="venus" size={15} color={'black'} />
                    <Text style={{ color: 'black' }}>Female</Text>
                </TouchableOpacity>
                {/* <Button onPress={() => { setSortBy('male') }}>Male</Button>
                <Button onPress={() => { setSortBy('female') }}>Female</Button> */}

            </View>

            <View style={{ flex: 9 }}>

                <FlatList
                    data={filteredDataSource}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={ItemView}
                />
            </View>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({})