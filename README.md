# Java Portal Project - Blog by Adrian Nemeth

Authentication is not working even though its configed properly. (at least I think :P ) Trace says the following: 

>>> 2017-05-02 21:03:39,300 TRACE [org.jboss.security] (default task-27) PBOX00240: Begin login method

>>> 2017-05-02 21:03:39,300 DEBUG [org.jboss.security] (default task-27) PBOX00283: Bad password for username manager

>>> 2017-05-02 21:03:39,300 TRACE [org.jboss.security] (default task-27) PBOX00244: Begin abort method, overall result: false

>>> 2017-05-02 21:03:39,301 TRACE [org.jboss.security] (default task-27) PBOX00244: Begin abort method, overall result: false

>>> 2017-05-02 21:03:39,301 DEBUG [org.jboss.security] (default task-27) PBOX00206: Login failure: javax.security.auth.login.FailedLoginException: PBOX00070: Password invalid/Password required

Standalone config:
```sh
<security-domain name="secureDomain" cache-type="default">
                    <authentication>
                        <login-module code="Database" flag="required">
                            <module-option name="dsJndiName" value="java:jboss/datasources/MySqlDS"/>
                            <module-option name="principalsQuery" value="select passwd from users where username=?"/>
                            <module-option name="rolesQuery" value="select role, 'Roles' from userroles where username=?"/>
                            <module-option name="hashAlgorithm" value="SHA-256"/>
                            <module-option name="hashEncoding" value="base64"/>
                        </login-module>
                    </authentication>
</security-domain>
```

```sh
                <datasource jndi-name="java:jboss/datasources/MySqlDS" pool-name="MySqlDS" enabled="true" use-ccm="true">
                    <connection-url>jdbc:mysql://localhost:3306/mysql</connection-url>
                    <driver-class>com.mysql.jdbc.Driver</driver-class>
                    <driver>mysql</driver>
                    <security>
                        <user-name>root</user-name>
                    </security>
                </datasource>
```

I'm sure the password is good, see sql dump. I left the configs in the files anyway.
