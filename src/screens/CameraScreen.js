import React, {
  useRef,
  useState,
} from "react";

import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import {
  CameraView,
  useCameraPermissions,
} from "expo-camera";

import {
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function CameraScreen({
  navigation,
}) {
  const cameraRef = useRef(null);

  const [permission, requestPermission] =
    useCameraPermissions();

  const [loading, setLoading] =
    useState(false);

  // Camera ON / OFF
  const [cameraOn, setCameraOn] =
    useState(true);

  // Front / Back Camera
  const [facing, setFacing] =
    useState("front");

  if (!permission) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#fff"
        />
      </View>
    );
  }

  // Permission screen
  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
          padding: 20,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 18,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Camera permission required
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          style={{
            backgroundColor: "#E50914",
            paddingHorizontal: 25,
            paddingVertical: 14,
            borderRadius: 30,
          }}
        >
          <Text
            style={{
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            Allow Camera Access
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Detect Mood
  const detectMood = async () => {
  try {
    setLoading(true);

    const photo =
      await cameraRef.current.takePictureAsync();

    console.log("Photo:", photo);

    const randomNumber =
      Math.floor(Math.random() * 4);

    let mood = "";

    switch (randomNumber) {
      case 0:
        mood = "happy";
        break;

      case 1:
        mood = "sad";
        break;

      case 2:
        mood = "angry";
        break;

      case 3:
        mood = "neutral";
        break;

      default:
        mood = "neutral";
    }

    console.log("Detected Mood:", mood);

    navigation.navigate("Result", {
      mood,
    });
  } catch (error) {
    console.log(
      "Camera Error:",
      error
    );
  } finally {
    setLoading(false);
  }
};

  // Camera OFF Screen
  if (!cameraOn) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#000",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialIcons
          name="videocam-off"
          size={90}
          color="gray"
        />

        <Text
          style={{
            color: "#fff",
            marginTop: 20,
            fontSize: 18,
          }}
        >
          Camera is Off
        </Text>

        {/* Bottom Controls */}
        <View
          style={{
            position: "absolute",
            bottom: 50,
            flexDirection: "row",
            gap: 25,
          }}
        >
          {/* Camera ON */}
          <TouchableOpacity
            onPress={() =>
              setCameraOn(true)
            }
            style={{
              backgroundColor:
                "#E50914",
              padding: 18,
              borderRadius: 50,
            }}
          >
            <Ionicons
              name="videocam"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>

          {/* Close */}
          <TouchableOpacity
            onPress={() =>
              navigation.goBack()
            }
            style={{
              backgroundColor:
                "gray",
              padding: 18,
              borderRadius: 50,
            }}
          >
            <Ionicons
              name="close"
              size={28}
              color="#fff"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Camera */}
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing={facing}
      />

      {/* Top Close Button */}
      <TouchableOpacity
        onPress={() =>
          navigation.goBack()
        }
        style={{
          position: "absolute",
          top: 50,
          right: 20,
          zIndex: 10,
          backgroundColor:
            "rgba(0,0,0,0.5)",
          padding: 8,
          borderRadius: 30,
        }}
      >
        <Ionicons
          name="close"
          size={28}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Bottom Controls */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          flexDirection: "row",
          justifyContent:
            "space-evenly",
          alignItems: "center",
        }}
      >
        {/* Camera OFF */}
        <TouchableOpacity
          onPress={() =>
            setCameraOn(false)
          }
          style={{
            backgroundColor:
              "rgba(0,0,0,0.6)",
            padding: 16,
            borderRadius: 50,
          }}
        >
          <Ionicons
            name="videocam-off"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>

        {/* Detect Mood */}
        {loading ? (
          <ActivityIndicator
            color="#fff"
            size="large"
          />
        ) : (
          <TouchableOpacity
            onPress={detectMood}
            style={{
              backgroundColor:
                "#E50914",
              paddingHorizontal: 28,
              paddingVertical: 16,
              borderRadius: 35,
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight:
                  "bold",
              }}
            >
              Detect Mood
            </Text>
          </TouchableOpacity>
        )}

        {/* Switch Camera */}
        <TouchableOpacity
          onPress={() =>
            setFacing(
              facing === "front"
                ? "back"
                : "front"
            )
          }
          style={{
            backgroundColor:
              "rgba(0,0,0,0.6)",
            padding: 16,
            borderRadius: 50,
          }}
        >
          <Ionicons
            name="camera-reverse"
            size={28}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}