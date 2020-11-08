# cypress-browse-tests
Cypress tests to run on the Cacophony browse site. The tests are contained within the browse-tests folder (currently tracked as a git sub-module) within the cacophony browse folder. 

## How to run the tests

In order to run these tests, a profile.json file located in cypress/fixtures containing valid login credentials is required. 
Navigate to /cacophony-browse/browse-tests

(Headless) In the command line run cypress with `npx cypress run`


(Headed) In the command line open cypress with `npx cypress open`


The cypress UI should now open. Individual tests can be selected and run from there. 

### JSON format for profile.json
----
```json
{
  "name": "Replace with user name",
  "email": "replace_name@cacophony.org.nz",
  "password": "Replace with Password"
}
```

### Skipping Tests
If certain blocks of test need to be omitted from a run, append .skip after the initial declaration of the test. For example, it.skip() or context.skip()

## Folder structure
Tests are arranged into folders as reccommended by the cypress docs
