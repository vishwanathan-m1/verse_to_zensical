# Upgrading older profiles on Linux

If you upgrade from an HCL Connections release that is earlier than 5.5, on Linux, complete this procedure in Connections 5.5 to upgrade older profiles so that they work in {{ fullVerseProductName }}.

1.  Extract `Connections_5.5_Wizards_lin_aix.tar`:

    ```
    
    cd /opt/
    cp /tmp/Connections_5.5_Wizards_lin_aix.tar
    tar -xvf Connections_5.5_Wizards_lin_aix.tar
              
    ```

2.  Change the directory:

    ```
    
    cd /opt/Wizards/connections.sql/profiles/db2/fixup/
              
    ```

3.  Copy the file `fixup50j.sh`:

    ```
    cp fixup50j.sh fixhashphoto.sh
    
    ```

4.  Allow permission:

    ```
    chmod a+x fixhashphoto.sh
    ```

5.  Edit `fixhashphoto.sh`. Replace `<PASSWORD>` and `<peopledb_hostname>` with appropriate values.

    **Note:** Some text shown in this step is broken into multiple lines so that the content fits on the documentation page; the additional lines are indented. In the actual file, this text is on one line.

    ```
    #!/bin/bash
    
    DB2_PASSWORD=<PASSWORD>
    DB2_USER=LCUSER
    JAVA_HOME=/opt/IBM/WebSphere/AppServer/java
    DB2_JAVA_HOME=/opt/ibm/db2/V10.5/java
    DB2_HOST=<peopledb_hostname>
    DB2_PORT=50000
    DB2_DB_NAME=PEOPLEDB
    
    FIXUP_DIR=`dirname $0`
    MIGRATION_DIR=`dirname ${FIXUP_DIR}`
    MIGRATION_DIR=`dirname ${MIGRATION_DIR}`/migrate.lib
    
    echo $JAVA_HOME/bin/java -Dfile.encoding=UTF-8 -Xmx1024m -classpath \
    ${DB2_JAVA_HOME}/db2jcc.jar:${DB2_JAVA_HOME}/db2jcc_license_cu.jar:
       ${MIGRATION_DIR}/profiles.migrate.jar:
       ${MIGRATION_DIR}/commons-logging-1.0.4.jar:
       ${MIGRATION_DIR}/lc.util.web-30.jar:
       ${MIGRATION_DIR}/commons-lang-2.4.jar:
       ${MIGRATION_DIR}/commons-codec-1.3-minus-mp.jar \
    com.ibm.profiles.migrate.MigrateHashEmail \
    jdbc:db2://${DB2_HOST}:${DB2_PORT}/${DB2_DB_NAME} \
    "${DB2_USER}" "******"
    
    $JAVA_HOME/bin/java -Dfile.encoding=UTF-8 -Xmx1024m -classpath \
    ${DB2_JAVA_HOME}/db2jcc.jar:${DB2_JAVA_HOME}/db2jcc_license_cu.jar:
       ${MIGRATION_DIR}/profiles.migrate.jar:
       ${MIGRATION_DIR}/commons-logging-1.0.4.jar:
       ${MIGRATION_DIR}/lc.util.web-30.jar:
       ${MIGRATION_DIR}/commons-lang-2.4.jar:
       ${MIGRATION_DIR}/commons-codec-1.3-minus-mp.jar \
    com.ibm.profiles.migrate.MigrateHashEmail \
    jdbc:db2://${DB2_HOST}:${DB2_PORT}/${DB2_DB_NAME} \
    "${DB2_USER}" "${DB2_PASSWORD}"
    
    ```

6.  Run the `fixup` script:

    ```
    
    cd /opt/Wizards/connections.sql/profiles
    ./db2/fixup/fixhashphoto.sh
    
    ```

    Example output:

    ```
    
    MigrateHashEmail : Processed 100 entries in this batch. 
    Total updates 139200.
    
    ```

7.  To check that a profile was updated:

    ```
    
    select PROF_IDHASH from EMPINST.EMPLOYEE where prof_uid='<UID_FROM_USER>'
    ```


**Parent topic:** [Upgrading older profiles](../admin/vop_upgrading_older_profiles.md)

