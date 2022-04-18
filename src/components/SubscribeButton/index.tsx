import styles from "./styles.module.scss";

import { useSession, signIn } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripejs";

interface SubscribeButtonProps {
  productId: string;
}

export function SubscribeButton({ productId }: SubscribeButtonProps) {
  const sessio = useSession();

  async function handleSubscribe() {
    if (sessio.status !== "authenticated") {
      signIn("github");
      return;
    }

    //checkout session
    try {
      const response = await api.post("subscrib");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (err) {
      console.log(err);
      alert(err.message);
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={styles.subscribeButton}
    >
      Subscribe now
    </button>
  );
}
