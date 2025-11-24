import * as core from "@actions/core";
import fs from "fs";

try {
  const chatId = core.getInput("chat-id");
  const token = core.getInput("token");
  const message = core.getInput("message");
  const messageFile = core.getInput("message-file");

  let mdContent;
  if (message) {
    mdContent = message;
  } else if (mdFile) {
    mdContent = fs.readFileSync(messageFile, { encoding: "utf8" });
  } else {
    throw new Error("Either md-file or md-body must be provided.");
  }

  const ret = await sendMessage(token, chatId, mdContent);
  core.info(`Send message result: ${JSON.stringify(ret)}`);
  core.setOutput("message-id", ret["message_id"]);
  core.setOutput("date", ret["date"]);
  core.setOutput("text", ret["text"]);
  core.setOutput("chat-id", ret["chat"]["id"]);
  core.setOutput("chat-title", ret["chat"]["title"]);
  core.setOutput("chat-type", ret["chat"]["type"]);
} catch (error) {
  core.setFailed(error.message);
}

// https://core.telegram.org/bots/api#sendmessage
async function sendMessage(token, chatId, message) {
  const api = `https://api.telegram.org/bot${token}/sendMessage`;
  const payload = {
    text: message,
    chat_id: chatId,
    parse_mode: "MarkdownV2",
  };

  console.log(`sendTelegram: msg:${payload}, chat:${chatId}`);
  const resp = await fetch(api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    throw new Error(
      `Send message failed: ${await resp.text()}, code: ${resp.status}`,
    );
  }

  const ret = await resp.json();
  if (!ret.ok) {
    throw new Error(
      `Send message error: ${ret.description}, code: ${ret.error_code}`,
    );
  }

  return ret.result;
}
