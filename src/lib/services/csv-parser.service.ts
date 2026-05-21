// CSV parser for voter import
export interface ParsedVoter {
  firstName: string;
  lastName: string;
  email: string;
  department?: string;
  year?: string;
}

export function parseVoterCSV(csvContent: string): { voters: ParsedVoter[]; errors: string[] } {
  const lines = csvContent.split(/\r?\n/).filter(line => line.trim());
  const errors: string[] = [];
  const voters: ParsedVoter[] = [];

  if (lines.length < 2) {
    return { voters: [], errors: ["CSV must have a header row and at least one data row"] };
  }

  const headers = lines[0].split(",").map(h => h.trim().toLowerCase());

  // Validate required columns
  const requiredColumns = ["email"];
  const missingColumns = requiredColumns.filter(col => !headers.includes(col));
  if (missingColumns.length > 0) {
    return { voters: [], errors: [`Missing required columns: ${missingColumns.join(", ")}`] };
  }

  for (let i = 1; i < lines.length; i++) {
    try {
      const values = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g, ""));
      const record: Record<string, string> = {};
      headers.forEach((header, index) => {
        record[header] = values[index] || "";
      });

      // Validate email
      if (!record.email || !record.email.includes("@")) {
        errors.push(`Row ${i + 1}: Invalid email "${record.email}"`);
        continue;
      }

      voters.push({
        firstName: record.firstname || record.first_name || record.first || "",
        lastName: record.lastname || record.last_name || record.last || "",
        email: record.email,
        department: record.department || record.dept || undefined,
        year: record.year || record.grade || undefined,
      });
    } catch (error) {
      errors.push(`Row ${i + 1}: Failed to parse`);
    }
  }

  return { voters, errors };
}

export function generateVoterCSV(voters: ParsedVoter[]): string {
  const headers = ["firstName", "lastName", "email", "department", "year"];
  const rows = voters.map(v => [
    v.firstName,
    v.lastName,
    v.email,
    v.department || "",
    v.year || "",
  ].map(field => `"${field}"`).join(","));
  
  return [headers.join(","), ...rows].join("\n");
}
