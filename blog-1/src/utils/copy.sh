#!bin/sh
cd /Users/huangting/demo/nodejs-blog/blog-1/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log