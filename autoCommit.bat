@echo off
echo type "c" or "u"

cd "D:\GitBatches"

set GIT_PATH="C:\Program Files (x86)\Git\bin\git.exe"
set BRANCH = "devleoper"
set MASTERBRANCH = "origin/master"
set 

:P
set ACTION=
set /P ACTION=Action: %=%
if "%ACTION%"=="c" (
	%GIT_PATH%  add -A
	%GIT_PATH%  pull origin devleoper
	%GIT_PATH% commit -am "Auto-committed on  dev on %date% by my batch file"
	%GIT_PATH% push %BRANCH%

	%GIT_PATH% checkout master
	echo on master
	%GIT_PATH% pull %MASTERBRANCH%
	%GIT_PATH% merge %BRANCH%
	%GIT_PATH% commit -am "Auto-committed merged code %date% by my batch file"
	%GIT_PATH% push %MASTERBRANCH%
 	
)
if "%ACTION%"=="u" (
	%GIT_PATH% pull %BRANCH%
)
if "%ACTION%"=="exit" exit /b
goto P