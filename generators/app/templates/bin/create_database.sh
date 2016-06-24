#!/bin/bash
function getDbCreds {
  printf "DATABASE USERNAME: "
  read db_username
  printf "DATABASE NAME: "
  read db_name
  read -s -p "DATABASE PASSWORD: " db_password
}

function getRootCreds {
  echo ""
  printf "ROOT USERNAME: "
  read root_username

  read -s -p "ROOT PASSWORD: " root_password
}

function printCreds {
  echo ""
  echo "$db_username"
  echo "$db_password"
  echo "$db_name"
  echo "$root_username"
  echo "$root_password"
}

getDbCreds
getRootCreds
printCreds
