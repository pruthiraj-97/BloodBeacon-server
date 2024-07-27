# what operatin system is using docker run pruthiraj/blood-beacon cat /etc/os-release
# INSTRUCTION code
# The reference of base image
FROM ubuntu

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

# copy the code file
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY tsconfig.json  tsconfig.json
# copy everything in current directory
COPY . . 
EXPOSE 4000

# install typescript
RUN npm install -g typescript
# command to compile TS to JS
RUN tsc  
#install node module
RUN npm install
#running the server
ENTRYPOINT [ "node", "./dist/app.js" ]