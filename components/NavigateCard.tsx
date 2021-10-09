import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Icon } from "react-native-elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavFavorites from "./NavFavorites";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackList } from "./MapScreenNavigation";
import { setDestination } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigateCardProp>();

  return (
    <SafeAreaView style={tailwind`bg-white flex-1 justify-between`}>
      <View style={tailwind`flex-shrink`}>
        <Text style={tailwind`text-center pb-5 text-lg`}>
          Good morning, Papi
        </Text>
        <View style={tailwind`border-t border-gray-200 `}>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <View style={tailwind`px-5`}>
          <NavFavorites />
        </View>
      </View>
      <View
        style={tailwind`flex-row bg-white justify-evenly py-2 border-t border-gray-100`}
      >
        <TouchableOpacity
          style={tailwind`bg-black flex-row w-24 justify-between items-center py-3 px-4 rounded-full`}
          onPress={() => navigation.navigate("RideOptionsCard")}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tailwind`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tailwind`flex-row w-24 justify-between py-3 px-4 rounded-full`}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tailwind`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});

type NavigateCardProp = NativeStackNavigationProp<StackList, "NavigateCard">;

export default NavigateCard;
