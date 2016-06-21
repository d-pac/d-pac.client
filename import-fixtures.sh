#!/usr/bin/env bash
DB_NAME=d-pac-test
DIR_FX=tests/e2e/fixtures
mongo $DB_NAME --eval "db.dropDatabase()"
#drops the collection first, then inserts all documents
mongoimport --db $DB_NAME --collection identitycounters --file $DIR_FX/identitycounters.json --jsonArray --drop
mongoimport --db $DB_NAME --collection phases --file $DIR_FX/phases.json --jsonArray --drop
mongoimport --db $DB_NAME --collection pages --file $DIR_FX/pages.json --jsonArray --drop
mongoimport --db $DB_NAME --collection assessments --file $DIR_FX/assessments.json --jsonArray --drop
mongoimport --db $DB_NAME --collection documents --file $DIR_FX/documents.json --jsonArray --drop
mongoimport --db $DB_NAME --collection representations --file $DIR_FX/representations.json --jsonArray --drop
mongoimport --db $DB_NAME --collection users --file $DIR_FX/users.json --jsonArray --drop
