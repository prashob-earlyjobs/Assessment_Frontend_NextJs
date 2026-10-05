import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-medium text-neutral-500">404</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-950">
        This page is not here yet.
      </h1>
      <p className="mt-3 max-w-sm text-[15px] leading-6 text-neutral-600">
        That section is still being built. Head back home to keep looking.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-9 items-center rounded-full bg-neutral-950 px-4 text-[13px] font-medium text-white"
      >
        Back home
      </Link>
    </main>
  );
}
