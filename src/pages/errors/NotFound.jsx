import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import animation404 from "@/assets/animations/404NotFound.lottie";

export default function NotFound() {
  return (
    <DotLottieReact
      src={animation404}
      autoplay
      loop
      className="w-[110%] h-screen"
    />
  );
}