import { exists } from "https://deno.land/std@0.206.0/fs/mod.ts";
import { ElbasInterpreter } from "./basicRunner.ts";

const TEXT_STYLE = "color: #3080FF";
const ERROR_STYLE = "color: #FF0000";
const DEBUG_STYLE = "color: #505050";
const INFO_STYLE = "color: #00FF00";

// Main run
export async function run(filePath: string): Promise<void> {
    logInfo(`loading \"${filePath}\"`);

  const fileExists = await exists(filePath);
  if (!fileExists) {
    const message = "File not found!";
    logError(message);
  } else {
    const text = await Deno.readTextFile(filePath);
    const lines = text.split('\n');
    logInfo(`file has ${lines.length} lines`);
    const elbas = new ElbasInterpreter(logMessage,logInfo,logDebug, logError);
    elbas.execute(lines);
  }
}

function logMessage(message: string): void {
  console.log(`%c${message}`, TEXT_STYLE);
}

function logDebug(message: string): void {
  console.log(`  %c${message}`, DEBUG_STYLE);
}

function logInfo(message: string): void {
    console.log(`%c[!] %c${message}`, INFO_STYLE, TEXT_STYLE);
  }
  
function logError(message: string): void {
  console.log(`%c[ERROR] %c${message}`, ERROR_STYLE, TEXT_STYLE);
}
