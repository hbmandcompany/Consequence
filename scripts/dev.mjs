import { execSync, spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const PORT = 3000;

function killPort(port) {
  let killed = false;

  try {
    if (process.platform === "win32") {
      const out = execSync(`netstat -ano | findstr :${port}`, { encoding: "utf8" });
      const pids = new Set();

      for (const line of out.split("\n")) {
        if (!line.includes("LISTENING")) continue;
        const parts = line.trim().split(/\s+/);
        const pid = parts.at(-1);
        if (pid && pid !== "0") pids.add(pid);
      }

      for (const pid of pids) {
        try {
          execSync(`taskkill /F /PID ${pid}`, { stdio: "ignore" });
          killed = true;
          console.log(`Freed port ${port} (PID ${pid})`);
        } catch {
          /* already gone */
        }
      }
    } else {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: "ignore" });
      killed = true;
      console.log(`Freed port ${port}`);
    }
  } catch {
    /* nothing listening */
  }

  return killed;
}

function cleanNextCache() {
  const nextDir = path.join(process.cwd(), ".next");
  if (!fs.existsSync(nextDir)) return;

  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log("Cleared .next cache");
}

const hadStaleServer = killPort(PORT);
if (hadStaleServer) {
  cleanNextCache();
}

console.log(`Starting Next.js on http://localhost:${PORT}`);

const child = spawn("npx", ["next", "dev", "-p", String(PORT)], {
  stdio: "inherit",
  shell: true,
  env: { ...process.env, PORT: String(PORT) },
});

child.on("exit", (code) => process.exit(code ?? 0));
