#!/bin/bash
FILE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
CWD=$PWD

if [ ! -d "./logs/" ]; then
  echo "Creating logs folder...."
  mkdir logs
fi

if [ -f $FILE_DIR"/create_database.sh" ]; then
  echo "Create Database:"
  source $FILE_DIR"/create_database.sh"
fi

