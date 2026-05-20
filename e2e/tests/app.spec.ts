import { test, expect } from "@playwright/test";

test.describe("BallotChain E2E Tests", () => {
  test("Homepage loads correctly", async ({ page }) => {
    await page.goto("/home");
    await expect(page.locator("h1")).toContainText("Democratic Voting");
    await expect(page.locator("text=LIVE")).toBeVisible();
  });

  test("Login flow works", async ({ page }) => {
    await page.goto("/login");
    await page.fill('input[type="email"]', "test@ballotchain.com");
    await page.fill('input[type="password"]', "password123");
    await page.click('button[type="submit"]');
    await page.waitForURL("**/dashboard");
    await expect(page.locator("text=Good")).toBeVisible();
  });

  test("Dashboard loads with sidebar", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=Overview")).toBeVisible();
    await expect(page.locator("text=Elections")).toBeVisible();
    await expect(page.locator("text=Settings")).toBeVisible();
  });

  test("Create election flow", async ({ page }) => {
    await page.goto("/dashboard/elections/create");
    await page.fill('input[placeholder*="Student Council"]', "Test Election");
    await page.click("text=Next");
    await expect(page.locator("text=Candidate")).toBeVisible();
  });

  test("Voter dashboard loads", async ({ page }) => {
    await page.goto("/voter");
    await expect(page.locator("text=My Voting Dashboard")).toBeVisible();
  });

  test("Admin panel accessible", async ({ page }) => {
    await page.goto("/dashboard/admin");
    await expect(page.locator("text=Admin Control Panel")).toBeVisible();
  });

  test("API health check", async ({ request }) => {
    const res = await request.get("/api/health");
    expect(res.status()).toBe(200);
    const data = await res.json();
    expect(data.status).toBe("ok");
  });

  test("Register API works", async ({ request }) => {
    const res = await request.post("/api/auth/register", {
      data: { firstName: "Test", lastName: "User", email: "test@e2e.com", password: "password123" },
    });
    expect(res.status()).toBeLessThan(500);
  });
});