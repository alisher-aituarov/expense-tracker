#!/bin/sh

cd server
mkdir -p node_modules
docker cp expensetracker_server:/app/node_modules ./