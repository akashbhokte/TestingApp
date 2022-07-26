import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Searchbar } from 'react-native-paper'
import axios from 'axios';
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
            <View style={{ flex: 1 }}>
                <Card style={{
                    width: '95%',
                    height: '97%',
                    margin: 10,
                    // padding: 10,
                    backgroundColor: 'ghostwhite'
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Detail', { item: item })}
                    >
                        <View style={{ flex: 1, flexDirection: 'row', padding: '2%' }}>
                            <View style={{ flex: 1, }}>
                                <Image
                                    source={{
                                        uri: item?.image,
                                    }}
                                    style={{ height: 50, width: 50, flex: 1 }}
                                />
                            </View>
                            <View style={{ flex: 3, }}>
                                <Text style={{ fontSize: 20 }}>{item.name}</Text>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, }}>
                                    </View>
                                    <View style={{ flex: 1, }}>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Card>
            </View>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Searchbar
                    placeholder="Search"
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}

                />

            </View>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button onPress={() => { setSortBy('male') }}>Male</Button>
                <Button onPress={() => { setSortBy('female') }}>Female</Button>

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