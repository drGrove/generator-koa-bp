#API
<% if (useTravis) { -%>
[![Build Status](https://travis-ci.org/<%= githubEndpoint %>.svg?branch=master)](https://travis-ci.org/<%= githubEndpoint %>)
<% } -%>
<% if (useDavidDM) { -%>
[![Dependencies](https://david-dm.org/<%= githubEndpoint %>.svg)](https://david-dm.org/<%= githubEndpoint %>)
<% } -%>

##Getting Started
```bash
$ git clone <%= repositoryLink %>
$ npm install
$ node run start-debug
```
