@echo off
echo type "commit" or "update"

cd "D:\GitBatches"

set GIT_PATH="C:\Program Files (x86)\Git\bin\git.exe"
set BRANCH = "origin/devleoper"
set MASTERBRANCH = "origin/master"
set 

:P
set ACTION=
set /P ACTION=Action: %=%
if "%ACTION%"=="c" (
	%GIT_PATH%  add -a
	%GIT_PATH%  pull %BRANCH%
	%GIT_PATH% commit -am "Auto-committed on  dev on %date% by my batch file"
	%GIT_PATH% push %BRANCH%

	%GIT_PATH% checkout %MASTERBRANCH%
	%GIT_PATH% pull %MASTERBRANCH%
	%GIT_PATH% merge %BRANCH%
	%GIT_PATH% push %MASTERBRANCH%
 	
)
if "%ACTION%"=="u" (
	%GIT_PATH% pull %BRANCH%
)
if "%ACTION%"=="exit" exit /b
goto P