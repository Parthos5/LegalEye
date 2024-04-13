@echo off

curl -X POST ^
  --data-binary "audio_data=@20230607_me_canadian_wildfires.mp3" ^
  http://localhost:8080/transcribe