#!/bin/bash
function getEnvironment {
  printf "Environment: "
  read environment
}

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
}

function createDatabase {
  echo "Creating database: "$db_name
  mysql -u $root_username -p -e \
    "create database if not exists $db_name;\n
    create user if not exists '$db_username'@'localhost' identified by '$db_password';\n
    grant all privileges on $db_name.* to $db_username@'localhost';\n
    flush privileges;
    "
}

function writeEnvFile {
  printf "Writing Environment file: $environment.env"
  echo "# $environment ENV" > "$environment.env"
  echo "DATABASE_USER=$db_username" >> "$environment.env"
  echo "DATABASE_PASS=$db_password" >> "$environment.env"
  echo "DATABASE_NAME=$db_name" >> "$environment.env"
  echo "DATABASE_DIALECT=mysql" >> "$environment.env"
}

function runMigrations {
  NODE_ENV=$environment npm run migrate-seed
}

getDbCreds
getEnvironment
getRootCreds
createDatabase
writeEnvFile
runMigrations
