import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
} from 'react-native';
import {horizontalScale, moderateScale} from '../../../utils/metrics';

export default function AccountDeleteModal({
  showPopup = false,
  onReqClose = () => null,
  onPressConfirm = () => null,
  showInp = false,
  button1 = '',
  button2 = '',
  title = '',
  subtitle = '',
}: {
  showPopup: boolean;
  showInp?: boolean;
  onReqClose: (() => void) | undefined;
  onPressConfirm?: (() => void) | undefined;
  button1?: string;
  button2: string;
  title: string;
  subtitle: string;
}) {
  return (
    <Modal
      visible={showPopup}
      transparent
      statusBarTranslucent
      animationType="fade"
      onRequestClose={onReqClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalInnerContainer}>
          <Text style={styles.modalHeading}>{title}</Text>
          <Text style={styles.modalSubHeading}>{subtitle}</Text>

          {showInp ? (
            <TextInput
              style={{
                backgroundColor: 'white',
                width: '80%',
                height: 46,
                borderRadius: 5,
                marginTop: 8,
                color: "black"
              }}
            />
          ) : null}

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              marginTop: 19,
              height: 43,
              borderTopWidth: 1,
              borderTopColor: 'rgba(60, 60, 67, 0.36)',
            }}>
            {button1 != '' ? (
              <TouchableOpacity
                onPress={onReqClose}
                style={{
                  width: '50%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontSize: 17, fontWeight: '600', color: '#007AFF'}}>
                  {button1}
                </Text>
              </TouchableOpacity>
            ) : null}
            {button1 != '' ? (
              <View
                style={{
                  width: 1,
                  height: '100%',
                  backgroundColor: 'rgba(60, 60, 67, 0.36)',
                }}
              />
            ) : null}
            <TouchableOpacity
              onPress={onPressConfirm}
              style={{
                width: button1 != '' ? '50%' : '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 17, fontWeight: '600', color: '#007AFF'}}>
                {button2}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalInnerContainer: {
    marginHorizontal: horizontalScale(16),
    // position: 'absolute',
    // bottom: verticalScale(55),
    backgroundColor: '#dedfdf',
    width: horizontalScale(270),
    // height: verticalScale(210),
    borderRadius: moderateScale(14),
    // paddingHorizontal: 16,
    paddingTop: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  modalSubHeading: {
    fontSize: 13,
    fontWeight: '400',
    color: 'black',
    textAlign: 'center',
    marginTop: 2,
    paddingHorizontal: 16,
  },
});
