import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  fontWeight?: string;
  title: string;
  color?: string;
  icon?: boolean;
  iconName?: string;
  onPress?: () => void;
  view?: boolean;
  img?: string;
}

interface ContainerProps {
  children: any;
  style: any;
  onPress?: () => void;
  view: boolean;
}

function Container({children, style, view, onPress}: ContainerProps) {
  if (view) return <View style={style}>{children}</View>;
  return (
    <TouchableOpacity onPress={onPress} style={style}>
      {children}
    </TouchableOpacity>
  );
}

export default function MediaItem({
  title,
  color = '#7b8d95',
  onPress = () => null,
  icon = false,
  iconName = 'arrow-forward-ios',
  view = false,
  fontWeight = '400',
  img = '',
}: Props) {
  return (
    <Container
      view={view}
      onPress={onPress}
      style={[
        styles.container,
        {
          borderBottomWidth: img !== '' ? 1: 0,
          borderBottomColor: '#EDEDED',
          width: img !== '' ? '100%' : '90%',
          marginTop: img !== '' ? 0 : 16,
        },
      ]}>
      {img !== '' ? (
        <Image
          style={styles.img}
          source={img}
        />
      ) : null}
      <Text
        style={[
          styles.text,
          {
            color: color,
            fontWeight: fontWeight,
            marginHorizontal: img !== '' ? 10 : 21,
          },
        ]}>
        {title}
      </Text>
      {icon ? (
        <Icon
          style={{marginRight: 16}}
          name={iconName}
          color="#2791B5"
          size={18}
        />
      ) : null}
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16.5,
    lineHeight: 18,
    letterSpacing: -0.08,
    flex: 1,
  },
  img: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#f9fafa',
    marginLeft: 21,
  },
});
