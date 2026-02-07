import { type JSX } from "react";

export default function PageLoader({
  isLoading,
}: {
  isLoading: boolean;
}): JSX.Element {
  return (
    <div
      className={`${"pointer-events-none"} fixed inset-0 z-50 flex h-full flex-col overflow-hidden transition-all duration-500`}
    >
      <section
        className={`${!isLoading && "-mt-100"} bg-base-100 flex h-1/2 w-full flex-col items-center justify-end transition-all duration-500`}
      >
        <div className="flex h-20 w-40 items-end rounded-t-full bg-red-500">
          <div className="flex h-2 w-full bg-black"></div>
        </div>
      </section>
      <section
        className={`${!isLoading && "mt-500"} bg-base-100 flex h-1/2 w-full flex-col items-center justify-start transition-all duration-500`}
      >
        <div className="h-20 w-40 rounded-b-full bg-white">
          <div className="flex h-2 w-full bg-black"></div>
        </div>
      </section>
    </div>
  );
}
