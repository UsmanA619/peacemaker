import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
} from 'victory-native';
import {STYLES} from '../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../utils/metrics';
import {COLORS} from '../../constants/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {TouchableOpacity} from 'react-native';
import Navigation from '../../utils/appNavigation';

const data = [
  {state: 1, value: 40}, // do -10 from value 50
  {state: 2, value: 20}, // do -10 from value 30
  {state: 3, value: 30}, // do -10 from value 40
  {state: 4, value: 20}, // do -10 from value 30
  {state: 5, value: 20}, // do -10 from value 30
];

const dataCicles = [
  {
    x: 1,
    y: 40 + 4, // add 4 to upper value
    symbol: 'circle',
    fill: 'blue',
  },
  {
    x: 2,
    y: 20 + 4, // add 4 to upper value
    symbol: 'circle',
    fill: 'red',
  },
  {x: 3, y: 30 + 4, symbol: 'circle', fill: 'gold'},
  {x: 4, y: 20 + 4, symbol: 'circle', fill: 'green'},
  {x: 5, y: 20 + 4, symbol: 'circle', fill: 'green'},
];

const colorScale = ['#569099', '#4C5980', '#93C572', '#A4DAD2', '#559177'];

const DailyState = ({isDrpDwn = false}: {isDrpDwn?: boolean}) => {
  const [isFocus, setIsFocus] = React.useState(false);
  return (
    <View style={{flexDirection: 'column-reverse'}}>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={horizontalScale(370)}
        height={verticalScale(420)}
        padding={{
          bottom: verticalScale(59),
          top: verticalScale(3),
          left: horizontalScale(50),
          right: horizontalScale(60),
        }}>
        <VictoryAxis
          tickValues={[1, 2, 3, 4, 5]}
          tickFormat={[
            'Spiritual',
            'Mental',
            'Emotional',
            'Social',
            'Physical',
          ]}
          style={{
            axis: {stroke: 'none'},
            ticks: {stroke: 'none'},
            grid: {
              stroke: 'none',
              strokeDasharray: 'none',
            },
            tickLabels: {
              fill: COLORS.primary400,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          tickFormat={x => `${x}%`}
          style={{
            axis: {stroke: 'none'},
            ticks: {stroke: 'none'},
            grid: {
              stroke: '#EDEDED',
              strokeWidth: '2',
              strokeDasharray: 'none',
            },
            tickLabels: {
              fill: '#D6D6D6',
            },
          }}
        />
        <VictoryBar
          data={data}
          x="state"
          y="value"
          barWidth={25}
          style={{
            data: {fill: ({index}: any) => colorScale[index]},
          }}
        />
        <VictoryScatter
          size={20}
          data={dataCicles}
          style={{
            data: {
              fill: ({index}: any) => colorScale[index],
              // opacity: 0.5,
            },
          }}
        />
        <VictoryScatter
          size={13}
          data={dataCicles}
          style={{
            data: {
              fill: '#FFFFFF',
              // opacity: 0.5,
            },
          }}
        />
      </VictoryChart>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 16,
        }}>
        <Text
          style={[
            STYLES.dev1__text15,
            {
              fontWeight: '100',
              color: COLORS.mainGreen,
              paddingHorizontal: horizontalScale(10),
              fontFamily: 'Satoshi-Bold',
            },
          ]}>
          DAILY STATE
        </Text>

        {isDrpDwn ? (
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsFocus(!isFocus)}>
              <Entypo
                style={styles.icon}
                color="#2B6173"
                name="dots-three-horizontal"
                size={25}
              />
            </TouchableOpacity>

            {isFocus ? (
              <TouchableOpacity
                onPress={() => {
                  Navigation.navigate('ProfileDSDetailedView');
                  setIsFocus(!isFocus);
                }}
                style={styles.seeProgressBtn}>
                <Text style={styles.seeProgressTxt}>See Progress</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'flex-end',
  },
  seeProgressBtn: {
    width: 100,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#f4f4f4',
    position: 'absolute',
    bottom: -36,
    backgroundColor: 'white',
    zIndex: 999,
  },
  seeProgressTxt: {
    fontSize: 12,
    fontWeight: '500',
    color: 'rgba(12, 33, 44, 0.5)',
  },
  dropdown: {
    height: 26,
    // width: 32,
    borderColor: 'red',
    borderWidth: 0.5,
    paddingHorizontal: 8,
    flexGrow: 0,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default DailyState;
