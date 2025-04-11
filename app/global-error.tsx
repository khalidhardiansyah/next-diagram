"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h1>Error!</h1>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
