// Email service using Resend
// Install: npm install resend

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  private apiKey: string;
  private from: string;

  constructor() {
    this.apiKey = process.env.SMTP_PASS || "";
    this.from = process.env.FROM_EMAIL || "noreply@ballotchain.io";
  }

  async send(options: EmailOptions) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: `BallotChain <${this.from}>`,
          to: options.to,
          subject: options.subject,
          html: options.html,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Email send failed:", error);
        return { success: false, error };
      }

      const data = await res.json();
      return { success: true, data };
    } catch (error) {
      console.error("Email send error:", error);
      return { success: false, error };
    }
  }

  async sendAccessLink(email: string, electionTitle: string, accessLink: string) {
    return this.send({
      to: email,
      subject: `Your Ballot: ${electionTitle}`,
      html: `
        <div style="font-family: 'Manrope', sans-serif; max-width: 600px; margin: 0 auto; background: #0b0c0f; color: #fff; padding: 40px; border-radius: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #4fffb0; font-size: 24px;">Ballot<span style="color: #fff;">Chain</span></h1>
          </div>
          <h2 style="font-size: 20px; margin-bottom: 16px;">Your Ballot is Ready: ${electionTitle}</h2>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            You have been invited to vote in this election. Your vote is secured with end-to-end encryption and will be recorded on the blockchain.
          </p>
          <a href="${accessLink}" style="display: inline-block; background: linear-gradient(135deg, #4fffb0, #00d4ff); color: #0b0c0f; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; font-size: 14px;">
            Cast Your Vote →
          </a>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px; margin-top: 24px;">
            This link is unique to you. Do not share it with anyone.
          </p>
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.06);">
            <p style="color: rgba(255,255,255,0.2); font-size: 11px;">
              🔒 End-to-end encrypted · 🛡️ SOC 2 compliant · ⛓️ Blockchain verified
            </p>
          </div>
        </div>
      `,
    });
  }

  async sendVoteReceipt(email: string, electionTitle: string, candidateName: string, receipt: string) {
    return this.send({
      to: email,
      subject: `Vote Confirmed: ${electionTitle}`,
      html: `
        <div style="font-family: 'Manrope', sans-serif; max-width: 600px; margin: 0 auto; background: #0b0c0f; color: #fff; padding: 40px; border-radius: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="width: 48px; height: 48px; border-radius: 50%; background: rgba(79,255,176,0.1); display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
              <span style="font-size: 24px;">✅</span>
            </div>
            <h1 style="color: #4fffb0; font-size: 20px;">Vote Confirmed!</h1>
          </div>
          <p style="color: rgba(255,255,255,0.6); font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
            Your vote for <strong style="color: #fff;">${candidateName}</strong> in <strong style="color: #fff;">${electionTitle}</strong> has been recorded and anchored to the blockchain.
          </p>
          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <p style="color: rgba(255,255,255,0.4); font-size: 12px; margin: 0 0 4px;">Receipt Hash:</p>
            <code style="color: #4fffb0; font-size: 12px; word-break: break-all;">${receipt}</code>
          </div>
          <p style="color: rgba(255,255,255,0.3); font-size: 12px;">
            You can verify your vote at any time using this receipt on the BallotChain blockchain explorer.
          </p>
        </div>
      `,
    });
  }
}

export const emailService = new EmailService();
