import { CSSProperties } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Proptype = {
  count?: number;
  height?: string | number;
  width?: string | number;
  isCircle?: boolean;
  borderRadius?: string | number;
  style?: CSSProperties;
};

const SkeletonComp = ({
  count = 5,
  isCircle = false,
  height = "20px",
  width = "100%",
  borderRadius = "0.25rem",
  style = {},
}: Proptype) => {
  return (
    <Skeleton
      count={count}
      circle={isCircle}
      height={height}
      width={width}
      borderRadius={borderRadius}
      style={style}
    />
  );
};

export default SkeletonComp;
