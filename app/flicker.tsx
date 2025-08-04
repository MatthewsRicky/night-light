import FadeOutTimer from "@/components/FadeoutTimer";
import FlickerLight from "@/components/FlickerLight";
import ModeToggle from "@/components/ModeToggle";
import WarmthSlider from "@/components/WarmthSlider";
import { StyleSheet, View } from "react-native";

export default function FlickerScreen() {
  return (
    <View style={StyleSheet.absoluteFill}>
      <FlickerLight />

      <View style={{ position: "absolute", top: "auto", width: "100%" }}>
        <FadeOutTimer />
        <WarmthSlider />
        <ModeToggle />
      </View>
    </View>
  );
}
