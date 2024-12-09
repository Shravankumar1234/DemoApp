import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {CircleChevronLeftIcon, MapPin, Phone, User} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const UserDetailScreen = ({route}) => {
  const {data} = route.params;
  const navigation = useNavigation();
  return (
    <>
      <ImageBackground
        source={{uri: data?.picture?.medium}}
        style={[styles.ImageContainer]}
        resizeMode="stretch"
        blurRadius={2}>
        <Pressable
          style={{paddingHorizontal: 10, paddingVertical: 10}}
          onPress={() => navigation.goBack()}>
          <CircleChevronLeftIcon color={'#000000'} size={40} />
        </Pressable>
        <Image
          source={{uri: data?.picture?.large}}
          style={[styles.innerContainer]}
          resizeMode="cover"
          borderRadius={10}
        />
      </ImageBackground>
      <View
        style={{
          marginTop: responsiveScreenHeight(12),
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: responsiveScreenHeight(2),
        }}>
        <Text
          style={[
            styles.userFont,
          ]}>{`${data?.name?.title} ${data?.name?.first} ${data?.name?.last}`}</Text>
        <Text style={[styles.userSmallFont]}>{`${data?.email}`}</Text>
        <View style={[styles.gender]}>
          <Phone color={'#dcdcdc'} size={20} />
          <Text style={[styles.userSmallFont]}>{`${data?.phone}`}</Text>
        </View>
      </View>
      <View style={[styles.gender]}>
        <User color={'#dcdcdc'} size={28} />
        <Text style={[styles.userFont]}>{`${data?.gender}`}</Text>
        <View style={{flexDirection: 'row', gap: 6, paddingHorizontal: 2}}>
          <Text style={[styles.userFont]}>{`Age :`}</Text>
          <Text style={[styles.userFont]}>{`${data?.dob?.age} Yr's`}</Text>
        </View>
        <View style={{flexDirection: 'row', gap: 6, paddingHorizontal: 2}}>
          <MapPin color={'#dcdcdc'} size={28} />
          <Text style={[styles.userFont]}>{`${data?.location.country}`}</Text>
        </View>
      </View>
      <View style={{borderWidth: 0.2, borderColor: '#dcdcdc', marginTop: 10}} />
      <View style={[styles.locationContainer]}>
        <View style={{flexDirection: 'row', gap: 6, paddingHorizontal: 10}}>
          <MapPin color={'#dcdcdc'} size={28} />
          <Text style={[styles.userFont]}>{`Location Details:`}</Text>
        </View>
        <View
          style={{paddingHorizontal: responsiveScreenHeight(4), marginTop: 10}}>
          <Text
            style={[
              styles.userFont,
            ]}>{`House No: ${data?.location?.street?.number}`}</Text>
        </View>
        <Text
          style={[
            styles.userFont,
            {paddingHorizontal: responsiveScreenHeight(3)},
          ]}>{` ${data?.location?.street?.name}, ${data?.location?.city},${data?.location?.postcode},`}</Text>
        <Text
          style={[
            styles.userFont,
            {paddingHorizontal: responsiveScreenHeight(3)}
          ]}>{` ${data?.location?.state},${data?.location?.country}.`}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  ImageContainer: {
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(100),
    backgroundColor: '#dcdcdc',
    borderRadius: 8,
  },
  innerContainer: {
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(40),
    position: 'absolute',
    top: responsiveScreenHeight(10),
    left: responsiveScreenWidth(30),
    backgroundColor: '#fff',
  },
  userFont: {
    fontSize: responsiveScreenHeight(2),
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
  userSmallFont: {
    fontSize: responsiveScreenHeight(1.5),
    fontFamily: 'Poppins-Regular',
    color: '#dcdcdc',
  },
  gender: {
    flexDirection: 'row',
    gap: responsiveScreenHeight(1),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveScreenHeight(0.5),
    marginTop: 5,
  },
  locationContainer: {
    height: responsiveScreenHeight(20),
    width: responsiveScreenWidth(100),

    borderRadius: 8,
    marginTop: 20,
  },
});

export default UserDetailScreen;
