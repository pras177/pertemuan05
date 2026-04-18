// app/register.js
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import React from "react";
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
const validatePhone = (phone) => /^\d{10,}$/.test(phone.trim());

// ─── Field Component (memoized agar tidak re-render semua field) ─────────────
const Field = React.memo(({
  label,
  placeholder,
  keyboardType = "default",
  secureTextEntry = false,
  autoCapitalize = "words",
  value,
  error,
  onChangeText,
}) => (
  <>
    <Text style={styles.label}>{label}</Text>
    <TextInput
      style={[styles.input, error && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor="#6ee7f7"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      autoCorrect={false}
    />
    {error && <Text style={styles.errorText}>{error}</Text>}
  </>
));

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  // ✅ fix: fungsi dasar untuk update satu field & hapus errornya
  const changeField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  // ✅ fix: cache semua handler sekaligus pakai useMemo, bukan inline call
  const handlers = useMemo(() => ({
    name:            (v) => changeField("name", v),
    email:           (v) => changeField("email", v),
    phone:           (v) => changeField("phone", v),
    password:        (v) => changeField("password", v),
    confirmPassword: (v) => changeField("confirmPassword", v),
  }), [changeField]);

  // ── Full validation ──────────────────────────────────────────────────────
  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Nama wajib diisi.";

    if (!form.email.trim()) e.email = "Email wajib diisi.";
    else if (!validateEmail(form.email))
      e.email = "Format email nggak valid, bestie.";

    if (!form.phone.trim()) e.phone = "Nomor HP wajib diisi.";
    else if (!validatePhone(form.phone))
      e.phone = "Nomor HP hanya angka & minimal 10 digit.";

    if (!form.password) e.password = "Password wajib diisi.";
    else if (form.password.length < 6)
      e.password = "Password minimal 6 karakter ya bestie.";

    if (!form.confirmPassword)
      e.confirmPassword = "Konfirmasi password wajib diisi.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Password & konfirmasi nggak sama!";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = () => {
    Keyboard.dismiss();
    if (!validate()) return;

    Alert.alert("Yeay! 🎉", "Akun berhasil dibuat!", [
      {
        text: "Let's Go!",
        onPress: () =>
          router.replace({
            pathname: "/home",
            params: { userName: form.name.trim() },
          }),
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <StatusBar barStyle="light-content" backgroundColor="#0f1923" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.emoji}>🚀</Text>
            <Text style={styles.title}>Buat Akun Baru</Text>
            <Text style={styles.subtitle}>Join the vibe ✌️</Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            {/* Step indicator */}
            <View style={styles.steps}>
              {[1, 2, 3, 4, 5].map((s) => (
                <View
                  key={s}
                  style={[styles.step, s === 1 && styles.stepActive]}
                />
              ))}
            </View>

            <Field
              label="Nama Lengkap"
              placeholder="Nama lengkap"
              value={form.name}
              error={errors.name}
              onChangeText={handlers.name}
            />
            <Field
              label="Email"
              placeholder="your@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={form.email}
              error={errors.email}
              onChangeText={handlers.email}
            />
            <Field
              label="Nomor HP"
              placeholder="08xxxxxxxxxx"
              keyboardType="phone-pad"
              autoCapitalize="none"
              value={form.phone}
              error={errors.phone}
              onChangeText={handlers.phone}
            />
            <Field
              label="Password"
              placeholder="Min. 6 karakter"
              secureTextEntry
              autoCapitalize="none"
              value={form.password}
              error={errors.password}
              onChangeText={handlers.password}
            />
            <Field
              label="Konfirmasi Password"
              placeholder="Ulangi password"
              secureTextEntry
              autoCapitalize="none"
              value={form.confirmPassword}
              error={errors.confirmPassword}
              onChangeText={handlers.confirmPassword}
            />

            <TouchableOpacity
              style={styles.btnRegister}
              onPress={handleRegister}
              activeOpacity={0.85}
            >
              <Text style={styles.btnText}>Daftar Sekarang ✨</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnLogin}
              onPress={() => router.replace("/")}
              activeOpacity={0.75}
            >
              <Text style={styles.btnLoginText}>
                Udah punya akun? Login 👈
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.footer}>Gratis kok 😄</Text>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1923" },
  scroll: { flexGrow: 1, justifyContent: "center", padding: 24 },

  header: { alignItems: "center", marginBottom: 32 },
  emoji: { fontSize: 56, marginBottom: 12 },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#ffffff",
  },
  subtitle: { fontSize: 15, color: "#67e8f9", marginTop: 6 },

  card: {
    backgroundColor: "#162433",
    borderRadius: 24,
    padding: 28,
    borderWidth: 1,
    borderColor: "#0e7490",
  },

  steps: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginBottom: 24,
  },
  step: {
    width: 22,
    height: 5,
    borderRadius: 99,
    backgroundColor: "#164e63",
  },
  stepActive: {
    backgroundColor: "#06b6d4",
    width: 44,
  },

  label: {
    color: "#a5f3fc",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#0f1923",
    borderWidth: 1.5,
    borderColor: "#0e7490",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    color: "#ffffff",
    marginBottom: 4,
  },

  inputError: { borderColor: "#ef4444" },

  errorText: {
    color: "#f87171",
    fontSize: 12,
    marginBottom: 14,
  },

  btnRegister: {
    backgroundColor: "#06b6d4",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },

  btnText: {
    color: "#0f1923",
    fontWeight: "800",
    fontSize: 16,
  },

  btnLogin: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,
    borderWidth: 1.5,
    borderColor: "#0e7490",
  },

  btnLoginText: {
    color: "#67e8f9",
    fontWeight: "700",
  },

  footer: {
    textAlign: "center",
    color: "#155e75",
    marginTop: 32,
  },
});