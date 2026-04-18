import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

// ─── Security Helpers ────────────────────────────────────────────────────────
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export default function Login() {
  const router = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors]     = useState({});

  // ── Inline validation ──────────────────────────────────────────────────────
  const validate = () => {
    const newErrors = {};

    if (!email.trim())              newErrors.email    = "Email wajib diisi.";
    else if (!validateEmail(email)) newErrors.email    = "Format email nggak valid, bestie.";

    if (!password)                  newErrors.password = "Password wajib diisi.";
    else if (password.length < 6)   newErrors.password = "Password minimal 6 karakter ya bestie."; // ✅ fix: konsisten dengan Register

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    Keyboard.dismiss();
    if (!validate()) return;

    // Demo credential check
    if (email.trim() === "admin@mail.com" && password === "123456") {
      router.replace("/home");
    } else {
      Alert.alert("Duh! 😬", "Email atau password lo salah, bestie!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#1a0533" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.emoji}>🔐</Text>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Glad you're back, bestie ✨</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>

            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[styles.input, errors.email && styles.inputError]}
              placeholder="your@email.com"
              placeholderTextColor="#a78bfa"
              value={email}
              onChangeText={(t) => {
                setEmail(t);
                setErrors((e) => {
                  if (!e.email) return e;
                  const next = { ...e };
                  delete next.email;
                  return next;
                });
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

            {/* Password */}
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={[styles.input, errors.password && styles.inputError]}
              placeholder="••••••••"
              placeholderTextColor="#a78bfa"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                setErrors((e) => {
                  if (!e.password) return e;
                  const next = { ...e };
                  delete next.password;
                  return next;
                });
              }}
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin} activeOpacity={0.85}>
              <Text style={styles.btnText}>Let's Go! 🚀</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <Link href="/register" asChild>
              <TouchableOpacity style={styles.btnRegister} activeOpacity={0.75}>
                <Text style={styles.btnRegisterText}>Belum punya akun? Daftar dulu! 👀</Text>
              </TouchableOpacity>
            </Link>
          </View>

          <Text style={styles.footer}>Made with 💜 for GenZ</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1a0533" },
  scroll:    { flexGrow: 1, justifyContent: "center", padding: 24 },
  header:    { alignItems: "center", marginBottom: 32 },
  emoji:     { fontSize: 56, marginBottom: 12 },
  title:     { fontSize: 32, fontWeight: "900", color: "#ffffff", letterSpacing: -0.5 },
  subtitle:  { fontSize: 15, color: "#c4b5fd", marginTop: 6 },
  card: {
    backgroundColor: "#2d1b4e",
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "#4c1d95",
    elevation: 12,
  },
  label: {
    color: "#ddd6fe",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  input: {
    backgroundColor: "#1a0533",
    borderWidth: 1.5,
    borderColor: "#5b21b6",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: "#ffffff",
    fontSize: 15,
    marginBottom: 4,
  },
  inputError: { borderColor: "#ef4444" },
  errorText:  { color: "#f87171", fontSize: 12, marginBottom: 14, marginLeft: 4 },
  btnLogin: {
    backgroundColor: "#7c3aed",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    elevation: 8,
  },
  btnText:         { color: "#ffffff", fontWeight: "800", fontSize: 16, letterSpacing: 0.3 },
  divider:         { flexDirection: "row", alignItems: "center", marginVertical: 20 },
  dividerLine:     { flex: 1, height: 1, backgroundColor: "#4c1d95" },
  dividerText:     { color: "#a78bfa", marginHorizontal: 12, fontSize: 13 },
  btnRegister: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#7c3aed",
  },
  btnRegisterText: { color: "#c4b5fd", fontWeight: "700", fontSize: 14 },
  footer: { textAlign: "center", color: "#6d28d9", marginTop: 32, fontSize: 13 },
});