cd F:\new-project
call npm run build
@echo off
echo "ʹ��bat�ű��������ļ��к��ļ�"
echo
xcopy F:\new-project\dist F:\tomcat-accs2.0-change\webapps\accs2.0\dist /s /e /c /y /h /r