import Cookies from "js-cookie";

const BACKEND = (process.env.NEXT_PUBLIC_BACKEND_URL || "https://earlyjobs.ai/api").replace(/\/$/, "");

type ApiBody = {
  success?: boolean;
  message?: string;
  data?: { accessToken?: string; message?: string };
  user?: { userId?: string };
};

async function request(path: string, init?: RequestInit): Promise<ApiBody> {
  const token = Cookies.get("accessToken");
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.body) headers.set("Content-Type", "application/json");
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const response = await fetch(`${BACKEND}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
  const body = (await response.json().catch(() => ({}))) as ApiBody;
  if (!response.ok && body.success === undefined) {
    return { success: false, message: body.message || "Request failed", data: body.data };
  }
  return body;
}

export function sendCreatorOtp(phoneNumber: string, email: string) {
  return request("/auth/send-otp", {
    method: "POST",
    body: JSON.stringify({
      phoneNumber,
      email,
      franchiseId: "",
      tochangePassword: false,
      toLogin: false,
    }),
  });
}

export function verifyCreatorOtp(phoneNumber: string, email: string, otp: string) {
  return request("/auth/verify-otp", {
    method: "POST",
    body: JSON.stringify({ phoneNumber, email, otp, toLogin: false }),
  });
}

export async function signupCreator(input: {
  name: string;
  email: string;
  mobile: string;
  location: string;
  password: string;
}) {
  const body = await request("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: input.name,
      email: input.email,
      mobile: input.mobile,
      password: input.password,
      currentCity: input.location,
      role: "creator",
    }),
  });
  const accessToken = body.data?.accessToken;
  if (accessToken) Cookies.set("accessToken", accessToken, { expires: 7 });
  return body;
}

export function getLoggedInCreator() {
  return request("/auth/is-logged-in");
}

export async function createCreatorCoupons(referrerId: string) {
  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);
  const coupons = [5, 10, 15].map((discountValue) => ({
    code: `${referrerId}${String(discountValue).padStart(2, "0")}`,
    discountType: "percentage",
    discountValue,
    maxUsage: 5,
    expiresAt: expiresAt.toISOString(),
    isActive: true,
    minOrderValue: 0,
  }));

  try {
    await Promise.all(
      coupons.map((coupon) =>
        request("/offers", {
          method: "POST",
          body: JSON.stringify(coupon),
        }).then((result) => {
          if (result.success === false) throw new Error(result.message || "Failed to create coupon");
        }),
      ),
    );
    return { success: true as const };
  } catch (error) {
    return {
      success: false as const,
      message: error instanceof Error ? error.message : "Failed to create creator coupons",
    };
  }
}
