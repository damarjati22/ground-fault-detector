import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  Pressable,
  ScrollView,
  Text,
  Vibration,
  View
} from "react-native";
import { PowerCircleFilled } from "../components/PowerCircleFilled";
import { getPlugStatus, simulatePowerUsage, togglePlug } from "../services/simulateplug";

export default function Home() {
  const [status, setStatus] = useState(getPlugStatus());
  const [loading, setLoading] = useState(false);

  // Animasi tombol
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Pulse animasi saat ON
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (status.isOn) {
      const loop = Animated.loop(
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1400,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        })
      );
      loop.start();
      return () => loop.stop();
    } else {
      pulse.setValue(0);
    }
  }, [status.isOn]);

  const handleToggleAnimated = () => {
    Vibration.vibrate(15);

    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.96, duration: 90, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, speed: 14, bounciness: 6 }),
    ]).start();

    setLoading(true);
    const newStatus = togglePlug();
    setStatus({ ...newStatus });
    setLoading(false);
  };

  // Update status realtime (tanpa history)
  useEffect(() => {
    const interval = setInterval(() => {
      const updated = simulatePowerUsage();
      setStatus({ ...updated });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.35] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.28, 0] });

  const primary = status.isOn ? "#2BB24C" : "#E5484D";
  const subtleBg = status.isOn ? "rgba(43,178,76,0.08)" : "rgba(229,72,77,0.08)";
  const label = status.isOn ? "ON" : "OFF";

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 18,
        paddingHorizontal: 12,
        gap: 18,
      }}
    >
      {/* Header */}
      <View
        style={{
          backgroundColor: subtleBg,
          borderRadius: 16,
          padding: 14,
          borderWidth: 1,
          borderColor: status.isOn ? "rgba(43,178,76,0.18)" : "rgba(229,72,77,0.18)",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <View>
            <Text style={{ fontSize: 16, opacity: 0.7 }}>Ground Fault Detector</Text>
            <Text style={{ fontSize: 22, fontWeight: "700", marginTop: 2, color: primary }}>
              Status: {label}
            </Text>
          </View>
          <View
            style={{
              paddingVertical: 8,
              paddingHorizontal: 12,
              borderRadius: 999,
              backgroundColor: "#fff",
              elevation: 3,
              borderWidth: 1,
              borderColor: "rgba(0,0,0,0.06)",
            }}
          >
            <Text style={{ fontWeight: "700" }}>{status.powerUsage} W</Text>
          </View>
        </View>
      </View>

      {/* Tombol ON/OFF */}
      <View style={{ alignItems: "center", marginTop: 4 }}>
        {status.isOn && (
          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              width: 170,
              height: 170,
              borderRadius: 999,
              backgroundColor: primary,
              opacity: ringOpacity,
              transform: [{ scale: ringScale }],
            }}
          />
        )}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Pressable
            onPress={handleToggleAnimated}
            style={{
              width: 150,
              height: 150,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: primary,
              elevation: 6,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <PowerCircleFilled size={56} color="#fff" />
                <Text style={{ color: "#fff", fontWeight: "800", fontSize: 18, marginTop: 10 }}>
                  {label}
                </Text>
              </>
            )}
          </Pressable>
        </Animated.View>
      </View>

      {/* Info singkat */}
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          padding: 14,
          elevation: 4,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.05)",
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={{ opacity: 0.6, fontSize: 12 }}>Mode</Text>
            <Text style={{ fontWeight: "700", marginTop: 2 }}>{status.isOn ? "Active" : "Standby"}</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ opacity: 0.6, fontSize: 12 }}>Power</Text>
            <Text style={{ fontWeight: "700", marginTop: 2 }}>{status.powerUsage} W</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
