import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import navigation from '../../../../utils/appNavigation';

export const chatHeaderRight = (route: any) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CallingScreen', {isGroup: route.params?.group})
      }>
      <Icon name="video" size={21} color="#2791B5" />
    </TouchableOpacity>
  );
};
