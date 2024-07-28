import { Text, type TextProps } from "./Themed";

export function MonoText(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: "SpaceMono" }]} />;
}

export function InterText(props: TextProps) {
	return <Text {...props} style={[props.style, { fontFamily: "Inter" }]} />;
}

export function FontText(props: TextProps & { font: string }) {
	return <Text {...props} style={[props.style, { fontFamily: props.font }]} />;
}
