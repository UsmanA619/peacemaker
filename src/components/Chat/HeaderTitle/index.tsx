import {Image, Text, View, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import navigation from '../../../utils/appNavigation';
import {COLORS} from '../../../constants/colors';
import placeholderImg from '../../../constants/extras';

export const chatHeaderTitle = (route: any) => {
  if (route.params?.group == 1) {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate('GroupInfo', {title: route.params?.title})
        }>
        <View style={{alignItems: 'center'}}>
          <View style={{position: 'relative', width: 45, height: 45}}>
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#f9fafa',
                position: 'absolute',
                top: 2,
                left: 0,
              }}
              source={placeholderImg}
            />
            <Image
              style={{
                width: 30,
                height: 30,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#f9fafa',
                position: 'absolute',
                bottom: 2,
                right: 0,
              }}
              source={placeholderImg}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              lineHeight: 21,
              color: 'black',
            }}>
            {route.params?.title}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        navigation.navigate(
          route.params?.provider === 1 ? 'ProviderInfo' : 'ChatInfo',
          {title: route.params?.title},
        )
      }>
      <View style={{alignItems: 'center'}}>
        <Image
          style={{width: 43, height: 43, borderRadius: 50}}
          source={placeholderImg}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 5,
            marginBottom: 5,
          }}>
          <Text
            style={{
              fontSize: 13,
              fontWeight: '500',
              lineHeight: 21,
              color: 'black',
            }}>
            {route.params?.title}
          </Text>
          {route.params?.provider === 1 ? (
            <View
              style={{
                width: 18,
                height: 18,
                backgroundColor: COLORS.mainGreen,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Icon name="check" size={12} color="#fff" />
            </View>
          ) : null}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
