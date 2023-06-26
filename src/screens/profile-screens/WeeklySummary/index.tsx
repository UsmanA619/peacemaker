import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import WeeklyState from '../../../components/profile/WeeklyStats';
import {
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../../../utils/metrics';

export default function WeeklySummary() {
  const [viewWidth, setViewWidth] = React.useState(0);
  return (
    <View style={{flex: 1, backgroundColor: '#F9FAFA'}}>
      <View style={styles.dailyStateContainer}>
        <WeeklyState />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingLeft: 10,
          }}>
          <View
            onLayout={event =>
              setViewWidth((event.nativeEvent.layout.width / 100) * 5)
            }
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              //  marginLeft: 50,
              maxWidth: 80 * 3 + viewWidth * 3 + 5,
            }}>
            {[
              {name: 'Spiritual', color: '#569099'},
              {name: 'Mental', color: '#4C5980'},
              {name: 'Emotional', color: '#93C572'},
              {name: 'Social', color: '#A4DAD2'},
              {name: 'Physical', color: '#559177'},
            ].map((_, i) => (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 16,
                  marginRight: "5%",
                  width: 80,
                }}>
                <View
                  style={{
                    width: 11,
                    height: 11,
                    borderRadius: 50,
                    backgroundColor: _.color,
                  }}
                />
                <Text style={{fontSize: 13, fontWeight: '500', color: _.color}}>
                  {_.name}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dailyStateContainer: {
    marginTop: verticalScale(10),
    borderRadius: moderateScale(13),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(0),
    backgroundColor: '#ffffff',
    elevation: 1,
    marginHorizontal: 16,
  },
});
