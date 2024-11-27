import React from 'react';
import { View } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

export const Iconviewcomponent = ({
  viewstyle,
  textstyle,
  textvalue,
  Icontag,
  iconstyle,
  icon_size,
  icon_color,
  iconname,
}) => {
  // Helper function to map Icontag string to the correct icon library
  const findIconTag = (Icontag) => {
    switch (Icontag) {
      case "AntDesign":
        return AntDesign;
      case "Feather":
        return Feather;
      case "MaterialIcons":
        return MaterialIcons;
      case "SimpleLineIcons":
        return SimpleLineIcons;
      case "Ionicons":
        return Ionicons;
      case "FontAwesome":
        return FontAwesome;
      case "FontAwesome5":
        return FontAwesome5;
      case "MaterialCommunityIcons":
        return MaterialCommunityIcons;
      case "EvilIcons":
        return EvilIcons;
      case "Entypo":
        return Entypo;
      case "Octicons":
        return Octicons;
      case "Fontisto":
        return Fontisto;
      default:
        throw new Error(`Icon library "${Icontag}" is not recognized.`);
    }
  };

  try {
    const IconTag = findIconTag(Icontag); // Resolve the icon library

    return (
      <View style={viewstyle}>
        <IconTag
          size={icon_size}
          color={icon_color}
          name={iconname}
          style={iconstyle}
        />
        {/* Uncomment if text needs to be displayed */}
        {/* <Text style={textstyle}>{textvalue}</Text> */}
      </View>
    );
  } catch (error) {
    console.log("Error in Iconviewcomponent:", error);
    return null; // Optionally render a fallback view or null on error
  }
};