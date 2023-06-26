import React from 'react';
import {View, Text} from 'react-native';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
  VictoryGroup,
} from 'victory-native';
import {STYLES} from '../../../styles/globalStyles';
import {horizontalScale, verticalScale} from '../../../utils/metrics';
import {COLORS} from '../../../constants/colors';

const data = [
  {state: 1, value: 20},
  {state: 2, value: 20},
  {state: 3, value: 20},
  {state: 4, value: 20},
  {state: 5, value: 20}, 
  {state: 6, value: 20}, 
  {state: 7, value: 20}, 
];
const data1 = [
  {state: 1, value: 5},
  {state: 2, value: 5},
  {state: 3, value: 30},
  {state: 4, value: 40},
  {state: 5, value: 5}, 
  {state: 6, value: 30}, 
  {state: 7, value: 40}, 
];

const data2 = [
  {state: 1, value: 10},
  {state: 2, value: 10},
  {state: 3, value: 10},
  {state: 4, value: 50},
  {state: 5, value: 10}, 
  {state: 6, value: 10}, 
  {state: 7, value: 50}, 
];

const data3 = [
  {state: 1, value: 3},
  {state: 2, value: 26},
  {state: 3, value: 26},
  {state: 4, value: 26},
  {state: 5, value: 26}, 
  {state: 6, value: 26}, 
  {state: 7, value: 26}, 
];

const data4 = [
  {state: 1, value: 20},
  {state: 2, value: 20},
  {state: 3, value: 20},
  {state: 4, value: 20},
  {state: 5, value: 20}, 
  {state: 6, value: 20}, 
  {state: 7, value: 20}, 
];


const WeeklyState = () => {
  return (
    <View>
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
          tickValues={[1, 2, 3, 4, 5, 6, 7]}
          tickFormat={[
            'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'
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
              fill: '#8EB26F',
            },
          }}
        />
        <VictoryGroup offset={5}>
            <VictoryBar
              data={data}
              x="state"
              y="value"
              barWidth={5}
              style={{
                data: {fill: '#569099'},
              }}
            />
            <VictoryBar
              data={data1}
              x="state"
              y="value"
              barWidth={5}
              style={{
                data: {fill: '#4C5980'},
              }}
            />
            <VictoryBar
              data={data2}
              x="state"
              y="value"
              barWidth={5}
              style={{
                data: {fill: '#93C572'},
              }}
            />
            <VictoryBar
              data={data3}
              x="state"
              y="value"
              barWidth={5}
              style={{
                data: {fill: '#A4DAD2'},
              }}
            />
            <VictoryBar
              data={data4}
              x="state"
              y="value"
              barWidth={5}
              style={{
                data: {fill: '#559177'},
              }}
            />
        </VictoryGroup>
      </VictoryChart>
    </View>
  );
};

export default WeeklyState;
