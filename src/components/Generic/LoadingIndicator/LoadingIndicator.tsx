import type { VoidComponent, JSX } from "solid-js";

import styles from "./LoadingIndicator.module.scss";

import { splitProps } from "solid-js";

export const LoadingIndicator: VoidComponent<JSX.SvgSVGAttributes<SVGSVGElement>> = (props) => {
  const [localProps, restProps] = splitProps(props, ["class"]);
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class={`${styles.loadingIndicator} ${localProps.class}`}
      {...restProps}>
      <g>
        <circle cx={3} cy={12} r={2}></circle>
        <circle cx={21} cy={12} r={2}></circle>
        <circle cx={12} cy={21} r={2}></circle>
        <circle cx={12} cy={3} r={2}></circle>
        <circle cx={5.64} cy={5.64} r={2}></circle>
        <circle cx={18.36} cy={18.36} r={2}></circle>
        <circle cx={5.64} cy={18.36} r={2}></circle>
        <circle cx={18.36} cy={5.64} r={2}></circle>
        <animateTransform
          attributeName="transform"
          dur="1.5s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"></animateTransform>
      </g>
    </svg>
  );
};
