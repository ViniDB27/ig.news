import { render, screen, fireEvent } from "@testing-library/react";
import { useSession, signIn } from "next-auth/react";
import { mocked } from "ts-jest/utils";
import { SubscribeButton } from ".";
// import { useRouter } from "next/router";

jest.mock("next/router", () => {
  return {
    useRouter() {
      return {
        push: jest.fn(),
      };
    },
  };
});

jest.mock("next-auth/react");

describe("SubscribeButton component", () => {
  it("renders correctly", () => {
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    expect(screen.getByText("Subscribe now")).toBeInTheDocument();
  });

  it("redirect user ot sign in when no authentication", () => {
    const signInMocked = mocked(signIn);
    const useSessionMocked = mocked(useSession);

    useSessionMocked.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText("Subscribe now");

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  // it("redirect user ot /posts when authentication and has subscritpion", () => {
  //   const useRouterMocked = mocked(useRouter);
  //   const useSessionMocked = mocked(useSession);

  //   useSessionMocked.mockReturnValueOnce({
  //     data: null,
  //     status: "authenticated",
  //   });

  //   const pushMocke = jest.fn();

  //   useRouterMocked.mockReturnValueOnce({
  //     push: pushMocke,
  //   } as any);

  //   render(<SubscribeButton />);

  //   const subscribeButton = screen.getByText("Subscribe now");

  //   fireEvent.click(subscribeButton);

  //   expect(pushMocke).not.toHaveBeenCalled();
  // });

});
