import { CSSProperties, ReactNode, createElement } from "react";

const fontSizes = {
  0: "0.875rem",
  1: "1rem",
  2: "1.25rem",
  3: "1.5rem",
  4: "1.75rem",
  5: "2rem",
};

const fontWeights = {
	semiBold: 600,
	medium: 500,
	regular: 400,
	light: 300,
}

const getVariantStyles = (type: TextVariants) => {
	const styles: { [k in TextVariants] : CSSProperties } = {
		h1: { fontSize: fontSizes[5], fontWeight: fontWeights.semiBold, lineHeight: 1.35 },
		h2: { fontSize: fontSizes[4], fontWeight: fontWeights.semiBold },
		h3: { fontSize: fontSizes[3], fontWeight: fontWeights.semiBold },
		h4: { fontSize: fontSizes[2], fontWeight: fontWeights.medium },
		h5: { fontSize: fontSizes[1], fontWeight: fontWeights.medium },
		h6: { fontSize: fontSizes[0], fontWeight: fontWeights.medium },
		paragraph: { fontSize: fontSizes[1], fontWeight: fontWeights.regular },
	}
	return styles[type];
};

const element: { [key in TextVariants]: string } = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  paragraph: "p"
};

export const Text = ({ type = 'paragraph', children, className }: TextProps) => {
	const styles = getVariantStyles(type);
	const Component = createElement(element[type], { style: styles, className }, children);
	return Component;
};

type TextVariants = 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'h5'
	| 'h6'
	| 'paragraph';

export type TextProps = {
	type?: TextVariants;
	className?: React.HTMLAttributes<HTMLElement>['className'];
	children: ReactNode;
};
