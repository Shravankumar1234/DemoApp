const FooterLoader = () => {
    return (
        <>
            {(transactions?.length > 0 && moreData) ? <View>
                <ActivityIndicator size={24} />
            </View> : <View style={{ alignItems: "center", justifyContent: "center", marginTop: 20, height: responsiveScreenHeight(4) }}>
                <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 16, color: "#003146" }}>No More Data found</Text>
            </View>}

        </>
    )
}