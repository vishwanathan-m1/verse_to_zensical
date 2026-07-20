# Upgrading older profiles on Windows

If you upgrade from an HCL Connections release that is earlier than 5.5, on Microsoft Windows, complete this procedure in Connections 5.5 to upgrade older profiles so that they work in HCL Verse.

1.  Copy the following lines into a text editor and save them as `fixhashphoto.cmd` in the `Connections\xkit\connections.sql\profiles` directory. 

    **Note:** Some text shown in this step is broken into multiple lines so that the content fits on the documentation page; the additional lines are indented. In the actual file, this text is on one line.

    ```
    @echo off
    setlocal ENABLEEXTENSIONS
    rem # ***************************************************************** 
    rem #                                                                   
    rem # Licensed Materials - Property of IBM                              
    rem #                                                                   
    rem # 5724-S31                                                          
    rem #                                                                   
    rem # Copyright IBM Corp. 2014, 2016  All Rights Reserved.              
    rem #                                                                   
    rem # US Government Users Restricted Rights - Use, duplication or       
    rem # disclosure restricted by GSA ADP Schedule Contract with           
    rem # IBM Corp.                                                         
    rem #                                                                   
    rem # ***************************************************************** 
    
    set FIXUP_DIR=%~dp0
    set MIGRATION_DIR=%FIXUP_DIR%
    set MIGRATION_DIR=%FIXUP_DIR%migrate.lib
    set DB2_USER=LCUSER
    set DB2_PASSWORD=<DB2PASSWORD>
    set DB2_HOST=<DB2HOSTNAME>
    set DB2_PORT=50000
    set JAVA_HOME=c:\IBM\WebSphere\AppServer\java
    set DB2_JAVA_HOME=C:\IBM\SQLLIB\java
    set DB2_DB_NAME=PEOPLEDB
    
    if not exist %MIGRATION_DIR% echo WARNING: Directory MIGRATION_DIR %MIGRATION_DIR% does not exist!
    if not defined DB2_JAVA_HOME echo WARNING: Env variable DB2_JAVA_HOME is not set!
    if not defined DB2_HOST echo WARNING: Env variable DB2_HOST is not set!
    if not defined DB2_PORT echo WARNING: Env variable DB2_PORT is not set!
    if not defined DB2_DB_NAME echo WARNING: Env variable DB2_DB_NAME is not set!
    if not defined DB2_USER echo WARNING: Env variable DB2_USER is not set!
    if not defined DB2_PASSWORD echo WARNING: Env variable DB2_PASSWORD is not set!
    
    echo FIXUP_DIR=%FIXUP_DIR%
    echo MIGRATION_DIR=%MIGRATION_DIR%
    echo DB2_JAVA_HOME=%DB2_JAVA_HOME%
    echo DB2_HOST:DB2_PORT=%DB2_HOST%:%DB2_PORT%
    echo DB2_DB_NAME:DB2_USER=%DB2_DB_NAME%:%DB2_USER%
    
    echo %DB2_JAVA_HOME%/jdk/bin/java -Dfile.encoding=UTF-8 -Xmx1024m -classpath ^
     %DB2_JAVA_HOME%/db2jcc.jar;%DB2_JAVA_HOME%/db2jcc_license_cu.jar;
     %MIGRATION_DIR%/profiles.migrate.jar;%MIGRATION_DIR%/commons-logging-1.0.4.jar;
     %MIGRATION_DIR%/lc.util.web-30.jar;%MIGRATION_DIR%/commons-lang-2.4.jar;
     %MIGRATION_DIR%/commons-codec-1.3-minus-mp.jar ^
     com.ibm.profiles.migrate.MigrateHashEmail jdbc:db2://%DB2_HOST%:%DB2_PORT%/%DB2_DB_NAME% 
     "%DB2_USER%" "******"
    
    %DB2_JAVA_HOME%/jdk/bin/java -Dfile.encoding=UTF-8 -Xmx1024m -classpath ^
     %DB2_JAVA_HOME%/db2jcc.jar;%DB2_JAVA_HOME%/db2jcc_license_cu.jar;
     %MIGRATION_DIR%/profiles.migrate.jar;%MIGRATION_DIR%/commons-logging-1.0.4.jar;
     %MIGRATION_DIR%/lc.util.web-30.jar;%MIGRATION_DIR%/commons-lang-2.4.jar;
     %MIGRATION_DIR%/commons-codec-1.3-minus-mp.jar ^
     com.ibm.profiles.migrate.MigrateHashEmail ^
     jdbc:db2://%DB2_HOST%:%DB2_PORT%/%DB2_DB_NAME% "%DB2_USER%" "%DB2_PASSWORD%"
    
    ```

2.  Edit `fixhashphoto.cmd`. Replace `<DB2PASSWORD>` and `<DB2HOSTNAME>` with appropriate values.

3.  At a Windows command prompt, run the fixup script:

    ```
    fixhashphotos.cmd
    ```

    Example output:

    ```
    MigrateHashEmail : Processed 100 entries in this batch.  Total updates 139200. 
    ```


**Parent topic:** [Upgrading older profiles](../admin/vop_upgrading_older_profiles.md)

