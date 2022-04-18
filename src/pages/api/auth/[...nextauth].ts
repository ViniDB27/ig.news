import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";

import { fauna } from "../../../services/fauna";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      scope: "read:user",
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const {
        user: { email },
      } = user;

      try {
        await fauna.query(
          q.If(
            q.Not(
              q.Exists(
                q.Match(
                  q.Index("user_by_email"),
                  q.Casefold(email)
                )
              )
            ),
            q.Create(q.Collection("users"), {
              data: { email },
            }),
            q.Get(
              q.Match(
                q.Index("user_by_email"),
                q.Casefold(email)
              )
            )
          )
        );

        return true;
      } catch {
        return false;
      }
    },
  },
});
