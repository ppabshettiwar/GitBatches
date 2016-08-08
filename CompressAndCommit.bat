@echo off
cd "D:\GitBatches"
set GIT_PATH="C:\Program Files (x86)\Git\bin\git.exe"
set MASTERBRANCH = "origin/master"

rmdir /S /Q application_js_min
rmdir /S /Q application_css_min
mkdir application_js_min
mkdir application_js_min\templates
mkdir application_js_min\debug
mkdir application_css_min
mkdir application_css_min\img

	copy application_js\templates\*.* application_js_min\templates\
	for /f "delims=|" %%f in ('dir /b application_js\*.js' ) do java -jar yuicompressor-2.4.8.jar --type js -o application_js_min\%%f application_js\%%f
	copy application_js\*.js application_js_min\debug\

	copy application_css\img\*.* application_css_min\img\
		rem for /f "delims=|" %%f in ('dir /b application_css\*.css' ) do java -jar yuicompressor-2.4.8.jar --nomunge --type css -o application_css_min\%%f application_css\%%f
	copy application_css\*.* application_css_min\

	cd application_js
	%GIT_PATH% ls-files -z | xargs -0 %GIT_PATH% update-index --assume-unchanged

	cd..
	cd application_css
	%GIT_PATH% ls-files -z | xargs -0 %GIT_PATH% update-index --assume-unchanged
	
	set /p Comment="Enter  Comment to commit: "
	cd..	
:P
	set ACTION=
	set /P ACTION=Action: %=%
	if "%ACTION%"=="c" (
		%GIT_PATH% checkout master
		%GIT_PATH% pull %MASTERBRANCH%
		%GIT_PATH% merge devleoper
		%GIT_PATH% push %MASTERBRANCH%
 	
		%GIT_PATH% checkout devleoper
		
	)
	
	if "%ACTION%"=="e" exit /b
	goto P