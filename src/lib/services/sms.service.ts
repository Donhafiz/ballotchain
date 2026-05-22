// SMS service using Twilio for voter notifications
// Install: npm install twilio

class SMSService {
  private accountSid: string;
  private authToken: string;
  private fromNumber: string;

  constructor() {
    this.accountSid = process.env.TWILIO_ACCOUNT_SID || "";
    this.authToken = process.env.TWILIO_AUTH_TOKEN || "";
    this.fromNumber = process.env.TWILIO_PHONE_NUMBER || "+233501234567";
  }

  async send(to: string, message: string): Promise<boolean> {
    try {
      // For demo, just log. In production, uncomment Twilio call.
      console.log(`[SMS] To: ${to} | Message: ${message}`);
      
      // Real Twilio implementation:
      // const twilio = require("twilio");
      // const client = twilio(this.accountSid, this.authToken);
      // await client.messages.create({ body: message, from: this.fromNumber, to });
      
      return true;
    } catch (error) {
      console.error("SMS send failed:", error);
      return false;
    }
  }

  async sendAccessCode(phone: string, accessCode: string, electionTitle: string) {
    return this.send(phone, `BallotChain: Your access code for ${electionTitle} is ${accessCode}. Vote at ballotchain.io/vote or dial *713*123#`);
  }

  async sendReminder(phone: string, electionTitle: string, deadline: string, accessCode: string) {
    return this.send(phone, `BallotChain Reminder: ${electionTitle} ends ${deadline}. Vote now with code ${accessCode}. Dial *713*123#`);
  }

  async sendReceipt(phone: string, receipt: string, candidate: string) {
    return this.send(phone, `BallotChain: Vote recorded! Candidate: ${candidate}. Receipt: ${receipt}. Verify at ballotchain.io/verify`);
  }

  async sendBulk(voters: { phone: string; accessCode: string }[], electionTitle: string) {
    const results = [];
    for (const voter of voters) {
      const sent = await this.sendAccessCode(voter.phone, voter.accessCode, electionTitle);
      results.push({ phone: voter.phone, sent });
    }
    return results;
  }
}

export const smsService = new SMSService();
