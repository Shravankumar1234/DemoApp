import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetUsers} from '../Redux/slices/userSlice';
import UserRenderList from '../Components/UserRenderList';
import {responsiveScreenHeight} from 'react-native-responsive-dimensions';
import EmptyPage from '../Components/EmptyPage';

// Countries to filter
const countryList = [
  'United States',
  'Australia',
  'Germany',
  'Iran',
  'United Kingdom',
  'Canada',
  'France',
];

const UserListScreen = () => {
  const {userList, moreData, loading} = useSelector(state => state.users);
  const [load, setload] = useState(false);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [filteredUserList, setFilteredUserList] = useState(userList);

  useEffect(() => {
    GetUsers(page, dispatch);
  }, [page]);

  //   Filter by Country
  useEffect(() => {
    if (selectedCountry) {
      setFilteredUserList(
        userList.filter(user => user.location.country === selectedCountry),
      );
    } else {
      setFilteredUserList(userList);
    }
  }, [selectedCountry, userList]);

  //   Memorized Component
  const renderItem = useCallback(
    ({item, index}) => <UserRenderList item={item} index={index} />,
    [filteredUserList],
  );

  // Pull to Refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setPage(1);
    GetUsers(page, dispatch).then(res => {
      if (res === 'SUCCESS') {
        setRefreshing(false);
      }
    });
  }, []);

  // Load More
  const moreLoadData = useCallback(() => {
    if (moreData) {
      setPage(page + 1);
    }
  }, [page]);

  // Header Component
  const renderHeader = () => {
    return (
      <>
        {/* Filter Buttons */}
        <View style={{margin: 10}}>
          <Text style={[styles.userFont]}>Filter by Country</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Pressable
              onPress={() => setSelectedCountry('')}
              style={{
                backgroundColor: selectedCountry === '' ? '#003146' : '#f0f0f0',
                padding: 10,
                margin: 5,
                borderRadius: 5,
              }}>
              <Text
                style={{color: selectedCountry === '' ? '#fff' : '#003146'}}>
                All Countries
              </Text>
            </Pressable>
            {countryList.map((country, index) => (
              <Pressable
                key={index}
                onPress={() => setSelectedCountry(country)}
                style={{
                  backgroundColor:
                    selectedCountry === country ? '#003146' : '#f0f0f0',
                  padding: 10,
                  margin: 5,
                  borderRadius: 5,
                }}>
                <Text
                  style={{
                    color: selectedCountry === country ? '#fff' : '#003146',
                  }}>
                  {country}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{borderWidth: 0.2, borderColor: '#dcdcdc'}} />
      </>
    );
  };
  // Footer Component
  const FooterLoader = () => {
    return (
      <>
        <View style={{margin: 10}}></View>
        {userList?.length > 0 && moreData ? (
          <View>
            <ActivityIndicator size={24} color={'#dcdcdc'} />
          </View>
        ) : (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              height: responsiveScreenHeight(4),
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 16,
                color: '#003146',
              }}>
              No More Data found
            </Text>
          </View>
        )}
      </>
    );
  };

  return (
    <>
      {/* User List */}
      {page === 1 && loading ? (
        <View style={[styles.Indicator]}>
          <ActivityIndicator size={26} color={'#fff'} />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{paddingBottom: responsiveScreenHeight(10)}}
          data={filteredUserList}
          keyExtractor={item => item.login?.uuid.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={renderItem}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={selectedCountry == '' && FooterLoader}
          ListEmptyComponent={EmptyPage}
          onEndReached={
            userList?.length > 0 && selectedCountry == '' && moreLoadData
          }
          onEndReachedThreshold={0.1}
        />
      )}
    </>
  );
};
const styles = StyleSheet.create({
  Indicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userFont: {
    fontSize: responsiveScreenHeight(2),
    fontFamily: 'Poppins-Medium',
    color: '#fff',
  },
});

export default UserListScreen;
