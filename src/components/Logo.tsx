import { Img, useColorMode } from "@chakra-ui/react";
import invertedLogo from "../assets/logo-inverted.png";
import logo from "../assets/logo.png";
const Logo = ({ width = 150, height }: { width?: number; height?: number }) => {
  const { colorMode } = useColorMode();
  const dynamicLogo = colorMode === "dark" ? logo : invertedLogo;
  return <Img height={height} width={width} src={dynamicLogo} />;
};

export default Logo;
