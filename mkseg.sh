#!/bin/bash
# usage: mkseg.sh <n> <shotname> <croplead>
cd /c/Users/ethan/startup-usa-guide-video
FF="/c/Users/ethan/AppData/Local/Microsoft/WinGet/Packages/Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe/ffmpeg-9.0.2-full_build/bin/ffmpeg.exe"
FONT="C\:/Windows/Fonts/segoeui.ttf"
"$FF" -y -i shots/$2.jpg -vf "$3scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0x0b1220,scale=2880:1620,zoompan=z='min(1+0.0003*on,1.05)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=180:s=1920x1080:fps=30,drawbox=x=0:y=ih-110:w=iw:h=110:color=black@0.62:t=fill,drawtext=fontfile='$FONT':textfile=cap/$1.txt:fontcolor=white:fontsize=44:x=(w-text_w)/2:y=h-72,fade=t=in:st=0:d=0.5,fade=t=out:st=5.5:d=0.5,format=yuv420p" -frames:v 180 -c:v libx264 -preset medium -crf 18 seg/$1.mp4 > seg/$1.log 2>&1
