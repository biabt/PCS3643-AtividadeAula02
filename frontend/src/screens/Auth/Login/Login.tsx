import { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../../context/AuthContext";
import CustomButton from "../../../components/Button";
import CustomInput from "../../../components/Input";
import CustomTitle from "../../../components/Title";
import styles from "./styles";
import { loginAccount } from "../../../services/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  const { login } = useAuth();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [emailToReset, setEmailToReset] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

 const handleLogin = async () => {
  if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos");
      return;
    }
  setLoading(true);
  try {
      const response = await loginAccount(email, password);
      await AsyncStorage.setItem("authToken", response.access_token);
      login();
    } catch (err: any) {
      Alert.alert("Erro", "Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
};
  const handlePasswordReset = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <CustomTitle
        title="Bem-vindo de volta!"
        subtitle="Informe suas informações para entrar!"
      />

      <View style={styles.inputSpacing}>
        <CustomInput
          label="Email"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputSpacing}>
        <CustomInput
          label="Senha"
          placeholder="Digite sua senha"
          secure
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.buttonSpacing}>
        <CustomButton size="large" title={loading ? "Entrando..." : "Entrar"} fill onPress={handleLogin} />
      </View>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.linkText}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
