import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {RulerPicker} from 'react-native-ruler-picker';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {COLORS} from '../../constants/colors';

const HorizontalMeter = () => {
  const [value, setValue] = useState(0);
  const [counter, setCounter] = useState(
    Array.from({length: 101}, (_, index) => index),
  );

  const onValueChanged = (number: string) => {
    setValue(parseInt(number, 10));
  };

  useEffect(() => {
    setValue(40);
  }, []);

  return (
    <>
      <View
        style={{
          paddingHorizontal: horizontalScale(20),
          marginTop: verticalScale(60),
          marginBottom: verticalScale(20)
        }}>
        <RulerPicker
          min={0}
          max={100}
          step={1}
          height={100}
          fractionDigits={0}
          indicatorColor={COLORS.mainGreen}
          shortStepColor="rgba(142, 178, 111, 0.6)"
          longStepColor={COLORS.mainGreen}
          stepWidth={2}
          onValueChange={onValueChanged}
          onValueChangeEnd={(number: string) => console.log(number)}
          unit=""
          width={330}
          decelerationRate="fast"
        />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.container}>
          {counter.map(value => {
            return (
              <Text style={styles.valueText}>{value % 5 == 0 && value}</Text>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginTop: -20,
  },
  valueText: {},
});

export default HorizontalMeter;
