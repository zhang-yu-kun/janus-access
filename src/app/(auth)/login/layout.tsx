import React from "react";
import "@/styles/root.scss";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
};

export default layout;
