import { Icon, Item } from 'native-base';
import React, { Component } from 'react';
import { View, Text, SafeAreaView, FlatList, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import StarRating from 'react-native-star-rating';

import images from "../../Themes/images";
import styles from './styles';
export { styles, images };

import ProductDetail from '../Products/ProductDetail';
export {  ProductDetail };

const dataSource = [
    {
        id: 'RN1',
        images: images.product,
        title: 'Black Speaker',
        price: '240.00',
        rating: 5,
    },
    {
        id: 'RN2',
        images: images.product2,
        title: 'Red Speaker',
        price: '270.00',
        rating: 3,
    },
    {
        id: 'RN3',
        images: images.product3,
        title: 'Pink Speaker',
        price: '140.00',
        rating: 4,
    },
    {
        id: 'RN4',
        images: images.product,
        title: 'White Speaker',
        price: '210.00',
        rating: 2,
    },
    {
        id: 'RN5',
        images: images.product2,
        title: 'Pink Speaker',
        price: '140.00',
        rating: 5,
    },
    {
        id: 'RN6',
        images: images.product3,
        title: 'White Speaker',
        price: '210.00',
        rating: 4,
    },
];

export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View>
                    <Text style={[styles.header, styles.textAlignCenter]}>Products</Text>
                    <Text style={[styles.contentLong, styles.textAlignCenter]}>
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                    </Text>
                </View>
                <FlatList
                    style={styles.flatList}
                    data={dataSource}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <View style={[styles.itemProduct, styles.borderBox]}>
                            <View style={styles.boxImage}>
                                <Image source={item.images} 
                                    resizeMode='stretch' 
                                    style={styles.imageThumbnail} />
                            </View>
                            <Text style={styles.itemTitle} 
                                onPress={() => this.props.navigation.navigate('Product Detail')}>
                                {item.title}
                            </Text>
                            <Text style={styles.itemPrice}>$ {item.price}</Text>
                            <View style={styles.customRatingBarStyle}>
                                <StarRating
                                    disabled={false}
                                    maxStars={5}
                                    fullStarColor={"#EEC900"}
                                    emptyStarColor={"#EEC900"}
                                    rating={item.rating}
                                    starSize={15}>
                                </StarRating>
                            </View>
                        </View>
                    )}
                />
            </SafeAreaView>
        );
    }
}