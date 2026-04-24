import os

files = ['services.html', 'index.html', 'portfolio.html', 'about.html', 'contact.html']

for file in files:
    if not os.path.exists(file): continue
    
    with open(file, 'rb') as f:
        content = f.read()
        
    text = content.decode('utf-8', errors='ignore')
    
    # fix the corrupted em-dash and real em-dash
    text = text.replace('â€”', '-')
    text = text.replace('—', '-')
    
    # remove all non-ASCII characters
    cleaned = ''.join(c for c in text if ord(c) < 128)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(cleaned)
