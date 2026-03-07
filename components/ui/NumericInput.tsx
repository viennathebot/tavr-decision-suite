import { View, Text, TextInput, type TextInputProps } from "react-native";
import { useState, useCallback } from "react";
import { Colors } from "../../constants/theme";

interface NumericInputProps extends Omit<TextInputProps, "onChangeText" | "value"> {
  label: string;
  value: number | undefined;
  onValueChange: (val: number | undefined) => void;
  unit?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  warningMin?: number;
  warningMax?: number;
  errorMessage?: string;
  warningMessage?: string;
}

export function NumericInput({
  label,
  value,
  onValueChange,
  unit,
  hint,
  min,
  max,
  warningMin,
  warningMax,
  errorMessage,
  warningMessage,
  ...inputProps
}: NumericInputProps) {
  const [text, setText] = useState(value !== undefined ? String(value) : "");

  const isError = errorMessage !== undefined;
  const isWarning =
    warningMessage !== undefined ||
    (value !== undefined &&
      ((warningMin !== undefined && value < warningMin) ||
        (warningMax !== undefined && value > warningMax)));

  const isOutOfRange =
    value !== undefined &&
    ((min !== undefined && value < min) || (max !== undefined && value > max));

  const borderColor = isError || isOutOfRange
    ? Colors.danger
    : isWarning
    ? Colors.warning
    : Colors.inputBorder;

  const handleChange = useCallback(
    (t: string) => {
      setText(t);
      if (t === "" || t === "-" || t === ".") {
        onValueChange(undefined);
        return;
      }
      const n = parseFloat(t);
      if (!isNaN(n)) {
        onValueChange(n);
      }
    },
    [onValueChange]
  );

  return (
    <View style={{ marginVertical: 6 }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 4 }}>
        <Text style={{ color: Colors.primary, fontSize: 13, fontWeight: "600", flex: 1 }}>
          {label}
        </Text>
        {hint && (
          <Text style={{ color: Colors.muted, fontSize: 11 }}>{hint}</Text>
        )}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            flex: 1,
            backgroundColor: Colors.inputBg,
            borderWidth: 1,
            borderColor,
            borderRadius: 8,
            padding: 10,
            color: Colors.primary,
            fontSize: 16,
            fontFamily: "DMMono_400Regular",
          }}
          value={text}
          onChangeText={handleChange}
          keyboardType="decimal-pad"
          placeholderTextColor={Colors.muted}
          {...inputProps}
        />
        {unit && (
          <Text
            style={{
              color: Colors.muted,
              fontSize: 13,
              marginLeft: 8,
              minWidth: 40,
            }}
          >
            {unit}
          </Text>
        )}
      </View>
      {(isError || isOutOfRange) && (
        <Text style={{ color: Colors.danger, fontSize: 11, marginTop: 2 }}>
          {errorMessage ?? `Value out of range (${min}-${max})`}
        </Text>
      )}
      {isWarning && !isError && !isOutOfRange && (
        <Text style={{ color: Colors.warning, fontSize: 11, marginTop: 2 }}>
          {warningMessage ?? "Value outside typical range"}
        </Text>
      )}
    </View>
  );
}
