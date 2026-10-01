import { ImageResponse } from "next/og";
import { fullAddress, site } from "@/lib/site";

export const alt = `${site.name} — timber and furniture in Dang, Nepal`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#1a2620",
          color: "#eceee6",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 56,
              border: "5px solid #eceee6",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div style={{ width: 18, height: 18, borderRadius: 18, background: "#d43d27" }} />
          </div>
          <div style={{ fontSize: 30, letterSpacing: 2, textTransform: "uppercase" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 128,
              fontWeight: 800,
              lineHeight: 0.95,
              letterSpacing: -3,
              textTransform: "uppercase",
            }}
          >
            From log to living room.
          </div>
          <div style={{ marginTop: 36, fontSize: 32, color: "#a9b5aa" }}>
            Timber sawn to size · Wooden goods · Furniture to order
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 28,
          }}
        >
          <div style={{ width: 48, height: 4, background: "#d43d27" }} />
          {fullAddress}
        </div>
      </div>
    ),
    size,
  );
}
