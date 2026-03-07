import { View, type ViewProps } from "react-native";
import { Colors } from "../../constants/theme";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: "default" | "outlined" | "danger" | "success" | "warning";
}

const borderColors = {
  default: Colors.cardBorder,
  outlined: Colors.accent,
  danger: Colors.danger,
  success: Colors.success,
  warning: Colors.warning,
};

export function Card({ children, variant = "default", style, ...props }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: Colors.card,
          borderRadius: 12,
          padding: 16,
          borderWidth: 1,
          borderColor: borderColors[variant],
        },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
}
