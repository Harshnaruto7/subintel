
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// const INTERVAL = 60 * 60 * 1000; // 1 hour

const INTERVAL = 60 * 1000; // 1 minute

async function runScheduler() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/subscriptions/process-reminders",
      {
        headers: {
          Authorization: `Bearer ${process.env.CRON_SECRET}`,
        },
      }
    );

    const data = await response.json();

    console.log("Reminder processor result:");
    console.log(data);
  } catch (error) {
    console.error("Scheduler error:", error);
  }
}

console.log("Local reminder scheduler started.");

runScheduler();

setInterval(runScheduler, INTERVAL);
