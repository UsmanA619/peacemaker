import {useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import SegmentedControl from '../../components/SegmentedControl';
import {COLORS} from '../../constants/colors';
import ChatItem from '../../components/Chat/ChatItem';
import DeleteAction from '../../components/Chat/ChatDeleteAction';
import DeleteModal from '../../components/shared-components/CustomModal';
import navigation from '../../utils/appNavigation';

const ChatScreen = () => {
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);

  const toggleDeleteModal = () => setDeleteModalVisible(!deleteModalVisible);

  const navigateToMessages = (
    group = 0,
    title = 'Stephen Carl',
    provider = 0,
  ) =>
    navigation.navigate('ChatMessagesScreen', {
      group: group,
      title: title,
      provider: provider,
    });

  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <SegmentedControl
        tabs={['Accountablity', 'Providers']}
        currentIndex={tabIndex}
        onChange={handleTabsChange}
        segmentedControlBackgroundColor={COLORS.neutral200}
        activeSegmentBackgroundColor={COLORS.mainGreen}
        activeTextColor="white"
        textColor={COLORS.neutral700}
        paddingVertical={10}
      />

      <View
        style={{
          flex: 1,
        }}>
        {tabIndex === 0 ? (
          <>
            <ChatItem
              onPress={() =>
                navigateToMessages(undefined, 'Thomas Edison', undefined)
              }
              isActive
              title="Stephen Carl"
              time="9:36 AM"
              text="Nice. I dont know why people get all worked up about hawaiian
            pizza. I know why people"
              renderRightActions={() => (
                <DeleteAction onPress={toggleDeleteModal} />
              )}
            />
            <ChatItem
              onPress={() => navigateToMessages(1, 'Kyle and Aaron')}
              group
              title="Stephen Carl"
              time="9:36 AM"
              text="Nice. I dont know why people get all worked up about hawaiian
            pizza. I know why people"
              renderRightActions={() => (
                <DeleteAction onPress={toggleDeleteModal} />
              )}
            />
          </>
        ) : (
          <ChatItem
            onPress={() => navigateToMessages(undefined, 'Thomas Edison', 1)}
            isActive
            title="Thomas edison"
            time="9:36 AM"
            text="Nice. I dont know why people get all worked up about hawaiian
        pizza. I know why people"
            renderRightActions={() => (
              <DeleteAction onPress={toggleDeleteModal} />
            )}
          />
        )}
      </View>

      <DeleteModal visible={deleteModalVisible} close={toggleDeleteModal} title='Delete?' description='Are you sure you want to
 delete this conversation?' icon='x' color='#FD003A'  btnBgColor='#FD003A'/>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
