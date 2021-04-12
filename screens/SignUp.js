/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  TextInput,
  Modal,
  FlatList,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {icons, images, COLORS, SIZES, FONTS} from '../constants';

const SignUp = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryListVisibility, setCountryListVisibility] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      let res = await fetch('https://restcountries.eu/rest/v2/all');
      let data = await res.json();
      let fetchedData = data.map(c => {
        return {
          name: c.name,
          code: c.alpha2Code,
          callingCode: `+${c.callingCodes[0]}`,
          flag: `https://www.countryflags.io/${c.alpha2Code}/shiny/64.png`,
        };
      });

      setCountries(fetchedData);
      if (fetchedData.length > 0) {
        let defaultData = fetchedData.filter(c => c.code === 'CA');
        if (defaultData) {
          setSelectedCountry(defaultData[0]);
        }
      }
    };
    fetchCountries();
  }, []);

  console.log(countries.length, selectedCountry, countryListVisibility);

  function renderHeader() {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: SIZES.padding * 6,
          paddingHorizontal: SIZES.padding * 2,
        }}
        onPress={() => console.log('Sign Up')}>
        <Image
          source={icons.back}
          resizeMode="contain"
          style={{width: 20, height: 20, tintColor: COLORS.white}}
        />
        <Text
          style={{
            marginLeft: SIZES.padding * 1.5,
            color: COLORS.white,
            ...FONTS.h4,
          }}>
          Sign Up
        </Text>
      </TouchableOpacity>
    );
  }

  function renderLogo() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 5,
          height: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={images.wallieLogo}
          resizeMode="contain"
          style={{width: '60%'}}
        />
      </View>
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 3,
          marginHorizontal: SIZES.padding * 3,
        }}>
        {/* Full name */}
        <View style={{marginTop: SIZES.padding * 3}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Full Name
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Full Name"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
          />
        </View>

        {/* Phone Number */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Phone Number
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* Country code */}
            <TouchableOpacity
              style={{
                width: 100,
                height: 50,
                marginHorizontal: 5,
                borderBottomColor: COLORS.white,
                alignItems: 'center',
                borderBottomWidth: 1,
                flexDirection: 'row',
                ...FONTS.body2,
              }}
              onPress={() => setCountryListVisibility(true)}>
              <View style={{justifyContent: 'center'}}>
                <Image
                  source={icons.down}
                  style={{width: 10, height: 10, tintColor: COLORS.white}}
                />
              </View>

              {/* Flag */}
              <View style={{justofyContent: 'center', marginLeft: 5}}>
                <Image
                  source={{uri: selectedCountry?.flag}}
                  resizeMode="contain"
                  style={{width: 30, height: 30}}
                />
              </View>

              <View style={{justifyContent: 'center', marginLeft: 5}}>
                <Text style={{color: COLORS.white, ...FONTS.body3}}>
                  {selectedCountry?.callingCode}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Phone Number */}
            <TextInput
              style={{
                flex: 1,
                marginVertical: SIZES.padding,
                borderBottomColor: COLORS.white,
                borderBottomWidth: 1,
                height: 40,
                color: COLORS.white,
                ...FONTS.body3,
              }}
              placeholder="Enter Phone Number"
              placeholderTextColor={COLORS.white}
              selectionColor={COLORS.white}
            />
          </View>
        </View>

        {/* Password */}
        <View style={{marginTop: SIZES.padding * 2}}>
          <Text style={{color: COLORS.lightGreen, ...FONTS.body3}}>
            Password
          </Text>
          <TextInput
            style={{
              marginVertical: SIZES.padding,
              borderBottomColor: COLORS.white,
              borderBottomWidth: 1,
              height: 40,
              color: COLORS.white,
              ...FONTS.body3,
            }}
            placeholder="Enter Password"
            placeholderTextColor={COLORS.white}
            selectionColor={COLORS.white}
            secureTextEntry={!showPassword}
          />

          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 0,
              bottom: 10,
              height: 30,
              width: 30,
            }}
            onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={showPassword ? icons.disable_eye : icons.eye}
              style={{height: 20, width: 20, tintColor: COLORS.white}}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderButton() {
    return (
      <View style={{margin: SIZES.padding * 3}}>
        <TouchableOpacity
          style={{
            height: 60,
            backgroundColor: COLORS.black,
            borderRadius: SIZES.radius / 1.5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => navigation.navigate('Home')}>
          <Text style={{color: COLORS.white, ...FONTS.h3}}>Continue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function renderCountryCodeModal() {
    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          style={{padding: SIZES.padding, flexDirection: 'row'}}
          onPress={() => {
            setSelectedCountry(item);
            setCountryListVisibility(false);
          }}>
          <Image
            source={{uri: item.flag}}
            style={{width: 30, height: 30, marginRight: 10}}
          />
          <Text style={{...FONTS.body4}}>{item.name}</Text>
        </TouchableOpacity>
      );
    };
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={countryListVisibility}>
        <TouchableWithoutFeedback
          onPress={() => setCountryListVisibility(false)}>
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                height: 400,
                width: SIZES.width * 0.6,
                backgroundColor: COLORS.lightGreen,
                borderRadius: SIZES.radius,
              }}>
              <FlatList
                data={countries}
                renderItem={renderItem}
                keyExtractor={i => i.code}
                showVerticalScrollIndicator={false}
                style={{
                  padding: SIZES.padding * 2,
                  marginBottom: SIZES.padding * 2,
                }}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <LinearGradient colors={[COLORS.emerald, COLORS.lime]} style={{flex: 1}}>
        <ScrollView>
          {renderHeader()}
          {renderLogo()}
          {renderForm()}
          {renderButton()}
        </ScrollView>
      </LinearGradient>
      {renderCountryCodeModal()}
    </KeyboardAvoidingView>
  );
};

export default SignUp;
