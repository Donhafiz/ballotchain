// Email service for sending access links, receipts, and reminders
// Uses Resend.com API (free tier: 100 emails/day)

interface EmailData {
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

  async send({ to, subject, html }: EmailData): Promise<boolean> {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          from: `BallotChain <${this.from}>`,
          to,
          subject,
          html,
        }),
      });
      return res.ok;
    } catch (error) {
      console.error("Email send failed:", error);
      return false;
    }
  }

  async sendAccessLink(email: string, electionTitle: string, accessLink: string) {
    return this.send({
      to: email,
      subject: `Your Ballot: ${electionTitle}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0b0c0f;color:#fff;padding:40px;border-radius:20px"><h1 style="color:#4fffb0">BallotChain</h1><h2>${electionTitle}</h2><p style="color:#aaa">Your ballot is ready. Click below to vote securely.</p><a href="${accessLink}" style="display:inline-block;background:#4fffb0;color:#0b0c0f;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;margin:20px 0">Cast Your Vote</a><p style="color:#666;font-size:12px">This link is unique to you. Do not share.</p></div>`,
    });
  }

  async sendReceipt(email: string, electionTitle: string, candidate: string, receipt: string) {
    return this.send({
      to: email,
      subject: `Vote Confirmed: ${electionTitle}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0b0c0f;color:#fff;padding:40px;border-radius:20px"><div style="text-align:center;margin-bottom:30px"><div style="width:48px;height:48px;border-radius:50%;background:rgba(79,255,176,0.1);display:flex;align-items:center;justify-content:center;margin:0 auto">✅</div><h1 style="color:#4fffb0">Vote Confirmed!</h1></div><p style="color:#aaa">Your vote for <strong>${candidate}</strong> in <strong>${electionTitle}</strong> has been recorded.</p><div style="background:rgba(255,255,255,0.05);padding:16px;border-radius:12px;margin:20px 0"><p style="color:#666;font-size:12px">Receipt:</p><code style="color:#4fffb0;font-size:14px">${receipt}</code></div><p style="color:#666;font-size:12px">Verify at ballotchain.io/verify</p></div>`,
    });
  }

  async sendReminder(email: string, electionTitle: string, deadline: string, accessLink: string) {
    return this.send({
      to: email,
      subject: `Reminder: Vote in ${electionTitle} by ${deadline}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0b0c0f;color:#fff;padding:40px;border-radius:20px"><h1 style="color:#f59e0b">⏰ Voting Reminder</h1><h2>${electionTitle}</h2><p style="color:#aaa">Voting ends <strong>${deadline}</strong>. Cast your vote now!</p><a href="${accessLink}" style="display:inline-block;background:#4fffb0;color:#0b0c0f;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:700;margin:20px 0">Vote Now</a></div>`,
    });
  }
}

export const emailService = new EmailService();
