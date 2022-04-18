import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import { signIn, useSession, signOut } from "next-auth/react";

export function SignInButton() {
  const session = useSession();

  console.log(session)

  const isUserLoggedIn = session.status === "authenticated";

  return isUserLoggedIn ? (
    <button
      onClick={() => signOut()}
    className={styles.signInButtons}>
      <FaGithub color="#04d361" />
      {session.data.user.name}
      <FiX className={styles.closeIcon} color="#737380" />
    </button>
  ) : (
    <button onClick={() => signIn("github")} className={styles.signInButtons}>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
}
