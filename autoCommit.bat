@echo off
echo type "commit" or "update"

cd "D:\GitBatches"

set GIT_PATH="C:\Program Files (x86)\Git\bin\git.exe"
set BRANCH = "origin/master"

:P
set ACTION=
set /P ACTION=Action: %=%
if "%ACTION%"=="c" (
  %GIT_PATH% add -A
	%GIT_PATH% commit -am "Auto-committed on %date% by my batch file"
	%GIT_PATH% pull %BRANCH%
	%GIT_PATH% push %BRANCH%
)
if "%ACTION%"=="u" (
	%GIT_PATH% pull %BRANCH%
)
if "%ACTION%"=="exit" exit /b

goto P