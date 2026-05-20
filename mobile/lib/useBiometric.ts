import { useState, useEffect } from "react";
import * as LocalAuthentication from "expo-local-authentication";

export function useBiometric() {
  const [supported, setSupported] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    checkSupport();
  }, []);

  const checkSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const enrolled = await LocalAuthentication.isEnrolledAsync();
    setSupported(compatible && enrolled);
  };

  const authenticate = async (): Promise<boolean> => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verify your identity to vote",
        fallbackLabel: "Use password",
        disableDeviceFallback: false,
      });
      setAuthenticated(result.success);
      return result.success;
    } catch {
      return false;
    }
  };

  return { supported, authenticated, authenticate };
}