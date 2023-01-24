import React from 'react';
import EntypoIcons from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import IoniconsIcons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
// import {CustomIcon} from './customIcon';
import Colors from '../theme/Colors';

interface IVectorIcon {
  iconName: string;
  iconType: string;
  color: string;
  size: number;
  [key: string]: any;
}

export enum ICON_TYPES {
  AntDesign = 'AntDesign',
  Ionicons = 'Ionicons',
  FontAwesome = 'FontAwesome',
  Fontisto = 'Fontisto',
  FontAwesome5 = 'FontAwesome5',
  SimpleLineIcons = 'SimpleLineIcons',
  MaterialIcons = 'MaterialIcons',
  MaterialCommunityIcons = 'MaterialCommunityIcons',
  Entypo = 'Entypo',
  EvilIcons = 'EvilIcons',
  FeatherIcons = 'FeatherIcons',
  Octicons = 'Octicons',
  Custom = 'custom',
}

const VectorIcon = (props: IVectorIcon): JSX.Element => {
  const {
    iconName,
    iconType = ICON_TYPES.Custom,
    color = Colors.black,
    size = 10,
    ...restProps
  } = props;
  switch (iconType) {
    case ICON_TYPES.AntDesign:
      return (
        <AntDesign name={iconName} color={color} size={size} {...restProps} />
      );
    case ICON_TYPES.Ionicons:
      return (
        <IoniconsIcons
          name={iconName}
          color={color}
          size={size}
          {...restProps}
        />
      );
    case ICON_TYPES.FontAwesome:
      return (
        <FontAwesomeIcons
          name={iconName}
          color={color}
          size={size}
          {...restProps}
        />
      );
    case ICON_TYPES.FontAwesome5:
      return (
        <FontAwesome5Icons
          name={iconName}
          color={color}
          size={size}
          {...restProps}
        />
      );
    case ICON_TYPES.Fontisto:
      return (
        <Fontisto name={iconName} color={color} size={size} {...restProps} />
      );
    case ICON_TYPES.SimpleLineIcons:
      return (
        <SimpleLineIcons
          name={iconName}
          color={color}
          size={size}
          {...restProps}
        />
      );
    case ICON_TYPES.MaterialIcons:
      return (
        <MaterialIcons
          name={iconName}
          color={color}
          size={size}
          {...restProps}
        />
      );
    case ICON_TYPES.MaterialCommunityIcons:
      return (
        <MaterialCommunityIcons
          name={iconName}
          color={color}
          size={size}
          {...restProps}
        />
      );
    case ICON_TYPES.Entypo:
      return <EntypoIcons name={iconName} color={color} {...restProps} />;
    case ICON_TYPES.EvilIcons:
      return <EvilIcons name={iconName} color={color} {...restProps} />;
    case ICON_TYPES.FeatherIcons:
      return <FeatherIcon name={iconName} color={color} {...restProps} />;
    case ICON_TYPES.Octicons:
      return <Octicons name={iconName} color={color} {...restProps} />;
    default:
      return <></>;
  }
};

export default VectorIcon;

export const getIconClass = (iconType: any) => {
  switch (iconType) {
    case 'AntDesign':
      return AntDesign;
    case 'Ionicons':
      return IoniconsIcons;
    case 'FontAwesome':
      return FontAwesomeIcons;
    case 'FontAwesome5':
      return FontAwesome5Icons;
    case 'Fontisto':
      return Fontisto;
    case 'SimpleLineIcons':
      return SimpleLineIcons;
    case 'MaterialIcons':
      return MaterialIcons;
    case 'MaterialCommunityIcons':
      return MaterialCommunityIcons;
    case 'Entypo':
      return EntypoIcons;
    case 'EvilIcons':
      return EvilIcons;
    case 'FeatherIcons':
      return FeatherIcon;
    case 'Octicons':
      return Octicons;
    // default:
    //   return CustomIcon;
  }
};
