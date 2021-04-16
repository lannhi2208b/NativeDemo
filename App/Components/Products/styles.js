const styles = {
    container: {
        marginBottom: 30,
    },
    itemProduct: {
        flex: 1,
        margin: 15,
        padding: 15,
        flexDirection: 'column',
    },
    boxImage: {
        width: "100%",
        height: 150,
    },
    imageThumbnail: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
        justifyContent: "center",
    },
    itemTitle: {
        fontWeight: "bold",
    },
    borderBox: {
        borderWidth: 1,
        borderColor: "#DDD",
        borderStyle: "solid",
        backgroundColor: 'white',
    },
    itemPrice: {
        color: "#FF6600",
        fontWeight: "bold",
        paddingBottom: 5,
    },
    header: {
        width: "100%",
        height: "auto",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        paddingTop: 15,
    },
    textAlignCenter: {
        textAlign: "center",
    },
    contentLong: {
        paddingLeft: 20,
        paddingRight: 20,
        fontStyle: "italic",
        marginBottom: 10,
    },
    flatList: {
        marginBottom: 40,
        height: 400,
    },
    boxImageDetail: {
        width: "100%",
        height: 300,
        marginTop: 10,
    },
    boxContentDetail: {
        padding: 15,
    },
    txtTitleDetail: {
        fontSize: 20,
        fontWeight: "bold",
    },
    txtPriceDetail: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FF6600",
        paddingBottom: 10,
    },
    txtDescription: {
        fontWeight: "bold",
        fontSize: 17,
    },
    boxQuantityDetail: {
        flexGrow: 1, 
        flexShrink: 1, 
        alignSelf: 'flex-start',
        paddingLeft: 15,
        paddingRight: 15,
    },
    boxQtyNumber: {
        borderRightWidth: 0, 
        borderLeftWidth: 0, 
        color: 'gray', 
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 8,
    },
    boxIConQty: {
        fontSize: 12,
        padding: 10,
    },
    borderBoxQuantity: {
        borderWidth: 1, 
        borderColor: '#CCC', 
    },
    boxButtonDetail: {
        padding: 15,
    },
    addToCart: {
        backgroundColor: "#4CA5B3",
        width: 200,
        padding: 10,
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        textTransform:'uppercase',
    },
    customRatingBarStyle: {
        width: 80,
    },
    styleButtonSlider: {
        color: 'red', 
        fontSize: 30, 
        fontWeight: 'bold',
    }
};
export default styles;