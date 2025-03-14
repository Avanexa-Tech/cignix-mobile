import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Color from '../../Global/Color';
import { Mulish } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag'; 

const LanguageSelector = ({navigation }) => {
  const { t, i18n } = useTranslation();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'ta', name: 'Tamil' },
    { code: 'mr', name: 'Marathi' },
    { code: 'ma', name: 'Malayalam' },
    { code: 'te', name: 'Telugu' },
    { code: 'hi', name: 'Hindi' },
  ];

  const handleChangeLanguage = async (lang) => {
    try {
      await i18n.changeLanguage(lang);
      await AsyncStorage.setItem('selectedLanguage', lang);
      navigation.goBack(); 
    } catch (err) {
      console.log("Error changing language:", err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Iconviewcomponent
            viewstyle={{ alignItems: 'center', justifyContent: 'center' }}
            Icontag="Ionicons"
            icon_size={30}
            icon_color={Color.black}
            iconname="chevron-back"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t("profile.Select Language")}</Text>
      </View>
      {languages.map((language) => (
        <TouchableOpacity
          key={language.code}
          onPress={() => handleChangeLanguage(language.code)}
          style={styles.languageOption}
        >
          <Text style={styles.languageText}>{language.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Color.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 20,
    marginRight:10,
    fontFamily: Mulish.Bold,
    flex: 1,
    textAlign: 'center',
    color: Color.black,
  },
  heading: {
    fontSize: 24,
    fontFamily: Mulish.Bold,
    marginBottom: 20,
    textAlign: 'center',
    color: Color.black,
  },
  languageOption: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Color.lightgrey,
  },
  languageText: {
    fontSize: 16,
    color: Color.lightBlack,
    fontFamily: Mulish.Regular,
    marginVertical:10
  },
});

export default LanguageSelector;