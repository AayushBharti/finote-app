import * as Haptics from "expo-haptics";
import type React from "react";
import {
	ActivityIndicator,
	Pressable,
	type PressableProps,
	StyleSheet,
	Text,
	type TextStyle,
	type ViewStyle,
} from "react-native";
import { colors, radius } from "../constants/theme";
import { verticalScale } from "../utils/styling";

export interface ButtonProps extends PressableProps {
	title?: string;
	style?: ViewStyle;
	textStyle?: TextStyle;
	loading?: boolean;
	children?: React.ReactNode;
}

const Button = ({
	style,
	textStyle,
	children,
	title,
	loading = false,
	disabled = false,
	onPress,
	...props
}: ButtonProps) => {
	const handlePress = (event: any) => {
		Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (onPress) {
			onPress(event);
		}
	};

	const isButtonDisabled = disabled || loading;

	return (
		<Pressable
			onPress={handlePress}
			disabled={isButtonDisabled}
			style={({ pressed }) => [
				styles.buttonBase,
				isButtonDisabled ? styles.buttonDisabled : styles.buttonActive,
				pressed && !isButtonDisabled && styles.buttonPressed,
				style,
			]}
			{...props}
		>
			{loading ? (
				<ActivityIndicator color={colors.white} />
			) : (
				<>{children || <Text style={[styles.text, textStyle]}>{title}</Text>}</>
			)}
		</Pressable>
	);
};

export default Button;

const styles = StyleSheet.create({
	buttonBase: {
		height: verticalScale(52),
		borderRadius: radius._17,
		borderCurve: "continuous",
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
		flexDirection: "row",
		shadowColor: colors.shadowLight,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 3, // Android shadow
	},
	buttonActive: {
		backgroundColor: colors.primary,
		shadowColor: colors.shadowDark,
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.35,
		shadowRadius: 8,
		elevation: 6, // Android
	},
	buttonPressed: {
		transform: [{ scale: 0.98 }],
		backgroundColor: colors.primaryDark, // Darker purple on press
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.1,
		shadowRadius: 2,
		elevation: 1,
	},
	buttonDisabled: {
		backgroundColor: colors.primaryDisabled, // Lighter, muted purple when disabled
		shadowOpacity: 0,
		elevation: 0,
	},
	text: {
		color: colors.white,
		fontSize: 17,
		fontWeight: "600",
	},
});
