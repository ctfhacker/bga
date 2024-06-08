#!/usr/bin/env bash
GAME=$1

if [[ "$1" == "" ]]; then
  echo "USAGE: ./upload.sh <GAME_NAME>";
  exit 1
fi

while inotifywait -r -e modify,create ./$GAME; do 
  rsync -lvr --ignore-times --update ./$GAME/ ./remote/$GAME;
done


# inotifywait -m -e modify,create --format '%w%f' ./learnwithwelcometo |
# while read FILE
# do
#   echo "File modified: $FILE"
#   cp $FILE ./remote/learnwithwelcometo
#   echo "DONE copying.."
# done
