import React from 'react';
import {View, FlatList} from 'react-native';

import SegmentedControl from '../../../components/SegmentedControl';
import {COLORS} from '../../../constants/colors';
import SearchProfile from '../../../components/profile/Search';
import AccountabilityList from '../../../components/profile/AccList';

const data = ['Dee McRobie', 'Gary Butcher', 'Zach Friedman', 'Dee McRobie'];

export default function AccountablityNetwork() {
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const [listData, setListData] = React.useState(data);

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const searchText = (txt: string) => {
    const filteredData = data.filter(data =>
      data.toLowerCase().includes(txt.toLowerCase()),
    );
    setListData(filteredData);
  };

  return (
    <View style={{backgroundColor: '#F9FAFA', flex: 1}}>
      <SegmentedControl
        tabs={['Find Accountability', ' My Peace Maker']}
        currentIndex={tabIndex}
        onChange={handleTabsChange}
        segmentedControlBackgroundColor={COLORS.neutral200}
        activeSegmentBackgroundColor={COLORS.mainGreen}
        activeTextColor="white"
        textColor={COLORS.neutral700}
        paddingVertical={10}
      />

      <SearchProfile onChange={searchText} />

      <View style={{height: 16}} />

      <FlatList
        data={listData}
        renderItem={({item, index}) => (
          <AccountabilityList
            name={item}
            peaceBox={tabIndex && index === 1 ? true : false}
            btnTxt={tabIndex ? 'Remove' : 'Add'}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}
