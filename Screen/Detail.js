import React, { useEffect, useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';

const Detail = ({ route }) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        let { data } = route.params;
        console.log('data:', data)
        setData(data)
    }, [data])

    function renderDetail() {
        return (
            <View>
                <View style={{ justifyContent: 'center', flexDirection: 'column' }}>
                    <View style={{ backgroundColor: 'red' }}>
                        <Image
                            style={{ height: 200, width: 200 }}
                            source={{ uri: data.photo }}
                        />
                    </View>

                    <View>
                        <Text>{data.name}</Text>
                    </View>

                </View>
            </View>
        )
    }
    if (data) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                {renderDetail()}
            </View>
        )
    } else {
        return (<></>)
    }

}
export default Detail;