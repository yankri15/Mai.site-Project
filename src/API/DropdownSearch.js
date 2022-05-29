import { View, Text, TextInput, Pressable, FlatList } from 'react-native'
import React, { useState } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons";
import { globalStyles } from '../styles/global';


const DropdownSearch = ({ placeHolder, selectedItems, filteredList, handleSearch, handleSelect, handleUnselect, display, setDisplay }) => {

    // const [display, setDisplay] = useState('none');

    return (
        <View>
            <View>
                <FlatList
                    data={selectedItems}
                    horizontal={true}
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => { handleUnselect(item) }}
                            style={{ backgroundColor: '#DEDAD9', padding: 5 }}
                        >
                            <Text>{item.name}</Text>
                        </Pressable>
                    )}
                    ItemSeparatorComponent={() => {
                        return (
                            <View
                                style={{ width: 3 }}
                            >
                            </View>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
            <View
                style={{ position: 'relative', flexDirection: 'row', width: '100%', justifyContent: 'center', }}
            >
                <TextInput
                    placeholder={placeHolder}
                    onFocus={() => setDisplay('flex')}
                    onChangeText={(text) => handleSearch(text)}
                    style={globalStyles.textInputProject}
                />
                {display === 'flex' && filteredList && <Ionicons
                    name="close-outline"
                    style={{ position: 'absolute', alignSelf: 'center', right: 20, backgroundColor: '#DEDAD9', zIndex: 3, borderRadius: 10 }}
                    size={30}
                    onPress={() => setDisplay('none')}
                />}
            </View>
            <View
                style={{ position: 'relative', display: display }}
            >
                <View
                    style={{ position: 'absolute', backgroundColor: '#EAE7E6', zIndex: 3, width: '100%' }}
                >
                    <FlatList
                        data={filteredList}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => { handleSelect(item) }}
                                style={{ width: '100%', padding: 5 }}
                            >
                                <Text>{item.name}</Text>
                            </Pressable>
                        )}
                        ItemSeparatorComponent={() => {
                            return (
                                <View
                                    style={{ height: 1, backgroundColor: 'black' }}
                                >
                                </View>
                            )
                        }}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        </View>
    )
}

export default DropdownSearch