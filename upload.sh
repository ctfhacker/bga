#!/usr/bin/env bash
while inotifywait -e modify,create ./barbershoppertesthearts; do 
  rsync -lvr ./barbershoppertesthearts/ ./remote/barbershoppertesthearts; 
done
