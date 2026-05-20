// ============================================
// NEXTAUTH CONFIGURATION
// PLACEMENT: src/lib/auth/auth.ts
// ============================================

import { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { prisma } from '@/lib/db/mongodb';
import { bcrypt } from 'bcryptjs';
import { JWT } from 'next-auth/jwt';
import { User } from '@/lib/models';

interface CustomJWT extends JWT {
  id?: string;
  role?: string;
  email?: string;
  organizationId?: string;
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'user@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        // Validation
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid credentials');
        }

        try {
          // Find user
          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            throw new Error('User not found');
          }

          // Check status
          if (user.status !== 'ACTIVE' && user.status !== 'PENDING_VERIFICATION') {
            throw new Error(`Account is ${user.status.toLowerCase()}`);
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(
            credentials.password as string,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          // Update last login
          await prisma.user.update({
            where: { id: user.id },
            data: {
              lastLogin: new Date(),
              lastLoginIp: '', // Set in middleware
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.firstName + ' ' + user.lastName,
            image: user.avatar,
            role: user.role,
            organizationId: user.organizationId,
            emailVerified: user.emailVerified,
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    error: '/login?error=true',
    newUser: '/register',
  },

  callbacks: {
    // JWT Callback
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.organizationId = (user as any).organizationId;
        token.email = user.email;
        token.emailVerified = (user as any).emailVerified;
      }

      return token;
    },

    // Session Callback
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: (token as CustomJWT).id || '',
          role: (token as CustomJWT).role || 'VOTER',
          organizationId: (token as CustomJWT).organizationId || null,
          emailVerified: (token as CustomJWT).emailVerified || false,
        };
      }

      return session;
    },

    // Authorized Callback (for middleware)
    async authorized({ request, auth }) {
      const pathname = request.nextUrl.pathname;

      // Public routes
      const publicRoutes = [
        '/',
        '/login',
        '/register',
        '/forgot-password',
        '/reset-password',
      ];

      if (publicRoutes.some((route) => pathname.startsWith(route))) {
        return true;
      }

      // Protected routes - require auth
      if (!auth) {
        return false;
      }

      // Admin routes
      if (pathname.startsWith('/admin')) {
        return ['SUPER_ADMIN', 'ADMIN'].includes((auth.user as any)?.role);
      }

      // Organization routes
      if (pathname.startsWith('/organization')) {
        return ['ORG_ADMIN', 'ORG_MANAGER'].includes((auth.user as any)?.role);
      }

      // Voter routes
      if (pathname.startsWith('/voter')) {
        return (auth.user as any)?.role === 'VOTER' || ['ORG_ADMIN', 'ORG_MANAGER'].includes((auth.user as any)?.role);
      }

      return true;
    },
  },

  events: {
    async signIn({ user, account, profile, isNewUser }) {
      console.log(`User signed in: ${user.email}`);
    },

    async signOut({ token }) {
      console.log(`User signed out`);
    },
  },

  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // Refresh every hour
  },

  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 24 * 60 * 60, // 24 hours
  },

  // Custom session object for database
  trustHost: true,
};

export default authConfig;