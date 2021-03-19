#!/bin/bash

export DOCKERHOST=${APPLICATION_URL-$(docker run --rm --net=host codenvy/che-ip)}

# Running on Windows?
if [[ "$OSTYPE" == "msys" ]]; then
  # Prefix interactive terminal commands ...
  terminalEmu="winpty"
fi

while getopts v:h FLAG; do
  case $FLAG in
    v ) VOLUMES=$OPTARG ;;
    h ) usage ;;
    \? ) #unrecognized option - show help
      echo -e \\n"Invalid script option: -${OPTARG}"\\n
      usage
      ;;
  esac
done
shift $((OPTIND-1))

function toLower() {
  echo $(echo ${@} | tr '[:upper:]' '[:lower:]')
}

function initEnv() {

  if [ -f .env ]; then
    while read line; do
      if [[ ! "$line" =~ ^\# ]] && [[ "$line" =~ .*= ]]; then
        export ${line//[$'\r\n']}
      fi
    done <.env
  fi

  for arg in "$@"; do
    # Remove recognized arguments from the list after processing.
    shift
    case "$arg" in
      *=*)
        export "${arg}"
        ;;
      *)
        # If not recognized, save it for later procesing ...
        set -- "$@" "$arg"
        ;;
    esac
  done

  IP=""
  IPS=""
  if [ ! -z $(echo ${1} | grep '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}') ]; then 
    if [[ $1 == *","* ]]; then
      IPS="$1"
    else
      IP="$1"
    fi
  fi
  export IP="$IP" IPS="$IPS"

  export LOG_LEVEL=${LOG_LEVEL:-info}
  export RUST_LOG=${RUST_LOG:-warning}
}

function runCliCommand() {
  initEnv "$@"

  cliCmd="${1}"
  shift || cliCmd=""

  cmd="${terminalEmu} docker-compose \
    --log-level ERROR run "

  if [ -z "${VOLUMES}" ] && [ -d "${DEFAULT_CLI_SCRIPT_DIR}" ] ; then
    VOLUMES=$(realpath ${DEFAULT_CLI_SCRIPT_DIR})
  fi

#   if [ ! -z "${VOLUMES}" ]; then
#     shopt -s extglob
#     paths=$(echo "${VOLUMES}" | sed -n 1'p' | tr ',' '\n')
#     for path in ${paths}; do
#       path=${path%%+(/)}
#       mountPoint=${path##*/}
#       if [[ "$OSTYPE" == "msys" ]]; then
#         # When running on Windows, you need to prefix the path with an extra '/'
#         path="/${path}"
#       fi
#       cmd+=" --volume='${path}:/home/indy/${mountPoint}'"
#     done
#   fi

  # Need to escape quotes and commas so they don't get removed along the way ...
  escapedArgs=$(echo $@ | sed "s~'~\\\'~g" | sed 's~\"~\\"~g')
  
  # Quote the escaped args so docker-compose does not try to perform any processing on them ...
  # Separate the command and the args so they don't get treated as one argument by the scripts in the container ...
  cmd+="
    --rm client \
    ./scripts/manage ${cliCmd} \"${escapedArgs}\""

  eval ${cmd}
}
# =================================================================================================================

pushd ${SCRIPT_HOME} >/dev/null
COMMAND=$(toLower ${1})
shift || COMMAND=usage

case "${COMMAND}" in
  start|up)
      initEnv "$@"
      docker-compose \
        --log-level ERROR up \
        -d admin_app admin_server mongodb
      docker-compose \
        --log-level ERROR logs \
        -f
    ;;
  start-local)
      initEnv "$@"
      docker-compose \
        --log-level ERROR up \
        -d admin_server mongodb
      docker-compose \
        --log-level ERROR logs \
        -f
    ;;
  start-web)
      initEnv "$@"
      docker-compose \
        --log-level ERROR up \
        -d admin_app
      docker-compose \
        --log-level ERROR logs \
        -f admin_app
    ;;
  cli)
      runCliCommand $@
    ;;
  logs)
      initEnv "$@"
      docker-compose \
        --log-level ERROR logs \
        -f
    ;;
  stop)
      initEnv "$@"
      docker-compose \
        --log-level ERROR stop
    ;;
  down|rm)
      initEnv "$@"
      docker-compose \
        --log-level ERROR down \
        -v
    ;;
  build)
      docker-compose build 
    ;;
  rebuild)
      docker-compose build 
    ;;
  dockerhost)
      echo -e \\n"DockerHost: ${DOCKERHOST}"\\n
    ;;
  *)
      usage;;
esac

popd >/dev/null
