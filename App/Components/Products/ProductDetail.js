import { Icon, Container, Left, Right } from 'native-base';
import React, { Component } from 'react';
import StarRating from 'react-native-star-rating';
import Swiper from "react-native-web-swiper";
import {
    View, Text, SafeAreaView, FlatList, ScrollView, Image, Alert, TouchableOpacity
} from 'react-native';

import images from "../../Themes/images";
import styles from './styles';
export { styles, images };
export default class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Quantity: 1,
            starCount: 3.5,
        }
    }

    onStarRatingPress = (rating) => {
        this.setState({ starCount: rating })
    }

    increaseQuantity = () => {
        this.setState({ Quantity: this.state.Quantity + 1})
    }

    reductionQuantity = () => {
        if(this.state.Quantity > 1 ) {
            this.setState({ Quantity: this.state.Quantity - 1})
        }
        else {
            Alert.alert(
                "Error!", 
                "Quantity is not valid!",
                [{ 
                    text: "Ok",
                    onPress: () => console.log("Ok Pressed"),
                }],
                { cancelable: false }
            );
        }
    }
    
    render() {
        const { Quantity } = this.state;

        return (
            <Container>
                <ScrollView style={styles.container}>
                    <Text style={[styles.header, styles.textAlignCenter]}>Product Detail</Text>
                    <View style={styles.boxImageDetail}>
                        <Swiper
                            from={1}
                            minDistanceForAction={0.1}
                            controlsProps={{
                                dotsTouchable: true,
                                prevPos: "left",
                                nextPos: "right",
                                nextTitle: '›',
                                nextTitleStyle: { fontWeight: 'bold', color: 'red', fontSize: 30 },
                                PrevComponent: ({ onPress }) => (
                                    <TouchableOpacity onPress={onPress}>
                                        <Text style={styles.styleButtonSlider}>{'‹'}</Text>
                                    </TouchableOpacity>
                                ),
                            }}
                        >
                            <Image source={images.product} resizeMode='stretch' style={styles.imageThumbnail} />
                            <Image source={images.product2} resizeMode='stretch' style={styles.imageThumbnail} />
                            <Image source={images.product3} resizeMode='stretch' style={styles.imageThumbnail} />
                        </Swiper>
                    </View>
                    <View style={styles.boxContentDetail}>
                        <Text style={styles.txtTitleDetail}>Black Iphone Speaker</Text>
                        <Text style={styles.txtPriceDetail}>$ 240.00</Text>
                        <View style={styles.customRatingBarStyle}>
                            <StarRating
                                disabled={false}
                                maxStars={5}
                                fullStarColor={"#EEC900"}
                                emptyStarColor={"#EEC900"}
                                rating={this.state.starCount}
                                starSize={15}
                                selectedStar={(rating) => this.onStarRatingPress(rating)}>
                            </StarRating>
                        </View>
                        <Text style={styles.txtDescription}>Description</Text>
                        <Text style={styles.descDetail}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting 
                            industry. Lorem Ipsum has been the industry's standard dummy 
                            text ever since the 1500s, when an unknown printer 
                            took a galley of type and scrambled it to make a type specimen book.
                        </Text>
                    </View>
                    <View style={styles.boxQuantityDetail}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity onPress={() => this.reductionQuantity()}
                                style={styles.borderBoxQuantity}>
                                <Icon name='minus' type='FontAwesome5' style={styles.boxIConQty} />
                            </TouchableOpacity>
                            <Text style={[styles.boxQtyNumber, styles.borderBoxQuantity]}>{Quantity}</Text>
                            <TouchableOpacity onPress={() => this.increaseQuantity()}
                                style={styles.borderBoxQuantity}>
                                <Icon name='plus' type='FontAwesome5' style={styles.boxIConQty} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.boxButtonDetail}>
                        <TouchableOpacity>
                            <Text style={styles.addToCart}>Add to Cart</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>    
            
        );
    }
}