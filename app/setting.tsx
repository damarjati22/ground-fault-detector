import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Setting() {
  const [notifEnabled, setNotifEnabled] = useState(true);
  const [language, setLanguage] = useState("Indonesia");
  const [modalVisible, setModalVisible] = useState(false);
  const [deviceName, setDeviceName] = useState("Ground Fault Detector");

  // Jadwal
  const [scheduleModal, setScheduleModal] = useState(false);
  const [onTime, setOnTime] = useState("08:00");
  const [offTime, setOffTime] = useState("20:00");

  // Threshold Daya
  const [thresholdModal, setThresholdModal] = useState(false);
  const [threshold, setThreshold] = useState("450"); // default 450 Watt

  // Simpan nama device
  const saveDeviceName = async () => {
    await AsyncStorage.setItem("deviceName", deviceName);
    setModalVisible(false);
    Alert.alert("Berhasil", `Nama perangkat diubah menjadi: ${deviceName}`);
  };

  // Simpan jadwal
  const saveSchedule = async () => {
    const schedule = { onTime, offTime };
    await AsyncStorage.setItem("schedule", JSON.stringify(schedule));
    setScheduleModal(false);
    Alert.alert("Jadwal Tersimpan", `ON: ${onTime}, OFF: ${offTime}`);
  };

  // Simpan threshold daya
  const saveThreshold = async () => {
    await AsyncStorage.setItem("threshold", threshold);
    setThresholdModal(false);
    Alert.alert("Threshold Tersimpan", `Batas daya: ${threshold} Watt`);
  };

  // Toggle notif
  const toggleNotif = () => {
    setNotifEnabled(!notifEnabled);
  };

  // Ganti bahasa
  const handleLanguage = () => {
    const newLang = language === "Indonesia" ? "English" : "Indonesia";
    setLanguage(newLang);
    Alert.alert("Bahasa", `Bahasa diganti ke ${newLang}`);
  };

  // Info user
  const handleUserInfo = () => {
    Alert.alert("Informasi Pengguna", "Nama: Damaru\nEmail: damaru@example.com");
  };

  // Logout
  const handleLogout = () => {
    Alert.alert("Logout", "Apakah kamu yakin ingin keluar?", [
      { text: "Batal", style: "cancel" },
      { text: "Ya", onPress: () => console.log("User logout") },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Device Settings */}
      <Text style={styles.section}>⚙️ Device Settings</Text>
      <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
        <Text style={styles.itemText}>📟 Rename Device</Text>
        <Text style={styles.subText}>{deviceName}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setScheduleModal(true)}>
        <Text style={styles.itemText}>⏰ Jadwal ON/OFF</Text>
        <Text style={styles.subText}>
          ON: {onTime} | OFF: {offTime}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.item} onPress={() => setThresholdModal(true)}>
        <Text style={styles.itemText}>⚡ Threshold Daya</Text>
        <Text style={styles.subText}>{threshold} Watt</Text>
      </TouchableOpacity>

      {/* App Settings */}
      <Text style={styles.section}>📱 App Settings</Text>
      <View style={styles.itemRow}>
        <Text style={styles.itemText}>🔔 Notifikasi</Text>
        <Switch value={notifEnabled} onValueChange={toggleNotif} />
      </View>
      <TouchableOpacity style={styles.item} onPress={handleLanguage}>
        <Text style={styles.itemText}>🌐 Bahasa</Text>
        <Text style={styles.subText}>{language}</Text>
      </TouchableOpacity>

      {/* Akun */}
      <Text style={styles.section}>👤 Akun</Text>
      <TouchableOpacity style={styles.item} onPress={handleUserInfo}>
        <Text style={styles.itemText}>ℹ️ Informasi Pengguna</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.item, { borderColor: "red" }]} onPress={handleLogout}>
        <Text style={[styles.itemText, { color: "red" }]}>🚪 Logout</Text>
      </TouchableOpacity>

      {/* Modal Rename */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Masukkan Nama Baru</Text>
            <TextInput
              style={styles.input}
              value={deviceName}
              onChangeText={setDeviceName}
            />
            <View style={styles.modalAction}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.cancel}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveDeviceName}>
                <Text style={styles.save}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Jadwal */}
      <Modal transparent visible={scheduleModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Atur Jadwal</Text>
            <Text>Waktu ON</Text>
            <TextInput style={styles.input} value={onTime} onChangeText={setOnTime} />
            <Text>Waktu OFF</Text>
            <TextInput style={styles.input} value={offTime} onChangeText={setOffTime} />
            <View style={styles.modalAction}>
              <TouchableOpacity onPress={() => setScheduleModal(false)}>
                <Text style={styles.cancel}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveSchedule}>
                <Text style={styles.save}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal Threshold */}
      <Modal transparent visible={thresholdModal} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Atur Threshold Daya</Text>
            <TextInput
              style={styles.input}
              value={threshold}
              onChangeText={setThreshold}
              keyboardType="numeric"
            />
            <View style={styles.modalAction}>
              <TouchableOpacity onPress={() => setThresholdModal(false)}>
                <Text style={styles.cancel}>Batal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={saveThreshold}>
                <Text style={styles.save}>Simpan</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f9fc", padding: 16 },
  section: { fontSize: 18, fontWeight: "700", marginTop: 20, marginBottom: 12, color: "#222" },
  item: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },
  itemText: { fontSize: 16, fontWeight: "600", color: "#333" },
  subText: { fontSize: 13, color: "#555", marginTop: 4 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#eee",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },
  modalAction: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 16,
  },
  cancel: { color: "red", fontWeight: "600" },
  save: { color: "green", fontWeight: "600" },
});
