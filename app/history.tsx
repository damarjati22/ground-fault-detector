import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";

const mockHistory = [
  { id: "1", time: "03-09-2025 14:35", status: "ON", usage: "15 Wh" },
  { id: "2", time: "03-09-2025 09:12", status: "OFF", usage: "0 Wh" },
  { id: "3", time: "02-09-2025 21:10", status: "ON", usage: "28 Wh" },
];

export default function History() {
  const renderItem = ({ item }: any) => {
    const isOn = item.status === "ON";
    return (
      <View style={styles.card}>
        {/* Bagian ikon status */}
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: isOn ? "#2BB24C20" : "#E5484D20" },
          ]}
        >
          <Ionicons
            name={isOn ? "power" : "power-outline"}
            size={28}
            color={isOn ? "#2BB24C" : "#E5484D"}
          />
        </View>

        {/* Bagian detail log */}
        <View style={styles.info}>
          <Text style={styles.time}>{item.time}</Text>
          <Text style={[styles.status, { color: isOn ? "#2BB24C" : "#E5484D" }]}>
            Status: {item.status}
          </Text>
          <Text style={styles.usage}>Usage: {item.usage}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockHistory}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f2f4f7" },
  title: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#222",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
  },
  iconContainer: {
    width: 54,
    height: 54,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  info: { flex: 1 },
  time: { fontWeight: "600", marginBottom: 4, fontSize: 14, color: "#444" },
  status: { fontSize: 16, fontWeight: "700" },
  usage: { fontSize: 14, color: "#555", marginTop: 2 },
});
