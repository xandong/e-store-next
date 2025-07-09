FROM node:22.15.0-alpine3.21

RUN apk add --no-cache bash curl git
ARG USERNAME=vscode
ARG USER_UID=1001
ARG USER_GID=1001

RUN addgroup -g $USER_GID $USERNAME \
    && adduser -u $USER_UID -G $USERNAME -s /bin/bash -D $USERNAME \
    && mkdir -p /home/$USERNAME/.vscode-server/extensions \
    && mkdir -p /home/$USERNAME/.vscode-server-insiders/extensions \
    && chown -R $USERNAME:$USERNAME /home/$USERNAME

# Set the working directory and switch to the new user
WORKDIR /home/$USERNAME/app
USER $USERNAME
