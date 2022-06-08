import { ScrollView, StatusBar, Text, View } from "react-native";
import data from "./data.json";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
} from "@expo-google-fonts/dev";

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

const faicon = {
  sponsored: "heart",
  delivered: "check",
  outfordelivery: "shipping-fast",
  deliveryoffice: "warehouse",
  attemptfail: "bolt",
  exception: "exclamation",
  inforeceived: "clipboard-list",
  intransit: "circle",
};

const colors = {
  intransit: "white",
  outfordelivery: "#f5a551",
  deliveryoffice: "#f7dc6f",
  delivered: "#4cbb87",
  attemptfail: "#b789c7",
  error: "#d26759",
  exception: "#d26759",
  expired: "#616e7d",
  pending: "#ccc",
  inforeceived: "#214977",
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
  });

  return fontsLoaded ? (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <ScrollView
        style={{
          position: "relative",
        }}
      >
        <View
          style={{
            width: "100%",
            padding: 24,
            backgroundColor: colors[data.data.latest_status.replace(/_/g, "")],
            position: "relative",
            zIndex: 9999,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
              fontSize: 18,
              fontFamily: "Inter_500Medium",
              letterSpacing: 1.4,
            }}
          >
            {data.data.latest_status.replace(/_/g, ' ').toUpperCase()}
          </Text>
        </View>
        <View
          style={{
            borderRightWidth: 1.8,
            borderRightColor: "#E5e5e5",
            position: "absolute",
            height: "100%",
            top: 0,
            left: 55,
          }}
        ></View>
        {data.data.result.map((e, i) => (
          <View
            key={`${e.date} ${e.time} ${Math.random()}`}
            style={{
              padding: 12,
              marginVertical: 4,
              alignItems: "center",
              flexDirection: "row",
              marginTop: i === 0 ? 10 : 0,
              marginBottom: data.data.result.length - 1 === i ? 10 : 0,
              marginHorizontal: 20,
            }}
          >
            {e.status !== "in_transit" ? (
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 48,
                  backgroundColor: colors[e.status.replace(/_/g, "")],
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome5
                  name={faicon[e.status.replace(/_/g, "")]}
                  size={20}
                  color="#fff"
                />
              </View>
            ) : (
              <View
                style={{
                  width: 48,
                  height: 48,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 16,
                    borderWidth: 2,
                    borderColor: "#e5e5e5",
                    backgroundColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      width: 6,
                      height: 6,
                      backgroundColor: "#e5e5e5",
                      borderRadius: 24,
                    }}
                  />
                </View>
              </View>
            )}
            <View
              style={{
                marginLeft: 12,
                justifyContent: "center",
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Inter_500Medium",
                    color: "#374151",
                    fontSize: 16,
                    flex: 1,
                  }}
                  numberOfLines={1}
                >
                  {e.content}
                </Text>
                <Text
                  style={{
                    marginLeft: 12,
                    textAlign: "right",
                    color: "#374151",
                    fontFamily: "Inter_400Regular",
                  }}
                >
                  {e.date} {e.time.toLowerCase()}
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  color: "#A1A1AA",
                  fontSize: 13,
                  fontFamily: "Inter_400Regular",
                }}
              >
                {e.location}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  ) : null;
}
