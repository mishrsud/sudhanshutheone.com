---
title: Setting up a Teamcity CI pipeline using docker containers
---

## Summary
To explore JetBrains TeamCity CI server, you no longer need to install and set it up manually. Go docker instead!

### Resources
- Official TeamCity Server image: https://hub.docker.com/r/jetbrains/teamcity-server/
- Agent: https://hub.docker.com/r/jetbrains/teamcity-agent/
- docker-compose
```yaml
version: '3.1'

services:
    teamcity:
        image: jetbrains/teamcity-server
        volumes:
            - teamcity-server-datadir:/data/teamcity_server/datadir
            - teamcity-server-logs:/opt/teamcity/logs
        ports:
            - 8111:8111

    teamcity-agent:
        image: jetbrains/teamcity-agent
        environment:
            SERVER_URL: http://teamcity:8111
        volumes:
            - /var/run/docker.sock:/var/run/docker.sock

volumes:
    teamcity-server-datadir:
    teamcity-server-logs:
```

### Tutorials
- Pluralsight: https://www.pluralsight.com/courses/deployment-pipeline-aspdotnet-core-docker
