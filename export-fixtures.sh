DB_NAME=d-pac-test
DIR_FX=tests/e2e/fixtures
mongoexport --db $DB_NAME --collection identitycounters --out $DIR_FX/identitycounters.json --jsonArray
mongoexport --db $DB_NAME --collection phases --out $DIR_FX/phases.json --jsonArray
mongoexport --db $DB_NAME --collection pages --out $DIR_FX/pages.json --jsonArray
mongoexport --db $DB_NAME --collection assessments --out $DIR_FX/assessments.json --jsonArray
mongoexport --db $DB_NAME --collection documents --out $DIR_FX/documents.json --jsonArray
mongoexport --db $DB_NAME --collection representations --out $DIR_FX/representations.json --jsonArray
mongoexport --db $DB_NAME --collection users --out $DIR_FX/users.json --jsonArray
