#!/bin/bash
# Standalone html faylni index.html sifatida nusxalash
cp "/Users/macbookpro/Desktop/Xarakteristika hisoblash web sayt loyihasi/texno-optom-gaming-quiz_1.html" "/Users/macbookpro/Desktop/Quize/index.html"

cd /Users/macbookpro/Desktop/Quize
git add .
git commit -m "Auto commit from Push-to-Github script"
git branch -M main
git push -u origin main
echo "==================================="
echo "Muvaffaqiyatli yuklandi!"
echo "==================================="
sleep 3
