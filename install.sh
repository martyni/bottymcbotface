#!/usr/bin/bash
REPO=$(pwd)
SERVICE_FOLDER="/etc/systemd/system/"
FILENAME="bot.service"
FILEPATH="${SERVICE_FOLDER}${FILENAME}"

eval echo "creating /tmp/$FILENAME"
touch /tmp/$FILENAME
echo "">/tmp/$FILENAME

echo "creating systemd file" 
cat bot.service | while read line
do 
	eval echo $line>>"/tmp/${FILENAME}"
done
echo "installing systemd file"
sudo cp "/tmp/${FILENAME}" "${FILEPATH}" 
echo "reloading daemon and restarting service"
sudo systemctl daemon-reload \
	&& sudo systemctl restart $FILENAME



