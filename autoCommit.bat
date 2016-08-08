@echo off

cd "D:\GitBatches"

set GIT_PATH="C:\Program Files (x86)\Git\bin\git.exe"
set MASTERBRANCH = "origin/master"
set /p Comment="Enter  Comment to commit: "
:P
set ACTION=
set /P ACTION=Action: %=%
if "%ACTION%"=="c" (
	
	%GIT_PATH% add -A
	%GIT_PATH% pull origin devleoper
	%GIT_PATH% commit -m "%Comment%"
	%GIT_PATH% push origin devleoper

	%GIT_PATH% checkout master
	%GIT_PATH% pull %MASTERBRANCH%
	%GIT_PATH% merge devleoper
	%GIT_PATH% push %MASTERBRANCH%
 	
	%GIT_PATH% checkout devleoper
)
if "%ACTION%"=="u" (
	%GIT_PATH% pull origin devleoper
)
if "%ACTION%"=="e" exit /b
goto P