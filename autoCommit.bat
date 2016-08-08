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
  %GIT_PATH% add -A
	
	%GIT_PATH% checkout %MASTERBRANCH%
	%GIT_PATH% merge %BRANCH%
	%GIT_PATH% push
 	%GIT_PATH% commit -am "Auto-committed on master from dev on %date% by my batch file"
	
)
if "%ACTION%"=="u" (
	%GIT_PATH% pull %BRANCH%
)
if "%ACTION%"=="exit" exit /b
goto P