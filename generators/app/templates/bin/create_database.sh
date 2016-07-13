#!/bin/bash

function getDbCreds {
  printf "DATABASE USERNAME: "
  read db_username
  printf "DATABASE NAME: "
  read db_name
  read -s -p "DATABASE PASSWORD: " db_password
  echo ""
}

function getRootCreds {
  printf "ROOT USERNAME: "
  read root_username
  read -s -p "ROOT PASSWORD: " root_password
  echo ""
}

function createDatabase {
  if [ "$1" ]; then
    env_name=$1
    if [ $1 != "production" ]; then
      rel_db_name="${db_name}_${env_name}"
    else
      rel_db_name="${db_name}"
    fi
    echo ""
    echo "Creating database: ${rel_db_name}"
    echo "This will modify base files in mysql to allow for start issues"
    echo "between versions by setting innodb file format to BARRACUDA"
    echo "and turning on large prefix"
    SQL="set global innodb_file_format = BARRACUDA;\n
    set global innodb_large_prefix = ON;\n
    create database if not exists $rel_db_name;\n
    grant all privileges on $rel_db_name.* to $db_username@'localhost' identified by '${db_password}';\n
    flush privileges;
    "
    if [ -z "$root_password" ]; then
      echo "Please enter ROOT database password"
      mysql -u $root_username -p$root_password -e "${SQL}"
    else
      mysql -u $root_username -e "${SQL}"
    fi
    echo ""
  else
    echo "Could not create database"
  fi
}

function writeEnvFile {
  if [ "$1" ]; then
    env_name=$1
    printf "Writing Environment file: $env_name.env"
    echo "# $env_name ENV" > "$env_name.env"
    echo "DATABASE_USER=$db_username" >> "$env_name.env"
    echo "DATABASE_PASS=$db_password" >> "$env_name.env"
    echo "DATABASE_NAME=$rel_db_name" >> "$env_name.env"
    echo "DATABASE_DIALECT=mysql" >> "$env_name.env"
    echo ""
  else
    echo "Environment names could not be found."
  fi
}

function runMigrations {
  NODE_ENV=$1 npm run migrate-seed
}

getDbCreds
getRootCreds
environments=(development testing production)
for var in ${environments[@]};
do
  createDatabase "${var}"
  writeEnvFile "${env_name}"
  runMigrations "${var}"
done
