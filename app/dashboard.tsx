import { useEffect, useState } from "react";
import { Dimensions, Platform, ScrollView, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { getPlugStatus, simulatePowerUsage } from "../services/simulateplug";

export default function Dashboard() {
  const [status, setStatus] = useState(getPlugStatus());
  const [history, setHistory] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updated = simulatePowerUsage();
      setStatus({ ...updated });
      if (updated.isOn) {
        setHistory((prev) => [...prev.slice(-19), updated.powerUsage]);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartWidth =
    Platform.OS === "web"
      ? Dimensions.get("window").width - 40
      : Dimensions.get("window").width - 24;

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        paddingVertical: 18,
        paddingHorizontal: 12,
      }}
    >
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 16,
          paddingVertical: 10,
          paddingHorizontal: 8,
          elevation: 3,
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.05)",
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "700", paddingHorizontal: 10, marginBottom: 6 }}>
          Riwayat Daya (20 data terakhir)
        </Text>
        {history.length > 1 ? (
          <LineChart
            data={{
              labels: history.map((_, i) => `${i + 1}`),
              datasets: [{ data: history }],
            }}
            width={chartWidth}
            height={220}
            yAxisSuffix=" W"
            chartConfig={{
              backgroundColor: "#ffffff",
              backgroundGradientFrom: "#ffffff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(20,20,20,${opacity})`,
              labelColor: (opacity = 1) => `rgba(80,80,80,${opacity})`,
              propsForDots: { r: "3.5" },
              propsForBackgroundLines: { strokeDasharray: "4 8" },
              style: { borderRadius: 16 },
            }}
            bezier
            style={{ borderRadius: 12 }}
          />
        ) : (
          <Text style={{ textAlign: "center", marginTop: 20, opacity: 0.6 }}>
            Belum ada data riwayat
          </Text>
        )}
      </View>
    </ScrollView>
  );
}
