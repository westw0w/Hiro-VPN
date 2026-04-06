import type { ICustomIconProps } from "./types";


const CustomIcon = (props: ICustomIconProps) => {
  const {
    id,
    className,
    width,
    height
  } = props;
  const iconId = `#${id}`

  return (
    <svg width={width} height={height} className={className}>
      <use xlinkHref={iconId} />
    </svg>
  );
};

export default CustomIcon;