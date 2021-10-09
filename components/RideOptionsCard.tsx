import {
  FlatList,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import { Icon } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { selectTravelTimeInfo } from "../app/slices/navigationSlice";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState<RidesData[0] | null>(null);
  const travelTimeInformation = useSelector(selectTravelTimeInfo);

  return (
    <SafeAreaView style={tailwind`bg-white flex-1`}>
      <View style={tailwind``}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={tailwind`absolute top-1 left-0 px-5 rounded-full`}
        >
          <Icon
            name={Platform.OS === "ios" ? "ios-chevron-back" : "md-arrow-back"}
            type="ionicon"
          />
        </TouchableOpacity>
        <Text style={tailwind`text-center mb-5 text-lg`}>
          Select a Ride - {travelTimeInformation?.distance.text}
        </Text>
      </View>
      <FlatList
        data={ridesData}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tailwind.style(
              `flex-row justify-between items-center px-6`,
              id === selected?.id && "bg-gray-200"
            )}
          >
            <Image
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
              source={{
                uri: image,
              }}
            />
            <View style={tailwind`-ml-8`}>
              <Text style={tailwind`text-lg font-bold`}>{title}</Text>
              <Text>{travelTimeInformation?.duration.text}</Text>
            </View>
            <Text style={tailwind`text-lg`}>
              {new Intl.NumberFormat("ee-gh", {
                currency: "GHS",
                style: "currency",
              }).format(
                ((travelTimeInformation?.duration.value || 0) *
                  SURGE_CHARGE_RATE *
                  multiplier) /
                  100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tailwind`mt-auto border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tailwind.style(
            `bg-black py-3 m-3`,
            !selected && "bg-gray-200"
          )}
        >
          <Text style={tailwind`text-center text-white text-lg`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

type RidesData = {
  id: string;
  title: string;
  multiplier: number;
  image: string;
}[];

const ridesData: RidesData = [
  {
    id: "Uber-X-123",
    title: "UberX",
    multiplier: 1,
    image: "https://links.papareact.com/3pn",
  },
  {
    id: "Uber-XL-456",
    title: "Uber XL",
    multiplier: 1.2,
    image: "https://links.papareact.com/5w8",
  },
  {
    id: "Uber-LUX-789",
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://links.papareact.com/7pf",
  },
];

const SURGE_CHARGE_RATE = 1.5;

export default RideOptionsCard;
