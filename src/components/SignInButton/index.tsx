import styles from "./styles.module.scss";
import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

export function SignInButton() {
  const isUserLoggedIn = true;

  return isUserLoggedIn ? (
    <button className={styles.signInButtons}>
      <FaGithub color="#04d361" />
      ViniciosDB
      <FiX className={styles.closeIcon} color="#737380" />
    </button>
  ) : (
    <button className={styles.signInButtons}>
      <FaGithub color="#eba417" />
      Sign in with GitHub
    </button>
  );
}
