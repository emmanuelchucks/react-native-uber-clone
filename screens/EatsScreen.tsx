import { Image, Text, View } from "react-native";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { navData } from "../components/NavOptions";

const EatsScreen = () => {
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View>
        <Image
          source={{ uri: navData[1].image }}
          style={{ width: 120, height: 120, resizeMode: "contain" }}
        />
      </View>
      <Text style={{ marginTop: 24, fontSize: 16 }}>
        Not yet implemented...
      </Text>
    </SafeAreaView>
  );
};

export default EatsScreen;
