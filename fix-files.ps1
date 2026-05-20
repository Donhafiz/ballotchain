# Create a helper function
function Write-FileSafe {
    param([string]$Path, [string]$Content)
    $utf8 = New-Object System.Text.UTF8Encoding $false
    [System.IO.File]::WriteAllText("$PWD\$Path", $Content, $utf8)
    Write-Host "Fixed: $Path" -ForegroundColor Green
}

# Fix Dashboard Layout
Write-FileSafe "src/app/(dashboard)/layout.tsx" @"
import Link from "next/link";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="font-bold text-lg text-gray-900 dark:text-white">BallotChain</span>
              </Link>
              <nav className="hidden md:flex items-center gap-4">
                <Link href="/dashboard" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Dashboard</Link>
                <Link href="/dashboard/elections" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Elections</Link>
                <Link href="/dashboard/results" className="text-gray-600 dark:text-gray-300 hover:text-primary-600">Results</Link>
              </nav>
            </div>
            <Link href="/login" className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600">Sign Out</Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
"@

# Fix MongoDB connection
Write-FileSafe "src/lib/db/mongodb.ts" @"
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/ballotchain";

let cached = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((m) => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
"@

# Fix User model
Write-FileSafe "src/lib/models/User.ts" @"
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ["admin", "voter", "observer"], default: "voter" },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model("User", userSchema);
"@

# Fix Register API
Write-FileSafe "src/app/api/auth/register/route.ts" @"
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { firstName, lastName, email, password } = await req.json();
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }
    await connectDB();
    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }
    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({ firstName, lastName, email, password: hashed });
    return NextResponse.json({ message: "Account created", user: { id: user._id, email: user.email } }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
"@

# Fix Login API
Write-FileSafe "src/app/api/auth/login/route.ts" @"
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db/mongodb";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "ballotchain-secret-key";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }
    await connectDB();
    const user = await User.findOne({ email }).select("+password");
    if (!user) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return NextResponse.json({ token, user: { id: user._id, firstName: user.firstName, email: user.email, role: user.role } });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
"@

Write-Host "`nAll files fixed!" -ForegroundColor Green