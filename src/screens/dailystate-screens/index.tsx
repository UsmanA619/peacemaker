import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {STYLES} from '../../styles/globalStyles';
import StateCard from '../../components/daily-state/StateCard';
import {COLORS} from '../../constants/colors';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';
const spiritual = require('../../../assets/images/daily-state-images/amico5.png');
const spiritualUri = Image.resolveAssetSource(spiritual).uri;
const mental = require('../../../assets/images/daily-state-images/amico3.png');
const mentalUri = Image.resolveAssetSource(mental).uri;
const social = require('../../../assets/images/daily-state-images/amico4.png');
const socialUri = Image.resolveAssetSource(social).uri;
const emotional = require('../../../assets/images/daily-state-images/amico2.png');
const emotionalUri = Image.resolveAssetSource(emotional).uri;
const physical = require('../../../assets/images/daily-state-images/amico.png');
const physicalUri = Image.resolveAssetSource(physical).uri;



const DailyStateScreen = ({navigation}: any) => {
  return (
    <ScrollView>
      {/* <View>
        <View
          style={{
            height: verticalScale(70),
            flexDirection: 'row',
            paddingHorizontal: horizontalScale(20),
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 9999,
            backgroundColor: '#fff',
            elevation: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back-outline"
              size={24}
              color={COLORS.primary400}
            />
          </TouchableOpacity>
          <Text
            style={[
              STYLES.dev1__text16,
              {color: COLORS.neutral900, fontFamily: 'GeneraLSans-Regular'},
            ]}>
            Daily State{' '}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('BeNotifiedScreen')}>
            <Icon name="alarm-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={[
            STYLES.dev1__homeContainer,
            {
              flexDirection: 'row',
              gap: 10,
              flexWrap: 'wrap',
              marginTop: verticalScale(70),
            },
          ]}>
          <StateCard
            bgColor={COLORS.blue}
            name="SPIRITUAL"
            imageurl={spiritualUri}
            percentage={25}
            lastUpdateTime="30 min"
          />
          <StateCard
            bgColor="#4C5980"
            name="MENTAL"
            imageurl={mentalUri}
            percentage={26}
            lastUpdateTime="30 min"
          />
          <StateCard
            bgColor="#A4DAD2"
            name="SOCIAL"
            imageurl={socialUri}
            percentage={26}
            lastUpdateTime="30 min"
          />
          <StateCard
            bgColor="#93C572"
            name="EMOTIONAL"
            imageurl={emotionalUri}
            percentage={26}
            lastUpdateTime="30 min"
          />
          <StateCard
            bgColor="#559177"
            name="PHYSICAL"
            imageurl={physicalUri}
            percentage={26}
            lastUpdateTime="30 min"
          />
        </View>
      </View> */}
    </ScrollView>
  );
};

export default DailyStateScreen;
