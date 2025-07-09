import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { colors } from '../../utils/theme';

const theme = {
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    text: colors.text,
    error: colors.error,
  },
  roundness: 8,
};

const Theme = ({ children }) => {
  return (
    <PaperProvider theme={theme}>
      {children}
    </PaperProvider>
  );
};

export default Theme;