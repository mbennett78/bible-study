// Sign-in, from start to finish, against a pretend Supabase:
// first sign-in with the starter password, a second device, forgotten password (code and
// link), expired links, wrong passwords, staying signed in offline, signing out of this
// device only, and a shared tablet keeping each person's journal apart.
// Run: node tests/e2e/auth.mjs
import { chromium, serve, check, finish, fakeSupabase, signInPage } from "./harness.mjs";

const site = await serve();
const browser = await chromium.launch();
const people = [
  { id: "mel", email: "mel@example.com", password: "biblestudy", app: { role: "organizer" } },
  { id: "dad", email: "dad@example.com", password: "olive-tree-7", meta: { own_password: true } },
];
const fake = fakeSupabase(people);
const visible = (page, sel) => page.$eval(sel, (el) => !el.hidden && getComputedStyle(el).display !== "none").catch(() => false);
const text = (page, sel) => page.$eval(sel, (el) => el.textContent.replace(/\s+/g, " ").trim()).catch(() => "");
async function signIn(page, email, password) {
  await page.fill("#gateEmail", email); await page.fill("#gatePassword", password);
  await page.click("#gateForm button[type=submit]"); await page.waitForTimeout(900);
}
async function finishSetup(page) {
  for (let i = 0; i < 8 && (await page.$eval("#setup", (d) => d.open)); i++) { await page.click("#setupNext"); await page.waitForTimeout(150); }
}

