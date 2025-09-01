import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    const requestPermission = async() => {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus == messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus == messaging.AuthorizationStatus.PROVISIONAL;

        if (enabled) {
          const token = await messaging(). getToken();
          console.log("FCM Token");
        }
    };

    requestPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage =>{
      alert.alert("⚡ Peringatan!", remoteMessage.notification.body);
    });

    return unsubscribe;
  }, []);

    return null;

  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );



