import {useEffect, useState} from 'react';
import {STYLES} from '../../styles/globalStyles';
import {COLORS} from '../../constants/colors';
import CustomButton from '../../components/shared-components/CustomButton';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from '../../interface/types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../utils/metrics';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../../redux/app/hooks';
import {
  setAccessToken,
  setRefreshToken,
  setUserData,
} from '../../redux/features/user/userSlice';
import {ApiService} from '../../utils/ApiService';
import {refreshMyToken} from '../../utils/helpers';

type NavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'CompleteProfile'
>;

type AccountabilityPartnerScreenRouteProp = RouteProp<
  Record<string, {buddies: any}>,
  'AccountabilityPartner'
>;

type Props = {
  route: AccountabilityPartnerScreenRouteProp;
};

const RELATIONSHIPS = [
  {id: 'r1', name: 'family'},
  {id: 'r2', name: 'wife'},
  {id: 'r3', name: 'colleague'},
  {id: 'r5', name: 'brother'},
  {id: 'r6', name: 'friend'},
  {id: 'r4', name: 'other'},
];

const AccountabilityPartners = ({route}: Props) => {
  const {buddies} = route.params;

  // const buddies = [
  //   {
  //     id: '12314',
  //     firstName: 'John',
  //     relationship: 'friend',
  //     isPrimary: false,
  //   },
  //   {
  //     id: '512341',
  //     firstName: 'sam',
  //     relationship: 'friend',
  //     isPrimary: false,
  //   },
  //   {
  //     id: '1241251',
  //     firstName: 'Sam',
  //     relationship: 'friend',
  //     isPrimary: false,
  //   },
  //   {
  //     id: '236236236',
  //     firstName: 'tem',
  //     relationship: 'friend',
  //     isPrimary: false,
  //   },
  // ];
  const [isNetwork, setIsNetwork] = useState(false);
  const [network, setNewwork] = useState<any>({
    id: '',
    firstName: '',
    relationship: '',
    isPrimary: true,
  });
  const [isRelationship, setIsRelationship] = useState(false);
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(state => state.user.tokens.accessToken);
  const userData = useAppSelector(state => state.user.data);
  const refreshToken = useAppSelector(state => state.user.tokens.refreshToken);

  // FUNCTIONS

  const handleNameChange = (data: any) => {
    setNewwork((prevState: any) => ({
      ...prevState,
      id: data.id,
      firstName: data.firstName,
    }));
    setIsNetwork(false);
  };

  const handleRelationChange = (data: any) => {
    setNewwork((prevState: any) => ({
      ...prevState,
      relationship: data,
    }));
    setIsRelationship(false);
  };

  const updateAccountabilityPartner = async () => {
    if (network.id != '' && network.relationship) {
      let tempBuddies: object[] = [];
      buddies.map((buddy: any) => {
        if (buddy.id == network.id) {
          tempBuddies = tempBuddies.concat({
            buddyId: network.id.toString(),
            relationship: network.relationship.toString(),
            isPrimary: true,
            firstName: buddy.firstName,
            lastName: buddy.lastName,
          });
        } else {
          tempBuddies = tempBuddies.concat({
            buddyId: buddy.id.toString(),
            relationship: 'friend',
            isPrimary: false,
            firstName: buddy.firstName,
            lastName: buddy.lastName,
          });
        }
      });
      console.log(
        'buddies',
        buddies,
      );

      try {
        console.log('temp', tempBuddies);
        console.log('userData', userData?.id);
        console.log('userData', userData?.email);
        console.log(
          'accessToken',
          accessToken,
        );
        console.log(
          '🚀 ~ file: AccountabilityPartner.tsx:159 ~ updateAccountabilityPartner ~ ',
          {
            userId: userData?.id,
            accountabilityBuddies: tempBuddies,
          },
        );

        const userUpdate = new ApiService(`users/update`, accessToken);
        const userUpdateRes = await userUpdate.Update({
          userId: userData?.id,
          accountabilityBuddies: tempBuddies,
        });
        console.log("🚀 ~ file: AccountabilityPartner.tsx:165 ~ updateAccountabilityPartner ~ userUpdateRes:", userUpdateRes)


        if (userUpdateRes?.status == 200) {
          dispatch(setUserData(userUpdateRes?.data));
          navigation.navigate('CompleteProfile');
        } else if (userUpdateRes?.statusCode == 401) {
          const newTokens = await refreshMyToken(refreshToken);

          console.log(newTokens);

          if (newTokens.status == 200) {
            dispatch(setAccessToken(newTokens?.data.accessToken));
            dispatch(setRefreshToken(newTokens?.data.refreshToken));
            updateAccountabilityPartner();
          }
        } else {
          Toast.show({
            type: 'error',
            text1: 'Process Failed!',
            text2: 'Please Try Again Later.',
          });
        }
      } catch (error) {
        Toast.show({type: 'error', text1: 'Process Failed!'});
      }
    } else if (network.relationship == '') {
      Toast.show({
        type: 'info',
        text1: 'Accountability Partner Relation Not Selected!',
        text2: 'Please Select Your Relationship.',
      });
    } else if (network.firstName == '') {
      Toast.show({
        type: 'info',
        text1: 'Accountability Partner Name Not Selected!',
        text2: 'Please Select Your Accountability Partner Name',
      });
    } else {
      Toast.show({
        type: 'info',
        text1: 'Accountability Partner Not Selected!',
        text2: 'Please Select Your Accountability Partner',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={[STYLES.dev1__text28, {color: COLORS.neutral900}]}>
          Delegate Primary Accountability Partner{' '}
        </Text>
        <View style={{gap: verticalScale(16), marginTop: verticalScale(28)}}>
          <View style={{position: 'relative'}}>
            <TouchableOpacity
              style={styles.innerContainer}
              onPress={() => setIsNetwork(!isNetwork)}>
              <View style={styles.dropdownContainer}>
                <View>
                  <Text
                    style={[STYLES.dev1__text16, {color: COLORS.neutral100}]}>
                    Name of the Accountability Network{' '}
                  </Text>
                  {network.id == '' ? (
                    ''
                  ) : (
                    <Text
                      style={[
                        STYLES.dev1__text14,
                        {fontWeight: '500', color: COLORS.neutral700},
                      ]}>
                      {network.firstName}
                    </Text>
                  )}
                </View>
              </View>
              <Image
                source={require('../../../assets/icons/chevron.png')}
                alt="icon"
                style={{marginRight: horizontalScale(10)}}
              />
            </TouchableOpacity>
            {isNetwork && (
              <View
                style={{
                  backgroundColor: '#ffffff',
                  elevation: 3,
                  borderRadius: 8,
                  padding: 12,
                  marginTop: verticalScale(1),
                  position: 'absolute',
                  width: '100%',
                  top:
                    network.length > 0 ? verticalScale(70) : verticalScale(52),
                  zIndex: 2,
                }}>
                {buddies.map((buddy: any) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        position: 'relative',
                        paddingVertical: verticalScale(2),
                      }}
                      key={buddy.id}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            STYLES.dev1__text16,
                            {
                              fontWeight: '400',
                              color: '#000000',
                              paddingVertical: verticalScale(8),
                              width: '90%',
                              fontFamily: 'GeneralSans-Medium',
                            },
                          ]}
                          onPress={() => {
                            handleNameChange(buddy);
                          }}>
                          {buddy.firstName}
                        </Text>
                        {network.firstName == buddy.firstName && (
                          <Icon
                            name="check"
                            color={'#8EB26F'}
                            size={moderateScale(20)}
                            style={{marginRight: horizontalScale(8)}}
                          />
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>

          <View style={{position: 'relative', zIndex: -1}}>
            <TouchableOpacity
              style={styles.innerContainer}
              onPress={() => setIsRelationship(!isRelationship)}>
              <View style={styles.dropdownContainer}>
                <Text style={[STYLES.dev1__text16, {color: COLORS.neutral100}]}>
                  {network.relationship == ''
                    ? 'What is your relationship with'
                    : network.relationship}
                </Text>
                <Image
                  source={require('../../../assets/icons/chevron.png')}
                  alt="icon"
                />
              </View>
            </TouchableOpacity>
            {isRelationship && (
              <View
                style={{
                  backgroundColor: '#ffffff',
                  elevation: 3,
                  borderRadius: 8,
                  padding: 12,
                  marginTop: verticalScale(1),
                }}>
                {RELATIONSHIPS.map((relation: any) => {
                  return (
                    <View
                      style={{
                        flexDirection: 'column',
                        position: 'relative',
                        paddingVertical: verticalScale(2),
                      }}
                      key={relation.id}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <Text
                          style={[
                            STYLES.dev1__text16,
                            {
                              fontWeight: '400',
                              color: '#000000',
                              paddingVertical: verticalScale(8),
                              width: '90%',
                              fontFamily: 'GeneralSans-Medium',
                            },
                          ]}
                          onPress={() => {
                            handleRelationChange(relation.name);
                          }}>
                          {relation.name}
                        </Text>
                        {network.relationship == relation.name && (
                          <Icon
                            name="check"
                            color={'#8EB26F'}
                            size={moderateScale(20)}
                            style={{marginRight: horizontalScale(8)}}
                          />
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </View>
      <CustomButton onPress={updateAccountabilityPartner}>Save</CustomButton>
    </View>
  );
};

export default AccountabilityPartners;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(20),
    backgroundColor: '#F9FAFA',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    gap: horizontalScale(4),
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(16),
    borderRadius: moderateScale(8),
    elevation: 2,
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingRight: horizontalScale(10),
  },
});
