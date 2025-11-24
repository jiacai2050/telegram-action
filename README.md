# Telegram Action

This GitHub Action allows you to send messages to a Telegram chat using a bot.

## Inputs
- `token`: (Required) The Telegram bot token.
- `chat-id`: (Required) The chat ID where the message will be sent (in the format `@channelusername` or negative number if it's private channel). See [how to get chat ID](https://stackoverflow.com/a/67274937/2163429) for more details.
- `message`: (Optional) The message text to be sent.
- `message-file`: (Optional) The path to a file containing the message text. **Either `message` or `message-file` must be provided.**

## Outputs
- `message-id`: The ID of the sent message.
- `date`: The date when the message was sent.
- `text`: The text of the sent message.
- `chat-id`: The ID of the chat where the message was sent.
- `chat-type`: The type of chat (e.g., private, group).
- `chat-title`: The title of the chat (if applicable).

## Example Usage

### Send using message file
```yaml
- name: Send Message from file
  uses: jiacai2050/telegram-action@v1
  with:
    token: ${{ secrets.TELEGRAM_TOKEN }}
    chat-id: "@channelName"
    message-file: "README.md"
```

### Send using message body
```yaml
- name: Send Message from file
  uses: jiacai2050/telegram-action@v1
  with:
    token: ${{ secrets.TELEGRAM_TOKEN }}
    chat-id: "@channelName"
    message: |
      # Hello Telegram
      This is a post from GitHub Actions!
```

### Print Outputs
```yaml
name: Send to Telegram
on:
  workflow_dispatch:
  push:
    branches:
      - main
jobs:
  send:
    runs-on: ubuntu-latest
    timeout-minutes: 5
    steps:
      - uses: actions/checkout@v5
      - name: Send Message
        uses: jiacai2050/telegram-action@v1
        id: telegram
        with:
          token: ${{ secrets.TELEGRAM_TOKEN }}
          chat-id: "@channelName"
          message-file: "README.md"
      - name: Print Outputs
        run: |
          echo "Message ID: ${{ steps.telegram.outputs.message-id }}"
          echo "Date: ${{ steps.telegram.outputs.date }}"
          echo "Text: ${{ steps.telegram.outputs.text }}"
          echo "Chat ID: ${{ steps.telegram.outputs.chat-id }}"
          echo "Chat Type: ${{ steps.telegram.outputs.chat-type }}"
          echo "Chat Title: ${{ steps.telegram.outputs.chat-title }}"
```
