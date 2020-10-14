# `probe`

`probe` is an API service that performs active healthchecks of any `http/https` service.  
It provides a UI of status tiles to provide real-time visualisation of configured probes.  
Suitable for quickly validating microservice health or configured firewall rules.  

![probe-status](test.svg)

Probes can be configured via either the included **CLI** or the REST **API**.  

## TLDR; Install
### via Docker: Shell Integration
Builds a shell command that links to the docker container.  
Requires docker installed on your system.  

```
docker run apnex/probe shell > probe-cli
chmod +x probe-cli
mv probe-cli /usr/bin/
```
