import { NextResponse } from "next/server";
import { z } from "zod";
import { jwtVerify } from "jose";

const schema = z.object({
  licenseToken: z.string().min(20),
  installationId: z.string().min(8).max(200)
});

function getPublicKey() {
  const value = process.env.LICENSE_PUBLIC_KEY;
  if (!value) throw new Error("LICENSE_PUBLIC_KEY is not configured.");
  return value.replace(/\\n/g, "\n");
}

export async function POST(request: Request) {
  try {
    const { licenseToken, installationId } = schema.parse(await request.json());

    const publicKey = await crypto.subtle.importKey(
      "spki",
      Buffer.from(getPublicKey().replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s/g, ""), "base64"),
      { name: "Ed25519" },
      false,
      ["verify"]
    );

    const result = await jwtVerify(licenseToken, publicKey, {
      issuer: process.env.LICENSE_ISSUER || "armati-marketing",
      audience: process.env.LICENSE_AUDIENCE || "armati-marketing-client",
    });

    if (result.payload.product !== "armati-marketing") {
      return NextResponse.json({ error: "Wrong product." }, { status: 403 });
    }

    const installations = Array.isArray(result.payload.installations)
      ? result.payload.installations.map(String)
      : [];

    if (installations.length && !installations.includes(installationId)) {
      return NextResponse.json({ error: "Installation is not licensed." }, { status: 403 });
    }

    return NextResponse.json({
      active: true,
      customerId: result.payload.sub ?? null,
      expiresAt: result.payload.exp ? new Date(result.payload.exp * 1000).toISOString() : null
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ active: false, error: "Invalid or expired license." }, { status: 403 });
  }
}
