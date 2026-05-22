// Biometric authentication service
// Uses Web Authentication API (WebAuthn) for fingerprint/face ID

export class BiometricAuth {
  static async isSupported(): Promise<boolean> {
    return typeof window !== "undefined" && 
           typeof PublicKeyCredential !== "undefined" &&
           await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  }

  static async register(email: string): Promise<{ success: boolean; credential?: any }> {
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: "BallotChain", id: window.location.hostname },
          user: {
            id: crypto.getRandomValues(new Uint8Array(16)),
            name: email,
            displayName: email,
          },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }],
          authenticatorSelection: {
            authenticatorAttachment: "platform",
            userVerification: "required",
          },
          timeout: 60000,
          attestation: "none",
        },
      });

      // Store credential in DB (send to server)
      await fetch("/api/auth/biometric/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, credential: { id: (credential as any).id } }),
      });

      return { success: true, credential };
    } catch (error) {
      console.error("Biometric registration failed:", error);
      return { success: false };
    }
  }

  static async authenticate(): Promise<{ success: boolean; verified?: boolean }> {
    try {
      const challenge = crypto.getRandomValues(new Uint8Array(32));
      
      const assertion = await navigator.credentials.get({
        publicKey: {
          challenge,
          rpId: window.location.hostname,
          userVerification: "required",
          timeout: 60000,
        },
      });

      return { success: true, verified: true };
    } catch (error) {
      return { success: false, verified: false };
    }
  }

  static async verifyVoter(): Promise<boolean> {
    const supported = await this.isSupported();
    if (!supported) return true; // Fallback: allow if biometric not available
    
    const result = await this.authenticate();
    return result.verified || false;
  }
}
