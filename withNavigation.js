import React from "react";
import { useNavigation } from "@react-navigation/native";

const withNavigation = (Component) => (props) => {
  const navigation = useNavigation();
  return <Component {...props} navigation={navigation} />;
};

export default withNavigation;
