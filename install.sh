#!/usr/bin/bash
REPO=$(pwd)
SERVICE_FOLDER="/etc/systemd/system/"
FILENAME="bot.service"
FILEPATH="${SERVICE_FOLDER}${FILENAME}"


function info {
    #string to show info
    echo -e "\e[36mINFO\e[0m ${1}"
}

function error {
    #string to show errors and exit	
    echo -e "\e[91mERROR\e[0m ${1}"
    exit 1
}

function change {
    #string to show changes	
    echo -e "\e[93mCHANGE\e[0m ${1}"
}

function test_if_node_installed {
   #Checks if Node is installed  
   NODE=$(which node 2> /dev/null)\
	    && info "Node installed" \
	    || error "Node not installed\nPlease install Nodejs using your package manager."
}

function create_tmp_file {
   #Ensures that the tmp systemd file exists
   change "created /tmp/${1}"
   touch "/tmp/${1}"
   echo "">"/tmp/${1}"
   TMP_FILEPATH="/tmp/${1}"
}

function create_systemd_file {
   #Populates the bot.service template with local variables
   change "created systemd file" 
   cat bot.service | while read line
   do 
   	eval echo  "${line}">>"${1}"
   done
}

function install_systemd_file {
   #Installs the system.service file for use with systemd 
   info "installing systemd file"
   sudo cp "/tmp/${FILENAME}" "${FILEPATH}" || error "Requires sudo"
   info "reloading daemon and restarting service"
   sudo systemctl daemon-reload \
	&& sudo systemctl restart $FILENAME || error "Requires sudo"
}


test_if_node_installed
create_tmp_file  $FILENAME
create_systemd_file $TMP_FILEPATH
install_systemd_file $TMP_FILEPATH




