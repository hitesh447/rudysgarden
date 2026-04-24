$files = @("services.html", "index.html", "portfolio.html", "about.html", "contact.html")
foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        # Replace broken em-dash and real em-dash with hyphen
        $content = $content -replace 'â€”', '-'
        $content = $content -replace '—', '-'
        # Remove all non-ASCII characters (this will strip emojis and corrupted symbols)
        $content = $content -replace '[^\x00-\x7F]', ''
        Set-Content -Path $f -Value $content -Encoding UTF8
    }
}
