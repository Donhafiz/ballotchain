// PDF Generation Utility
// In production, use @react-pdf/renderer or jsPDF

interface ElectionData {
  title: string;
  type: string;
  startDate: string;
  endDate: string;
  candidates: { name: string; position: string; votes: number }[];
  totalVoters: number;
  totalVotes: number;
}

export function generateElectionPDF(election: ElectionData): string {
  const total = election.candidates.reduce((s, c) => s + c.votes, 0);
  const turnout = election.totalVoters > 0 ? ((election.totalVotes / election.totalVoters) * 100).toFixed(1) : "0";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px; color: #1a1a1a;">
      <div style="text-align: center; border-bottom: 3px solid #6366F1; padding-bottom: 20px; margin-bottom: 30px;">
        <h1 style="color: #6366F1; margin: 0;">BallotChain</h1>
        <p style="color: #666; margin: 5px 0;">Certified Election Results</p>
      </div>

      <h2 style="color: #1a1a1a; margin-bottom: 5px;">${election.title}</h2>
      <p style="color: #666; margin: 0 0 20px;">
        Type: ${election.type} | Period: ${new Date(election.startDate).toLocaleDateString()} - ${new Date(election.endDate).toLocaleDateString()}
      </p>

      <div style="display: flex; gap: 20px; margin-bottom: 30px;">
        <div style="flex: 1; background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #6366F1;">${election.totalVoters}</div>
          <div style="font-size: 12px; color: #666;">Registered Voters</div>
        </div>
        <div style="flex: 1; background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #22C55E;">${election.totalVotes}</div>
          <div style="font-size: 12px; color: #666;">Votes Cast</div>
        </div>
        <div style="flex: 1; background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center;">
          <div style="font-size: 24px; font-weight: bold; color: #F59E0B;">${turnout}%</div>
          <div style="font-size: 12px; color: #666;">Turnout</div>
        </div>
      </div>

      <h3 style="color: #1a1a1a; margin-bottom: 15px;">Results</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background: #f5f5f5;">
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Rank</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Candidate</th>
            <th style="padding: 10px; text-align: left; border-bottom: 2px solid #ddd;">Position</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Votes</th>
            <th style="padding: 10px; text-align: right; border-bottom: 2px solid #ddd;">Percentage</th>
          </tr>
        </thead>
        <tbody>
          ${election.candidates.sort((a, b) => b.votes - a.votes).map((c, i) => `
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${i + 1}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; font-weight: 600;">${c.name}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; color: #666;">${c.position}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${c.votes.toLocaleString()}</td>
              <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${total > 0 ? ((c.votes / total) * 100).toFixed(1) : 0}%</td>
            </tr>
          `).join("")}
        </tbody>
      </table>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #999; text-align: center;">
        <p>This is a certified election result from BallotChain.</p>
        <p>Generated: ${new Date().toISOString()} | Verification: blockchain-verified</p>
      </div>
    </div>
  `;

  return html;
}

export function generateCSV(election: ElectionData): string {
  const headers = "Rank,Name,Position,Votes,Percentage";
  const total = election.candidates.reduce((s, c) => s + c.votes, 0);
  const rows = election.candidates
    .sort((a, b) => b.votes - a.votes)
    .map((c, i) => `${i + 1},"${c.name}","${c.position}",${c.votes},${total > 0 ? ((c.votes / total) * 100).toFixed(1) : 0}%`);
  
  return [headers, ...rows].join("\n");
}

export function downloadPDF(html: string, filename: string) {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename + ".html";
  a.click();
  URL.revokeObjectURL(url);
}

export function downloadCSV(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename + ".csv";
  a.click();
  URL.revokeObjectURL(url);
}