let stopped = null;
try {
  // 1. Wrong password, then the starter password: setup asks for their own password.
  {
    const { ctx, page } = await signInPage(browser, site.url, fake);
    await page.goto(site.url); await page.waitForTimeout(800);
    check("sign-in screen shows when signed out", await visible(page, "#gate"));
    check("starter password is not printed on the sign-in screen", !(await text(page, "#gate")).toLowerCase().includes("biblestudy"));
    await signIn(page, "mel@example.com", "wrong");
    check("wrong password gives a plain message", /don't match/.test(await text(page, "#gateErr")), await text(page, "#gateErr"));
    await page.click(".pw-show[data-show=gatePassword]");
    check("Show reveals the password", (await page.getAttribute("#gatePassword", "type")) === "text");
    await signIn(page, "Mel@Example.com ", "biblestudy");
    check("email is matched without caring about capitals or spaces", !(await visible(page, "#gate")));
    check("first-time setup opens", await page.$eval("#setup", (d) => d.open));
    // Walk to the password step.
    for (let i = 0; i < 4 && !(await page.$("#setupPw")); i++) {
      if (await page.$("#setupName")) await page.fill("#setupName", "Mel");
      await page.click("#setupNext"); await page.waitForTimeout(200);
    }
    check("setup asks for their own password", Boolean(await page.$("#setupPw")));
    await page.fill("#setupPw", "biblestudy"); await page.fill("#setupPw2", "biblestudy"); await page.click("#setupPwSave");
    check("the starter password is refused as a new one", /different from the starter/.test(await text(page, "#setupPwMsg")));
    await page.fill("#setupPw", "grace-2026"); await page.fill("#setupPw2", "grace-2025"); await page.click("#setupPwSave");
    check("mismatched passwords are caught", /don't match/.test(await text(page, "#setupPwMsg")));
    await page.fill("#setupPw2", "grace-2026"); await page.fill("#setupPw", "grace-2026"); await page.click("#setupPwSave"); await page.waitForTimeout(500);
    check("new password saved", /saved/.test(await text(page, "#setupPwMsg")), await text(page, "#setupPwMsg"));
    const put = fake.calls.findLast((c) => c.method === "PUT" && c.path === "/auth/v1/user");
    check("the account is marked as having its own password", put?.body?.data?.own_password === true);
    check("starter reminder is cleared", await page.evaluate(() => !localStorage.getItem("bible-study:pw-starter")));
    // Finish setup and reload: stays signed in, no password nag.
    await finishSetup(page);
    await page.reload(); await page.waitForTimeout(900);
    check("stays signed in after reopening", !(await visible(page, "#gate")));
    check("no password nag after it was changed", !(await page.$(".pw-sheet[open]")));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(600);
    check("the family organizer sees the organizer tools", await visible(page, "#organizerBox"));
    // Sign out from the account button: this device only.
    await page.click("#acctBtn"); await page.waitForTimeout(200);
    await page.click("#acctOut"); await page.waitForTimeout(1200);
    const out = fake.calls.findLast((c) => c.path === "/auth/v1/logout");
    check("sign out only signs out this device", /scope=local/.test(out?.query || ""), out?.query);
    check("back to the sign-in screen after signing out", await visible(page, "#gate"));
    check("old password no longer works", (await signIn(page, "mel@example.com", "biblestudy"), /don't match/.test(await text(page, "#gateErr"))));
    check("no page errors (first device)", !page.errors.length, page.errors.join(" | "));
    await ctx.close();
  }

  // 2. A second device: signing in with their own password skips the password step.
  {
    const { ctx, page } = await signInPage(browser, site.url, fake);
    await page.goto(site.url); await page.waitForTimeout(800);
    await signIn(page, "dad@example.com", "olive-tree-7");
    const html = await page.$eval("#setup", (d) => d.innerHTML);
    let sawPw = false;
    for (let i = 0; i < 5; i++) { if (await page.$("#setupPw")) sawPw = true; if (!(await page.$eval("#setup", (d) => d.open))) break; await page.click("#setupNext"); await page.waitForTimeout(150); }
    check("second device: setup opens", html.length > 0);
    check("second device: no password step", !sawPw);
    check("second device: no password nag", !(await page.$(".pw-sheet[open]")));
    await page.evaluate(() => document.querySelector(".tabbar [data-view=settings]").click()); await page.waitForTimeout(600);
    check("other family members never see the organizer tools or Bible keys", !(await visible(page, "#organizerBox")) && !(await visible(page, "#bibleTextCard")));
    await ctx.close();
  }

  // 3. Forgot password with the 6-digit code (the link may open in a different browser).
  {
    const seed = { setup: { done: true }, tourSeen: true, name: "Mel" };
    const { ctx, page } = await signInPage(browser, site.url, fake, { seed });
    await page.goto(site.url); await page.waitForTimeout(800);
    await page.click("#gateForgot");
    check("forgot needs the email first", /Type your email first/.test(await text(page, "#gateErr")));
    await page.fill("#gateEmail", "stranger@example.com"); await page.click("#gateForgot"); await page.waitForTimeout(300);
    check("an unknown email is told kindly", /isn't on the family list/.test(await text(page, "#gateErr")), await text(page, "#gateErr"));
    await page.fill("#gateEmail", "mel@example.com"); await page.click("#gateForgot"); await page.waitForTimeout(400);
    const otp = fake.calls.findLast((c) => c.path === "/auth/v1/otp");
    check("the email never creates a new account", otp?.body?.create_user === false, JSON.stringify(otp?.body));
    check("code box appears", await visible(page, "#gateCodeForm"));
    await page.fill("#gateCode", "999999"); await page.click("#gateCodeForm button[type=submit]"); await page.waitForTimeout(400);
    check("a wrong code is explained", /didn't work or has expired/.test(await text(page, "#gateErr")), await text(page, "#gateErr"));
    await page.fill("#gateCode", "123456"); await page.click("#gateCodeForm button[type=submit]"); await page.waitForTimeout(1000);
    check("the right code signs in", !(await visible(page, "#gate")));
    check("asked to choose a new password", Boolean(await page.$(".pw-sheet[open]")));
    await page.fill("#pwNew", "grace-2026"); await page.fill("#pwNew2", "grace-2026"); await page.click("#pwSave"); await page.waitForTimeout(400);
    check("reusing the current password is explained", /already have/.test(await text(page, "#pwSheetMsg")), await text(page, "#pwSheetMsg"));
    await page.fill("#pwNew", "mercy-2026"); await page.fill("#pwNew2", "mercy-2026"); await page.click("#pwSave"); await page.waitForTimeout(1800);
    check("new password saved after reset", !(await page.$(".pw-sheet[open]")) && people[0].password === "mercy-2026");
    await page.reload(); await page.waitForTimeout(900);
    check("not asked again after the reset", !(await page.$(".pw-sheet[open]")));
    check("no page errors (reset)", !page.errors.length, page.errors.join(" | "));
    await ctx.close();
  }

  // 4. An expired or already-used email link.
  {
    const { ctx, page } = await signInPage(browser, site.url, fake);
    await page.goto(`${site.url}#error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired`); await page.waitForTimeout(900);
    check("expired link explained on the sign-in screen", /expired or was already used/.test(await text(page, "#gateErr")), await text(page, "#gateErr"));
    await ctx.close();
  }

  // 5. Offline after the sign-in is more than an hour old: still opens to read.
  {
    const old = { access_token: "tok-dad", token_type: "bearer", expires_in: 3600, expires_at: Math.floor(Date.now() / 1000) - 600, refresh_token: "ref-dad", user: { id: "dad", email: "dad@example.com", aud: "authenticated", user_metadata: { own_password: true } } };
    const seed = { setup: { done: true }, tourSeen: true, owner: "dad" };
    const { ctx, page } = await signInPage(browser, site.url, fake, { seed });
    await ctx.addInitScript((s) => localStorage.setItem("bible-study:auth", JSON.stringify(s)), old);
    await page.goto(site.url); await page.waitForTimeout(1200);
    check("offline with an old sign-in still opens the app", !(await visible(page, "#gate")));
    check("no page errors (offline)", !page.errors.length, page.errors.join(" | "));
    await ctx.close();
  }

  // 6. One tablet, two people: each journal stays with its owner.
  {
    const seed = { setup: { done: true }, tourSeen: true };
    const { ctx, page } = await signInPage(browser, site.url, fake, { seed });
    await page.goto(site.url); await page.waitForTimeout(800);
    await signIn(page, "dad@example.com", "olive-tree-7");
    await page.evaluate(() => { const s = JSON.parse(localStorage.getItem("bible-study:v1")); s.journal = { "JHN.3": { text: "Dad's private note", updated: new Date().toISOString() } }; localStorage.setItem("bible-study:v1", JSON.stringify(s)); });
    await page.reload(); await page.waitForTimeout(800);
    await page.click("#acctBtn"); await page.waitForTimeout(200); await page.click("#acctOut"); await page.waitForTimeout(1200);
    await signIn(page, "mel@example.com", "mercy-2026");
    const melSees = await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).journal);
    check("the next person doesn't see the last person's journal", !JSON.stringify(melSees).includes("Dad's private note"));
    await page.evaluate(() => { const d = document.querySelector(".pw-sheet[open]"); if (d) d.close(); });
    await page.click("#acctBtn"); await page.waitForTimeout(200); await page.click("#acctOut"); await page.waitForTimeout(1200);
    await signIn(page, "dad@example.com", "olive-tree-7");
    const dadSees = await page.evaluate(() => JSON.parse(localStorage.getItem("bible-study:v1")).journal);
    check("signing back in brings their journal back", JSON.stringify(dadSees).includes("Dad's private note"));
    check("no page errors (shared tablet)", !page.errors.length, page.errors.join(" | "));
    await ctx.close();
  }
} catch (e) {
  stopped = e;
} finally {
  await browser.close();
  site.close();
  finish(stopped);
}
