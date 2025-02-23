
import SplitText from "@/components/Words/SplitText";
import AnimatedContent from "@/components/animated/popup";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="h-screen w-screen bg-zinc-900 flex flex-col items-center justify-center gap-10"
    >
      <SplitText
        text="Hello, Developer IT-DEV ECS 2.0"
        className="text-6xl font-semibold text-center text-white"
        delay={150}
        animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
        animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
        easing={(t: number) => t}
        threshold={0.2}
        rootMargin="-50px"
      />
      <AnimatedContent
        distance={150}
        direction="vertical"
        reverse={false}
        config={{ tension: 40, friction: 20 }}
        initialOpacity={0.1}
        animateOpacity
        scale={1.1}
        threshold={0.2}
      >
        <Link href={`/oprec-itdev/`} className="border border-white px-7 py-3 hover:bg-yellow-600 text-white duration-500 rounded-xl">Next</Link>
      </AnimatedContent>

    </div>
  );
}
