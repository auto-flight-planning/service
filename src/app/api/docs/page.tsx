"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function ApiDocsPage() {
  return (
    <main className="p-4">
      <SwaggerUI url="/api/swagger" />
    </main>
  );
}
