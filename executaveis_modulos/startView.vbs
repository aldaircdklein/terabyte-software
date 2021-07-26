strComputer ="."

set objWMIService = GetObject("winmgmts:" _
	& "{impersonationLevel=impersonate}!\\" & strComputer & "\root\cimv2")

set colProcesses=objWMIService.ExecQuery _
	("Select * from Win32_Process Where Name = 'TerabyteSoftware.exe'")

For Each Processo In colProcesses
	msgbox"Programa ja aberto ou em andamento de abertura!",vbInformation,"Terabyte Software - Aviso"
	WScript.Quit
Next

Set WshShell = WScript.CreateObject( "WScript.shell" )
WshShell.Run "C:\\terabytesoftware-x64\\frontend\\TerabyteSoftware.exe",0,0
WScript.Quit
