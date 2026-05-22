"use client";
import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
}

export default function QRCode({ value, size = 200 }: QRCodeProps) {
  return (
    <div className="bg-white p-4 rounded-2xl inline-block">
      <QRCodeSVG value={value} size={size} level="H" />
    </div>
  );
}

// Usage: <QRCode value="https://ballotchain.io/vote?election=123" />
