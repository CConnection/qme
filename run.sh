# exit when any command fails
set -e

###############################################################################
# Execution environment
###############################################################################
export TMPDIR=/private$TMPDIR
export DEBUG=0

###############################################################################
# Helper functions
###############################################################################

usage() {
  echo "Usage:"
  echo -n "$0 "
  set | grep -e "^task_" | sed "s/^task_\(.*\)().*/\1/" | xargs | sed "s/ / | /g"
  exit 1
}

###############################################################################
# Dependency
###############################################################################

task_install_dependencies() {
  npm install
  npm run install:frontend
  npm run install:backend
}

###############################################################################
# Client Config
###############################################################################

task_generate_frontend_config() {
  local env=$1

  if [[ -z $env ]]
  then 
    echo "error: missing environment"
    exit 1
  fi 

  parameter_store="$(./node_modules/firebase-tools/lib/bin/firebase.js --project $env functions:config:get fb.config)"

  touch ./frontend/.env
 
  echo "firebaseConfigApiKey=$(echo $parameter_store | jq '.api.key')" > ./frontend/.env
  echo "firebaseConfigAuthDomain=$(echo $parameter_store | jq '.auth.domain')" >> ./frontend/.env
  echo "firebaseConfigDatabaseUrl=$(echo $parameter_store | jq '.database.url')" >> ./frontend/.env
  echo "firebaseConfigProjectId=$(echo $parameter_store | jq '.project.id')" >> ./frontend/.env
  echo "firebaseConfigStorageBucket=$(echo $parameter_store | jq '.storage.bucket')" >> ./frontend/.env
  echo "firebaseConfigMessagingSenderId=$(echo $parameter_store | jq '.messaging.sender.id')" >> ./frontend/.env
  echo "firebaseConfigAppId=$(echo $parameter_store | jq '.app.id')" >> ./frontend/.env
  echo "firebaseConfigMeasurementId=$(echo $parameter_store | jq '.measurement.id')" >> ./frontend/.env

  cat ./frontend/.env
}

###############################################################################
# Build
###############################################################################

task_build() {
  local env=$1

  if [[ -z $env ]]
  then 
    echo "error: missing environment"
    exit 1
  fi 

  task_generate_frontend_config $env

  npm run build:frontend
  npm run build:backend
}

###############################################################################
# Clean
###############################################################################

task_clean() {
  echo "hello clean up"
}

###############################################################################
# Run
###############################################################################
task_start_dev() {
  concurrently "cd backend && npm run start:dev" "cd frontend && npm run dev" 
}


###############################################################################
# Run
###############################################################################

task_run() {
  concurrently "cd backend && npm run start:dev" "cd frontend && npm run build && npm run dev" "firebase serve"
}

###############################################################################
# Run
###############################################################################

task_cypress_open() {
  ./frontend/node_modules/.bin/cypress open
}

###############################################################################
# Test
###############################################################################
task_test_unit_frontend() {
 (cd frontend && npm run test)
}

task_test_unit_backend() {
 (cd backend && npm run test)
}

task_test_unit() {
   task_test_unit_frontend
   task_test_unit_backend
}

###############################################################################
# Database
###############################################################################
task_database_create_table() {
    echo "Hello create table"
}

task_database_seed_table() {
    echo "Hello seed table"
}

task_database_delete_table() {
  echo "Hello delete table"
}

###############################################################################
# Deploy
###############################################################################
task_deploy() {
  local env=$1

  if [[ -z $env ]]
  then 
    echo "error: missing environment"
    exit 1
  fi 
  
  ./node_modules/firebase-tools/lib/bin/firebase.js deploy --project=$env
} 

###############################################################################
# dependencies, test, build & deploy to dev
###############################################################################

task_test_build_deploy() {
  local env=$1

  if [[ -z $env ]]
  then 
    echo "error: missing environment"
    exit 1
  fi

  task_install_dependencies
  task_test_unit
  task_test_integration
  task_test_functional
  task_build
  task_deploy $env
}

###############################################################################
# Docker
###############################################################################

main() {
  CMD=${1:-}
  shift || true
  if type "task_${CMD}" &> /dev/null; then
    "task_${CMD}" "$@"
  else
    usage
  fi
}

main "$@"
