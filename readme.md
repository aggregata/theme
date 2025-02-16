# aggregata/theme

> [Jairus Joer](mailto:hello@jairusjoer.com), 2025

Aggregata is a clean and modern theme for the Ghost blogging platform, designed for readability and a focus on content. This guide will walk you through setting up a local Ghost development environment to customize and develop the Aggregata theme.

## Local Development Setup

To set up a local Ghost instance with the Aggregata theme for development, follow these steps:

```sh
# Begin the installation of a local Ghost instance
ghost install local -d ghost
```

```sh
# Establish a symbolic link for the theme
ln -s ../../../theme ghost/content/themes/aggregata
```

```sh
# Retart the Ghost instance to detect the theme
cd ghost
ghost restart
```
