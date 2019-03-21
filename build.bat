cd F:\new-project
call npm run build
@echo off
echo "使用bat脚本来复制文件夹和文件"
echo
xcopy F:\new-project\dist F:\tomcat-accs2.0-change\webapps\accs2.0\dist /s /e /c /y /h /r