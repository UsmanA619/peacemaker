import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import NoBuddies from '../../components/accountability/NoBuddies';
import {STYLES} from '../../styles/globalStyles';
import ScreenTitle from '../../components/shared-components/ScreenTitle';
import BuddiesList from '../../components/accountability/BuddiesList';
import {LIST} from '../../constants/AccountabilityUserData';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import {useEffect, useState, useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {ApiService} from '../../utils/ApiService';
import {useNavigation} from '@react-navigation/native';
import {COLORS} from '../../constants/colors';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../interface/types';
import {refreshMyToken} from '../../utils/helpers';
import {useAppDispatch, useAppSelector} from '../../redux/app/hooks';
import {
  setAccessToken,
  setRefreshToken,
} from '../../redux/features/user/userSlice';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const AccountabilityBuddies = ({setMinDataSelected}: any) => {
  const navgation = useNavigation<NavigationProp>();
  const [list, setList] = useState<any[]>();
  const [list2, setList2] = useState<any[]>();
  const [buddies, setBuddies] = useState<any[]>([]);
  const accessToken = useAppSelector(state => state.user.tokens.accessToken);
  const refreshToken = useAppSelector(state => state.user.tokens.refreshToken);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState<number>(20);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  // let arr: any = [];

  const searchUser = (text: string) => {
    // setIsSearch(true);

    if (!text) {
      setList(list2);
      // setIsSearch(false);
      return;
    }

    const textToSearch = text.toLowerCase();

    // const temp = list2?.slice(0, list?.length);
    const temp = [...list2];

    const filteredusers = temp.filter(user =>
      user.firstName.toLowerCase().includes(textToSearch),
    );

    setList(filteredusers);
  };

  const searchUsers = async (search: string) => {
    try {
      const userSearch = new ApiService(`users/buddy`, accessToken);
      const userSearchRes = await userSearch.GetById(`?search=${search}`);

      let users: any[] = [];

      if (userSearchRes?.status == 200) {
        // setList(userSearchRes?.data?.users?.slice(0, currentItems));
        setList(userSearchRes?.data?.users);
        setList2(userSearchRes?.data?.users);
        // users = users.concat(userSearchRes?.data?.users);
      } else if (userSearchRes?.statusCode == 401) {
        const newTokens = await refreshMyToken(refreshToken);

        if (newTokens.status == 200) {
          dispatch(setAccessToken(newTokens?.data.accessToken));
          dispatch(setRefreshToken(newTokens?.data.refreshToken));
          searchUsers(search);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Unable To Register!',
          text2: 'Please Try Again Later.',
        });
      }
      // setList(users);
    } catch (error) {
      Toast.show({type: 'error', text1: 'Process Failed!'});
    }
  };

  // const handleDataPress = (user: any) => {
  //   if (buddies.includes(user)) {
  //     // alert('removing');
  //     arr = buddies.filter((existingUser: any) => existingUser.id != user.id);
  //   } else if (buddies.length < 4) {
  //     // alert('adding');
  //     arr = [...arr, user];
  //     // arr = buddies.concat(user);
  //   } else {
  //     arr = arr.concat(buddies);
  //     Toast.show({
  //       type: 'info',
  //       text1: 'Unable To Add',
  //       text2: 'Maximum 4 Allowed!',
  //     });
  //   }
  //   setBuddies(arr);
  // };

  const handleDataPress = (user: any) => {
    if (buddies.includes(user)) {
      setBuddies(() =>
        buddies.filter((existingUser: any) => existingUser.id != user.id),
      );
    } else if (buddies.length < 4) {
      let arr = [...buddies];
      arr.push(user);
      setBuddies(arr);
    } else {
      Toast.show({
        type: 'info',
        text1: 'Unable To Add',
        text2: 'Maximum 4 Allowed!',
      });
    }
    // setBuddies(arr);
  };

  const buddyList = (user: any) => {
    const isBuddy = buddies?.includes(user.item);
    return (
      <BuddiesList
        User={user.item}
        handleDataPress={handleDataPress}
        // buddiesList={buddies}
        buddiesList={[]}
        isBuddy={isBuddy}
      />
    );
  };

  const updateBuddies = async () => {
    // console.log("🚀 ~ file: AccountabilityBuddies.tsx:162 ~ updateBuddies ~ buddies:", buddies)
    navgation.navigate('AccountabilityPartner', {
      buddies,
    });

    // try {
    //   const register = new ApiService('users/signup', '');
    //   const response = await register.unsecuredPost(values);
    //   console.log(response);

    //   if (response?.status == 201) {
    //     dispatch(setUserData(response?.result));
    //     dispatch(setAuthenticated(true));
    //     dispatch(setAccessToken(response?.tokens.accessToken));
    //     dispatch(setRefreshToken(response?.tokens.refreshToken));
    //     Toast.show({
    //       type: 'success',
    //       text1: 'Successfully Registered!',
    //       text2: 'Your Account Has Been Created. Login To Your Account.',
    //     });
    //     navigation.navigate('AccountabilityBuddies');
    //   } else if (response?.status == 409) {
    //     Toast.show({type: 'info', text1: 'User Already Registered!'});
    //   } else {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Oops! An error occurred during sign-up!',
    //       text2: 'Please Try Again Later.',
    //     });
    //   }
    // } catch (error) {
    //   console.log(error);
    //   Toast.show({type: 'error', text1: 'Unable To Register!'});
    // }
  };

  useEffect(() => {
    searchUsers('');
    return () => {};
  }, []);

  useEffect(() => {
    if (buddies.length >= 2) {
      setMinDataSelected(true);
    } else {
      setMinDataSelected(false);
    }
  }, [buddies, list]);

  useEffect(() => {
    navgation.setOptions({
      headerRight: () => (
        <>
          {list && list?.length > 0 ? (
            <TouchableOpacity onPress={updateBuddies}>
              <Text
                style={{
                  color:
                    buddies?.length < 2 ? COLORS.neutral200 : COLORS.mainGreen,
                }}>
                Done
              </Text>
            </TouchableOpacity>
          ) : (
            <Text
              style={{
                color: COLORS.neutral200,
              }}>
              Skip
            </Text>
          )}
        </>
      ),
    });
  }, [buddies, list]);

  const loadMore = () => {
    const temp = list2?.slice(currentItems, currentItems + 20); // 20, 20+20 = 40,,, 40, 40+20 = 60
    const arr = [...list, ...temp];

    setList(arr);

    console.log('Load', currentItems + 20);

    setCurrentItems(currentItems + 20); // 20+ 20 = 40,,,

    setLoadMoreLoading(false);
  };

  const handleLoadMore = useCallback(() => {
    if (isSearch) return;
    if (!onEndReachedCalledDuringMomentum) {
      setLoadMoreLoading(true);

      loadMore();

      setOnEndReachedCalledDuringMomentum(true);
    }
  }, [onEndReachedCalledDuringMomentum]);

  const renderFooter = useCallback(() => {
    return (
      <View style={{alignItems: 'center', margin: 10}}>
        {loadMoreLoading ? (
          <ActivityIndicator color={COLORS.mainGreen} size="large" />
        ) : null}
      </View>
    );
  }, [loadMoreLoading]);

  return (
    <View style={STYLES.dev1__container}>
      <ScreenTitle
        title="Connect with your accountability buddies"
        description="Choose at least two to continue.."
      />
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search"
          style={styles.input}
          placeholderTextColor={'rgba(60, 60, 67, 0.6);'}
          onChangeText={data => searchUser(data)}
          // onPressIn={() => setIsSearch(true)}
        />
        <Image
          source={require('../../../assets/icons/magnifyingglass.png')}
          alt="icon"
          style={styles.searchIcon}
        />
        <Image
          source={require('../../../assets/icons/microphone.png')}
          alt="icon"
          style={styles.micIcon}
        />
      </View>
      {list ? (
        <>
          {list?.length > 0 ? (
            <FlatList
              data={list}
              keyExtractor={item => item.id}
              // onMomentumScrollBegin={() => {
              //   setOnEndReachedCalledDuringMomentum(false);
              // }}
              // onEndReached={handleLoadMore}
              // onEndReachedThreshold={0.5}
              // ListFooterComponent={renderFooter}
              renderItem={userData => buddyList(userData)}
            />
          ) : (
            <NoBuddies />
          )}
        </>
      ) : (
        <ActivityIndicator color={'black'} size={'large'} />
      )}
    </View>
  );
};

export default AccountabilityBuddies;

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: verticalScale(28),
    paddingHorizontal: horizontalScale(33),
    borderRadius: moderateScale(10),

    backgroundColor: 'rgba(118, 118, 128, 0.12)',
    position: 'relative',
    marginBottom: horizontalScale(8),
  },
  input: {
    color: 'black',
    fontSize: moderateScale(17),
  },
  searchIcon: {
    // width: horizontalScale(16),
    position: 'absolute',
    top: verticalScale(18),
    left: horizontalScale(10),
  },
  micIcon: {
    // width: horizontalScale(12),
    position: 'absolute',
    top: verticalScale(16),
    right: horizontalScale(10),
  },
});
