Notes Stations 3 Front End Unit Test Folder Structure Conventions
============================

> Folder structure options and naming conventions for software projects

### A typical top-level directory layout
    .
    ├── main.js                 # starting point to require the plans
    ├── docs                    # Documentation files (alternatively `doc`) created by jsdoc
    ├── actions                 # Global action can be used anywhere
    ├── components              # Notes Station 3 dom elements
    ├── plans                   # `scenario` or `spec`
    ├── utilities               # Tools and utilities
    ├── reports                 # Error reports, which is .png and .mhtml.
    ├── example.js              # show how to use nightmare with mocha and chai for simple NS3 project
    ├── example1.js             # nightmare offical example with mocha and chai
    ├── jsdoc.json              # jsdoc config
    ├── package.json            # node_module config
    └── README.md
    

> Use short lowercase names at least for the top-level files and folders except