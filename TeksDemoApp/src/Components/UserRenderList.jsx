import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {ChevronRight} from 'lucide-react-native';
import {useNavigation} from '@react-navigation/native';

const UserRenderList = React.memo(({item, index}) => {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        style={[styles.Container]}
        onPress={() => navigation.navigate('UserDetail', {data: item})}>
        <View style={[styles.InnerContainer]}>
          <Image
            source={{uri: item?.picture?.large}}
            style={[styles.UserImage]}
            resizeMode="contain"
          />
          <View>
            <Text
              numberOfLines={1}
              style={[
                styles.userFont,
              ]}>{`${item?.name?.title} ${item?.name?.first} ${item?.name?.last}`}</Text>
            <Text style={[styles.userSmallFont]}>{`${item?.email}`}</Text>
          </View>
        </View>
        <Pressable
          onPress={() => navigation.navigate('UserDetail', {data: item})}>
          <ChevronRight color="#fff" size={26} />
        </Pressable>
      </Pressable>
      <View style={{borderWidth: 0.2, borderColor: 'gray'}} />
    </>
  );
});

export default UserRenderList;

const styles = StyleSheet.create({
  Container: {
    height: responsiveScreenHeight(6),
    width: responsiveScreenWidth(98),
    alignSelf: 'center',
    marginBottom: responsiveScreenHeight(2),
    marginTop: responsiveScreenHeight(2),
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveScreenHeight(1.5),
  },
  UserImage: {
    height: responsiveScreenHeight(7),
    width: responsiveScreenHeight(7),
    borderRadius: responsiveScreenHeight(3.5),
  },
  InnerContainer: {
    flexDirection: 'row',
    gap: responsiveScreenHeight(2),
    alignItems: 'center',
  },
  userFont: {
    fontSize: responsiveScreenHeight(2),
    fontFamily: 'Poppins-Medium',
    color: '#fff',
    width: responsiveScreenWidth(60),
  },
  userSmallFont: {
    fontSize: responsiveScreenHeight(1.5),
    fontFamily: 'Poppins-Regular',
    color: '#dcdcdc',
  },
});
