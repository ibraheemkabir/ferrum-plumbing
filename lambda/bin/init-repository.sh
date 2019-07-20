#!/bin/bash

echo Initializing repository to dir $1

if [ "$1" == "" ]; then
	echo SYNTAX: init-repository.sh [TARGET_DIR]
	exit -1
fi

echo g2g

# Files to copy to the target dir: package.json, tsconfig.json, webpack.config.js, src/index.ts
