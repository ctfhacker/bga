#!/usr/bin/env bash
while inotifywait -e modify,create ./learnwithwelcometo; do 
  rsync -lvr ./learnwithwelcometo/ ./remote/learnwithwelcometo;
done
