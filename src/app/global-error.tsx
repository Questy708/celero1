"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            backgroundColor: "#0a0a0a",
            color: "#ffffff",
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            padding: "24px",
            margin: 0,
          }}
        >
          <div style={{ textAlign: "center", maxWidth: "480px", width: "100%" }}>
            {/* Error icon */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "rgba(255, 77, 0, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 32px",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FF4D00"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>

            {/* Label */}
            <p
              style={{
                fontSize: "10px",
                letterSpacing: "0.4em",
                textTransform: "uppercase",
                color: "#FF4D00",
                fontFamily: "monospace",
                marginBottom: "24px",
              }}
            >
              Critical Error
            </p>

            {/* Heading */}
            <h1
              style={{
                fontSize: "28px",
                fontWeight: 500,
                letterSpacing: "-0.02em",
                marginBottom: "16px",
                margin: "0 0 16px 0",
              }}
            >
              Something went wrong
            </h1>

            {/* Message */}
            <p
              style={{
                fontSize: "15px",
                color: "rgba(255, 255, 255, 0.5)",
                lineHeight: 1.6,
                marginBottom: "32px",
                margin: "0 0 32px 0",
              }}
            >
              A critical error occurred. Please reload the page to continue.
            </p>

            {/* Error digest */}
            {error.digest && (
              <p
                style={{
                  fontSize: "10px",
                  fontFamily: "monospace",
                  color: "rgba(255, 255, 255, 0.2)",
                  marginBottom: "32px",
                }}
              >
                Ref: {error.digest}
              </p>
            )}

            {/* Reload button */}
            <button
              onClick={() => window.location.reload()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "16px 32px",
                backgroundColor: "#FF4D00",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                border: "none",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseOver={(e) => {
                (e.currentTarget.style.backgroundColor = "rgba(255, 77, 0, 0.9)");
              }}
              onMouseOut={(e) => {
                (e.currentTarget.style.backgroundColor = "#FF4D00");
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
                <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                <path d="M16 16h5v5" />
              </svg>
              Reload
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
