#!/bin/bash

#download node and npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -v
npm -v
exit 125
#create our working directory if it doesnt exist
DIR="/home/projects/expense-tracker"
if [ -d "$DIR" ]; then
  echo "${DIR} exists."
else
  echo "Creating ${DIR} directory."
  mkdir -p ${DIR}
fi
