cd F:\new-project
call npm run build
@echo off
echo "ʹ��bat�ű��������ļ��к��ļ�"
echo
xcopy F:\new-project\dist F:\tomcat-secops\webapps\secops\nsoc /s /e /c /y /h /r