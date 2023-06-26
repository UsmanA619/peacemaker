import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';
import ProfileItem from '../../../components/profile/ProfileItem';
import ProfileImg from '../../../components/profile/ProfileImg';
import Navigation from '../../../utils/appNavigation';
import {STYLES} from '../../../styles/globalStyles';
import {COLORS} from '../../../constants/colors';
import AccountDeleteModal from '../../../components/profile/AccountDeleteModal';

export default function ProfileSettings() {
  const [showPopup1, setShowPopup1] = React.useState<boolean>(false);
  const [showPopup2, setShowPopup2] = React.useState<boolean>(false);
  const [showPopup3, setShowPopup3] = React.useState<boolean>(false);
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#f9fafa'}}>
      <View
        style={{flex: 1, backgroundColor: '#F9FAFA', paddingHorizontal: 16}}>
        <View style={styles.box1}>
          <View style={styles.box1NameInfo}>
            <Text style={styles.box1NameInfoTitle}>Akiza Kei</Text>
            <Text style={styles.box1NameInfoSubtitle}>Personal account</Text>
          </View>
          <ProfileImg />
        </View>
        <Text style={styles.sectionLabel}>Profile</Text>
        <ProfileItem
          onPress={() => Navigation.navigate('AccountDetails')}
          imgSize={29}
          img={require('../../../../assets/icons/user.png')}
          text="Account details"
        />
        <View style={{height: 17}} />
        <Text style={styles.sectionLabel}>Security</Text>
        <ProfileItem
          onPress={() => Navigation.navigate('ChangePassword')}
          img={require('../../../../assets/icons/shield.png')}
          text="Change Password"
        />
        <ProfileItem
          showToggle
          imgSize={20}
          img={require('../../../../assets/icons/SmilingFace.png')}
          text="Face Id"
        />
        <View style={{height: 17}} />
        <Text style={styles.sectionLabel}>Legal</Text>
        <ProfileItem
          onPress={() => Navigation.navigate('PrivacyPolicy')}
          imgSize={22}
          img={require('../../../../assets/icons/Vector.png')}
          text="Privacy Policy"
          />
        <ProfileItem
          onPress={() => Navigation.navigate('Support')}
          imgSize={23}
          img={require('../../../../assets/icons/question.png')}
          text="Help and Support"
        />
        <ProfileItem
          onPress={() => Navigation.navigate('TermAndConditions')}
          imgSize={20}
          img={require('../../../../assets/icons/bill.png')}
          text="Terms and Conditions"
        />
        <View style={{height: 17}} />
        <ProfileItem
          imgSize={20}
          img={require('../../../../assets/icons/logout.png')}
          text="Log out"
        />
        <ProfileItem
          onPress={() => setShowPopup1(true)}
          imgSize={20}
          img={require('../../../../assets/icons/close.png')}
          text="Delete account"
        />

        {showPopup1 || showPopup2 || showPopup3 ? (
          <BlurView
            style={styles.absolute}
            blurType="light"
            blurAmount={1}
            reducedTransparencyFallbackColor="white"
          />
        ) : null}

        <AccountDeleteModal
          onReqClose={() => setShowPopup1(false)}
          onPressConfirm={() => {
            setShowPopup1(false);
            setShowPopup2(true);
          }}
          showPopup={showPopup1}
          button1="Cancel"
          button2="Confirm"
          title="Are you sure you want to close your account?"
          subtitle="Once you close your account you will not be able to retrieve it anymore."
        />

        <AccountDeleteModal
          showInp
          onReqClose={() => setShowPopup2(false)}
          onPressConfirm={() => {
            setShowPopup2(false);
            setShowPopup3(true);
          }}
          showPopup={showPopup2}
          button1="Cancel"
          button2="Confirm"
          title="Confirmation"
          subtitle="Please enter the word “DELETE” before we delete your account."
        />

        <AccountDeleteModal
          onReqClose={() => setShowPopup3(false)}
          onPressConfirm={() => setShowPopup3(false)}
          showPopup={showPopup3}
          button2="Done"
          title="Account deleted"
          subtitle="Your account has been deleted successfully."
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    height: verticalScale(55),
    marginTop: 10,
    marginBottom: 20,
  },
  box1NameInfo: {height: '100%', flex: 1},
  box1NameInfoTitle: {
    fontSize: moderateScale(28),
    fontWeight: '700',
    color: '#15141F',
  },
  box1NameInfoSubtitle: {
    fontSize: moderateScale(13),
    fontWeight: '500',
    color: '#576B74',
    marginTop: 2,
  },
  box1ImageBox: {
    width: 43,
    height: 43,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAF3E2',
  },
  box1Image: {width: horizontalScale(25), height: verticalScale(25)},
  dailyStateContainer: {
    marginTop: verticalScale(16),
    borderRadius: moderateScale(13),
    paddingVertical: verticalScale(18),
    paddingHorizontal: horizontalScale(8),
    backgroundColor: '#ffffff',
    elevation: 1,
  },
  sectionLabel: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: '#0C212C',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
