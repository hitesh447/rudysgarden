import os

replacements = {
    "ðŸŒ¿": "🌿",
    "ðŸ  ": "🏠",
    "âœ¨": "✨",
    "âœ‚ï¸ ": "✂️",
    "ðŸŒ¸": "🌸",
    "ðŸŒ³": "🌳",
    "ðŸŒ±": "🌱",
    "ðŸ’¡": "💡",
    "â›²": "⛲",
    "ðŸ ¡": "🏡",
    "ðŸ’§": "💧",
    "ðŸ§±": "🧱",
    "ðŸ”§": "🔧",
    "ðŸªµ": "🪵",
    "âš¡": "⚡",
    "ðŸŽ¨": "🎨",
    "ðŸ —ï¸ ": "🏗️",
    "ðŸ”©": "🔩",
    "ðŸ’¬": "💬",
    "ðŸ“ž": "📞",
    "ðŸ“ ": "📍",
    "âœ‰ï¸ ": "✉️",
    "âœ…": "✅",
    "ðŸ•’": "🕒",
    "â€”": "—"
}

file_path = "services.html"

with open(file_path, "r", encoding="utf-8") as f:
    text = f.read()

for k, v in replacements.items():
    text = text.replace(k, v)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(text)

print("Replacement done.")
