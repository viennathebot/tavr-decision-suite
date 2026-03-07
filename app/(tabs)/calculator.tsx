import { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Save, FolderOpen, Trash2 } from "lucide-react-native";
import { DemographicsSection } from "../../components/calculator/DemographicsSection";
import { EchoSection } from "../../components/calculator/EchoSection";
import { CTSection } from "../../components/calculator/CTSection";
import { DobutamineSection } from "../../components/calculator/DobutamineSection";
import { STSSection } from "../../components/calculator/STSSection";
import { ResultsPanel } from "../../components/calculator/ResultsPanel";
import { useCalculatorStore } from "../../store/calculatorStore";
import { Colors } from "../../constants/theme";

export default function CalculatorScreen() {
  const { saveCase, savedCases, loadCase, deleteCase, clearAll } =
    useCalculatorStore();
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [caseName, setCaseName] = useState("");

  const handleSave = useCallback(() => {
    if (caseName.trim()) {
      saveCase(caseName.trim());
      setCaseName("");
      setShowSaveModal(false);
    }
  }, [caseName, saveCase]);

  const handleClearAll = useCallback(() => {
    Alert.alert("Clear All", "Clear all input fields?", [
      { text: "Cancel", style: "cancel" },
      { text: "Clear", style: "destructive", onPress: clearAll },
    ]);
  }, [clearAll]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }} edges={["top"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 8,
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontSize: 22,
              fontWeight: "800",
            }}
          >
            AS Severity Calculator
          </Text>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <Pressable onPress={() => setShowLoadModal(true)}>
              <FolderOpen size={20} color={Colors.accent} />
            </Pressable>
            <Pressable onPress={() => setShowSaveModal(true)}>
              <Save size={20} color={Colors.accent} />
            </Pressable>
            <Pressable onPress={handleClearAll}>
              <Trash2 size={20} color={Colors.danger} />
            </Pressable>
          </View>
        </View>

        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <DemographicsSection />
          <View style={{ height: 12 }} />
          <EchoSection />
          <View style={{ height: 12 }} />
          <CTSection />
          <View style={{ height: 12 }} />
          <DobutamineSection />
          <View style={{ height: 12 }} />
          <STSSection />
          <View style={{ height: 16 }} />
          <ResultsPanel />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Save Modal */}
      <Modal visible={showSaveModal} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          onPress={() => setShowSaveModal(false)}
        >
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 12,
              padding: 20,
              width: 300,
              borderWidth: 1,
              borderColor: Colors.cardBorder,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 12,
              }}
            >
              Save Case
            </Text>
            <TextInput
              style={{
                backgroundColor: Colors.inputBg,
                borderWidth: 1,
                borderColor: Colors.inputBorder,
                borderRadius: 8,
                padding: 10,
                color: Colors.primary,
                fontSize: 14,
                marginBottom: 12,
              }}
              placeholder="Case name..."
              placeholderTextColor={Colors.muted}
              value={caseName}
              onChangeText={setCaseName}
              autoFocus
            />
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Pressable
                onPress={() => setShowSaveModal(false)}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: Colors.inputBg,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: Colors.muted }}>Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleSave}
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 8,
                  backgroundColor: Colors.accent,
                  alignItems: "center",
                }}
              >
                <Text style={{ color: Colors.white, fontWeight: "600" }}>Save</Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* Load Modal */}
      <Modal visible={showLoadModal} transparent animationType="fade">
        <Pressable
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          onPress={() => setShowLoadModal(false)}
        >
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 12,
              padding: 20,
              width: 320,
              maxHeight: 400,
              borderWidth: 1,
              borderColor: Colors.cardBorder,
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontSize: 16,
                fontWeight: "700",
                marginBottom: 12,
              }}
            >
              Saved Cases
            </Text>
            {savedCases.length === 0 ? (
              <Text style={{ color: Colors.muted, fontSize: 13, textAlign: "center", paddingVertical: 20 }}>
                No saved cases
              </Text>
            ) : (
              <ScrollView style={{ maxHeight: 280 }}>
                {savedCases.map((c) => (
                  <View
                    key={c.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      paddingVertical: 8,
                      borderBottomWidth: 0.5,
                      borderBottomColor: Colors.cardBorder,
                    }}
                  >
                    <Pressable
                      onPress={() => {
                        loadCase(c.id);
                        setShowLoadModal(false);
                      }}
                      style={{ flex: 1 }}
                    >
                      <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: "500" }}>
                        {c.name}
                      </Text>
                      <Text style={{ color: Colors.muted, fontSize: 10 }}>
                        {new Date(c.date).toLocaleDateString()}
                      </Text>
                    </Pressable>
                    <Pressable onPress={() => deleteCase(c.id)}>
                      <Trash2 size={14} color={Colors.danger} />
                    </Pressable>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}
