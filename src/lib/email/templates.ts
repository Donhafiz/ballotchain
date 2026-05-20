export const emailTemplates = {
  welcome: (name: string) => ({
    subject: "Welcome to BallotChain!",
    html: `<div style="background:#0a0a14;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;">
      <div style="background:linear-gradient(135deg,#6366F1,#8B5CF6);padding:30px;border-radius:12px;text-align:center;margin-bottom:24px;">
        <h1 style="margin:0;font-size:24px;">Welcome to BallotChain, ${name}!</h1>
      </div>
      <p style="font-size:16px;color:rgba(255,255,255,0.8);line-height:1.6;">Your account has been created successfully. You can now create elections, invite voters, and monitor results in real-time.</p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin-top:20px;">Go to Dashboard</a>
    </div>`,
  }),

  voteConfirmation: (name: string, electionTitle: string, candidateName: string, receipt: string) => ({
    subject: "Vote Confirmed - " + electionTitle,
    html: `<div style="background:#0a0a14;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;">
      <div style="text-align:center;margin-bottom:24px;"><span style="font-size:48px;">✅</span></div>
      <h2 style="text-align:center;margin:0 0 8px;">Vote Confirmed!</h2>
      <p style="text-align:center;color:rgba(255,255,255,0.6);">${electionTitle}</p>
      <div style="background:rgba(255,255,255,0.05);border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
        <p style="margin:0;font-size:18px;font-weight:600;">${candidateName}</p>
        <p style="margin:8px 0 0;font-size:11px;color:rgba(255,255,255,0.4);font-family:monospace;">Receipt: ${receipt}</p>
      </div>
      <p style="font-size:12px;color:rgba(255,255,255,0.3);text-align:center;">This vote has been cryptographically recorded on the blockchain.</p>
    </div>`,
  }),

  electionInvite: (electionTitle: string, accessLink: string) => ({
    subject: "You're Invited to Vote - " + electionTitle,
    html: `<div style="background:#0a0a14;color:#fff;padding:40px;font-family:sans-serif;max-width:600px;margin:0 auto;border-radius:16px;">
      <div style="background:linear-gradient(135deg,#6366F1,#8B5CF6);padding:30px;border-radius:12px;text-align:center;margin-bottom:24px;">
        <h2 style="margin:0;">🗳️ ${electionTitle}</h2>
      </div>
      <p style="font-size:16px;color:rgba(255,255,255,0.8);line-height:1.6;">You have been invited to participate in this election. Click below to cast your secure vote.</p>
      <a href="${accessLink}" style="display:inline-block;padding:14px 32px;background:linear-gradient(135deg,#6366F1,#8B5CF6);color:#fff;text-decoration:none;border-radius:10px;font-weight:600;margin-top:20px;">Cast Your Vote →</a>
      <p style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:20px;">This link is unique to you. Do not share it.</p>
    </div>`,
  }),
};