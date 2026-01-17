"use client";
import Link from "next/link";

export default function NotFound() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    minHeight: "90vh",
    backgroundColor: "#f9fafb", // 等同于 Tailwind 的 bg-gray-50
    padding: "20px",
  };

  const contentStyle = {
    textAlign: "center" as const,
    maxWidth: "500px",
    margin: "0 auto",
    padding: "20px",
  };

  const headingStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#1f2937", // 等同于 Tailwind 的 text-gray-800
    marginBottom: "1rem",
  };

  const textStyle = {
    color: "#4b5563", // 等同于 Tailwind 的 text-gray-600
    marginBottom: "2rem",
    lineHeight: "1.5",
  };

  const linkStyle = {
    display: "inline-block",
    padding: "12px 24px",
    backgroundColor: "#2563eb", // 等同于 Tailwind 的 bg-blue-600
    color: "white",
    textDecoration: "none",
    borderRadius: "6px",
    fontWeight: "medium",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.2s ease-in-out",
  };

  const linkHoverStyle = {
    backgroundColor: "#1d4ed8", // 等同于 Tailwind 的 hover:bg-blue-700
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h2 style={headingStyle}>404 - Page Not Found</h2>
        <p style={textStyle}>
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link
          href="/"
          style={linkStyle}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              linkHoverStyle.backgroundColor)
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = linkStyle.backgroundColor)
          }
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
