// app/home.js
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const name   = params.userName || "User";

  // Greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const menuItems = [
    { emoji: "📊", label: "Dashboard", color: "#7c3aed" },
    { emoji: "👾", label: "Activity",  color: "#06b6d4" },
    { emoji: "🔥", label: "Trending",  color: "#f97316" },
    { emoji: "💬", label: "Messages",  color: "#ec4899" },
  ];

  const handleLogout = () => {
    Alert.alert(
      "Logout nih? 👋",
      "Yakin mau cabut, bestie?",
      [
        { text: "Batal", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => router.replace("/") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <View>
            <Text style={styles.greeting}>{getGreeting()} 👋</Text>
            <Text style={styles.username}>{name} ✨</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
          </View>
        </View>

        {/* Hero Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerBadge}>🔥 Active</Text>
          <Text style={styles.bannerTitle}>Heyy, {name}!{"\n"}Lo udah masuk ke Dashboard 🚀</Text>
          <Text style={styles.bannerSub}>Keep slayin', bestie!</Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsRow}>
          {[
            { value: "26,9RB", label: "Posts" },
            { value: "147 JT", label: "Followers", highlight: true },
            { value: "107",    label: "Following" },
          ].map((s) => (
            <View key={s.label} style={[styles.statCard, s.highlight && styles.statCardMid]}>
              <Text style={styles.statValue}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* Menu Grid */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.grid}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={[styles.menuCard, { borderColor: item.color + "55" }]}
              activeOpacity={0.75}
            >
              <Text style={styles.menuEmoji}>{item.emoji}</Text>
              <Text style={[styles.menuLabel, { color: item.color }]}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.btnLogout} onPress={handleLogout} activeOpacity={0.8}>
          <Text style={styles.btnLogoutText}>Logout 👋</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0d0d0d" },
  scroll:    { padding: 24, paddingBottom: 40 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 28,
    marginTop: 8,
  },
  greeting:  { fontSize: 14, color: "#737373", marginBottom: 2 },
  username:  { fontSize: 22, fontWeight: "800", color: "#ffffff" },
  avatar: {
    width: 46, height: 46, borderRadius: 99,
    backgroundColor: "#7c3aed",
    justifyContent: "center", alignItems: "center",
  },
  avatarText: { color: "#fff", fontWeight: "800", fontSize: 18 },
  banner: {
    backgroundColor: "#1a0533",
    borderRadius: 24,
    padding: 28,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#4c1d95",
  },
  bannerBadge: {
    fontSize: 12, color: "#a78bfa", fontWeight: "700",
    backgroundColor: "#2d1b4e",
    alignSelf: "flex-start",
    paddingHorizontal: 12, paddingVertical: 5,
    borderRadius: 99, marginBottom: 14, overflow: "hidden",
  },
  bannerTitle: {
    fontSize: 22, fontWeight: "900", color: "#ffffff",
    lineHeight: 32, marginBottom: 8,
  },
  bannerSub:  { fontSize: 14, color: "#c4b5fd" },
  statsRow:   { flexDirection: "row", gap: 12, marginBottom: 28 },
  statCard: {
    flex: 1, backgroundColor: "#1a1a1a",
    borderRadius: 16, padding: 16, alignItems: "center",
    borderWidth: 1, borderColor: "#2a2a2a",
  },
  statCardMid: { backgroundColor: "#1a0533", borderColor: "#4c1d95" },
  statValue:   { fontSize: 20, fontWeight: "900", color: "#ffffff", marginBottom: 4 },
  statLabel:   { fontSize: 12, color: "#737373", fontWeight: "600" },
  sectionTitle:{ fontSize: 16, fontWeight: "800", color: "#ffffff", marginBottom: 14 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 32 },
  menuCard: {
    width: "47%", backgroundColor: "#1a1a1a",
    borderRadius: 18, padding: 20, alignItems: "center", borderWidth: 1.5,
  },
  menuEmoji:    { fontSize: 32, marginBottom: 8 },
  menuLabel:    { fontSize: 14, fontWeight: "700" },
  btnLogout: {
    borderWidth: 1.5, borderColor: "#3f3f46",
    paddingVertical: 16, borderRadius: 14, alignItems: "center",
  },
  btnLogoutText: { color: "#71717a", fontWeight: "700", fontSize: 15 },
});