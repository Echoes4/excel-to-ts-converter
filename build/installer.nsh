!macro customInit
  ; 检查并卸载旧版本
  ReadRegStr $R0 HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\{${UNINSTALL_APP_KEY}}" "UninstallString"
  ${If} $R0 != ""
    ; 发现旧版本，执行卸载
    ExecWait '$R0 /S _?=$INSTDIR'
  ${EndIf}
!macroend 